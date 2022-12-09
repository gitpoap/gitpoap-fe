import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { JsonRpcSigner } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { DateTime } from 'luxon';
import { useRefreshTokens } from '../../hooks/useRefreshTokens';
import { useTokens } from '../../hooks/useTokens';
import { useApi } from '../../hooks/useApi';
import { useIndexedDB, IndexDBStatus } from '../../hooks/useIndexedDB';
import { SignatureType } from '../../types';
import { AuthenticateResponse } from '../../lib/api/auth';
import { sign, generateSignatureData } from '../../lib/api/utils';
import { ONE_MONTH_IN_S, FIVE_MINUTES_IN_S } from '../../constants';
import { connectors } from '../../connectors';

type Props = {
  children: React.ReactNode;
};

export enum ConnectionStatus {
  CONNECTED_TO_WALLET = 'connected-to-wallet' /* Connected to wallet & authenticated */,
  CONNECTING_WALLET = 'connecting-wallet' /* Connecting to wallet & authenticating*/,
  DISCONNECTING = 'disconnecting' /* Disconnecting from wallet */,
  DISCONNECTED = 'disconnected' /* Not connected to any wallet */,
  UNINITIALIZED = 'uninitialized' /* Wallet connection hasn't been attempted yet */,
}

type onChainProvider = {
  address: string | null;
  setAddress: (address: string) => void;
  ensName: string | null;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (connectionStatus: ConnectionStatus) => void;
  disconnectWallet: () => void;
  isModalOpened: boolean;
  closeModal: () => void;
  handleConnect: () => void;
  isMetaMaskInstalled: boolean;
};

type Web3ContextState = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = createContext<Web3ContextState>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);

  if (!web3Context) {
    throw new Error(
      'useWeb3Context() can only be used inside of <Web3ContextProvider />, ' +
        'please declare it at a higher level.',
    );
  }

  const { onChainProvider } = web3Context;

  return useMemo<onChainProvider>(() => {
    return { ...onChainProvider };
  }, [onChainProvider]);
};

export const Web3ContextProvider = (props: Props) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.UNINITIALIZED,
  );
  const [address, setAddress] = useState<string | null>(null);

  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

  const { deactivate, account, library, activate } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  const [isModalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);

  const api = useApi();

  const { setAccessToken, setRefreshToken, tokens, payload, refreshTokenPayload } = useTokens();

  const [provider] = useLocalStorage<string | null>({
    key: 'provider',
    defaultValue: null,
  });

  const {
    value: signature,
    setValue: setSignature,
    status: signatureStatus,
  } = useIndexedDB(account ?? '', null);

  /* This hook can only be used once here ~ it contains token refresh logic */
  useRefreshTokens();

  const disconnectWallet = useCallback(() => {
    deactivate();

    setConnectionStatus(ConnectionStatus.DISCONNECTED);
    setAddress('');
    setRefreshToken(null);
    setAccessToken(null);
  }, [deactivate, setConnectionStatus, setRefreshToken, setAccessToken, setAddress]);

  const authenticate = useCallback(
    async (signature: SignatureType) => {
      const authData: AuthenticateResponse | null = await api.auth.authenticate(signature);

      if (!authData) {
        // update connection status
        setConnectionStatus(ConnectionStatus.UNINITIALIZED);
        // update signature
        setSignature(null);
        return;
      }

      // set signature data into IndexedDB
      setSignature({
        ...authData.signatureData,
      });
      // update connection status
      setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
      setAddress(authData.signatureData.address);
      // update tokens
      setAccessToken(authData.tokens.accessToken);
      setRefreshToken(authData.tokens.refreshToken);
    },
    [setConnectionStatus, setSignature, setAddress, api.auth, setAccessToken, setRefreshToken],
  );

  const authenticateWithoutSignature = useCallback(async () => {
    const signer: JsonRpcSigner = library.getSigner();
    const address = await signer.getAddress();
    const signatureData = generateSignatureData(address);
    const signatureString = await sign(signer, signatureData.message);

    if (!signatureString) return;

    await authenticate({
      ...signatureData,
      signature: signatureString,
      address,
    });
  }, [library, authenticate]);

  const authenticateWithSignature = useCallback(
    async (signature: SignatureType) => {
      await authenticate(signature);
    },
    [authenticate],
  );

  // check if metamask is installed
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    async function checkForMetaMask() {
      const provider = await detectEthereumProvider({
        timeout: 1000,
        mustBeMetaMask: true,
      });

      if (provider) {
        setIsMetaMaskInstalled(true);
      } else {
        setIsMetaMaskInstalled(false);
      }
    }

    void checkForMetaMask();
  }, []);

  // handle auth when account has changed
  useEffect(() => {
    // if wallet is not connected, do nothing
    if (!isConnected) return;
    // do nothing if signature is not loaded yet from indexedDB
    if (signatureStatus !== IndexDBStatus.LOADED || (signature && signature.address !== account))
      return;
    // if wallet is connecting, do nothing
    if (connectionStatus === ConnectionStatus.CONNECTING_WALLET) return;
    // if wallet is connected signed by current address, do nothing
    if (
      connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET &&
      address?.toLowerCase() === account.toLowerCase()
    )
      return;

    // now that we go through authentication
    // set connection status as connecting
    setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);

    if (signature) {
      void authenticateWithSignature(signature);
    } else {
      // we ask to sign a signature only if there is no signature for connected address
      void authenticateWithoutSignature();
    }
  }, [
    account,
    address,
    isConnected,
    signature,
    connectionStatus,
    signatureStatus,
    authenticateWithSignature,
    authenticateWithoutSignature,
    setConnectionStatus,
  ]);

  useEffect(() => {
    if (tokens?.accessToken === null && tokens?.refreshToken === null) {
      disconnectWallet();
    }
  }, [tokens, disconnectWallet]);

  // handle connect account if we have valid token in localstorage
  useEffect(() => {
    const connectToCachedProvider = async () => {
      // check if token is still not expired, connection status is uninitialized
      if (tokens?.accessToken && payload && connectionStatus === ConnectionStatus.UNINITIALIZED) {
        const accessTokenExp = payload?.exp;
        if (accessTokenExp) {
          const isExpired = DateTime.now().toUnixInteger() + FIVE_MINUTES_IN_S > accessTokenExp;
          if (!isExpired) {
            // get cached connector
            let cachedConnector = null;
            if (provider === 'injected') {
              cachedConnector = connectors.injected;
            } else if (provider === 'coinbase') {
              cachedConnector = connectors.coinbaseWallet;
            }

            if (!cachedConnector) return;

            setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);

            void activate(cachedConnector);
            setAddress(payload.address);

            setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
          }
        }
      }
    };

    void connectToCachedProvider();
  }, [tokens, payload, connectionStatus, activate, account, provider]);

  const refreshToken = useCallback(
    async (address: string) => {
      const tokens = await api.auth.refresh();

      if (tokens?.accessToken && tokens?.refreshToken) {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);

        // update connection status
        setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
        setAddress(address);
      } else {
        disconnectWallet();
      }
    },
    [api.auth, setAccessToken, setRefreshToken, setConnectionStatus, setAddress, disconnectWallet],
  );

  const handleConnect = useCallback(async () => {
    // if previous access token exists, we check if refresh token is valid or not
    // if valid, we use it to refresh access token, no need to ask to sign
    const issuedAt = refreshTokenPayload?.iat ?? 0;
    const isExpired = DateTime.now().toUnixInteger() >= issuedAt + ONE_MONTH_IN_S;
    if (tokens && payload?.address && !isExpired && tokens.refreshToken) {
      // use existing refresh token to refresh access token
      setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);
      void refreshToken(payload.address);
    } else {
      // otherwise, open wallet connect modal
      openModal();
    }
  }, [tokens, payload, openModal, refreshToken, setConnectionStatus, refreshTokenPayload?.iat]);

  const onChainProvider = useMemo(
    () => ({
      address,
      setAddress,
      connectionStatus,
      setConnectionStatus,
      ensName: payload?.ensName ?? null,
      disconnectWallet,
      handleConnect,
      isModalOpened,
      closeModal,
      isMetaMaskInstalled,
    }),
    [
      address,
      setAddress,
      connectionStatus,
      setConnectionStatus,
      payload?.ensName,
      disconnectWallet,
      handleConnect,
      isModalOpened,
      closeModal,
      isMetaMaskInstalled,
    ],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
