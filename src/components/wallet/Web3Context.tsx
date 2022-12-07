import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDisclosure } from '@mantine/hooks';
import { JsonRpcSigner } from '@ethersproject/providers';
import { DateTime } from 'luxon';
import { useRefreshTokens } from '../../hooks/useRefreshTokens';
import { useTokens } from '../../hooks/useTokens';
import { useApi } from '../../hooks/useApi';
import { useIndexedDB, IndexDBStatus } from '../../hooks/useIndexedDB';
import { SignatureType } from '../../types';
import { AuthenticateResponse } from '../../lib/api/auth';
import { sign, generateSignatureData } from '../../lib/api/utils';
import { ONE_MONTH_IN_S } from '../../constants';

type Props = {
  children: React.ReactNode;
};

export enum ConnectorType {
  METAMASK,
  WALLET_CONNECT,
  COINBASE_WALLET,
}

export enum ConnectionStatus {
  CONNECTED_TO_WALLET = 'connected-to-wallet' /* Connected to wallet & authenticated */,
  CONNECTING_WALLET = 'connecting-wallet' /* Connecting to wallet & authenticating*/,
  DISCONNECTING = 'disconnecting' /* Disconnecting from wallet */,
  DISCONNECTED = 'disconnected' /* Not connected to any wallet */,
  UNINITIALIZED = 'uninitialized' /* Wallet connection hasn't been attempted yet */,
  INITIALIZED = 'initialized' /* Wallet connection has attempted */,
  REINITIALIZED = 'reinitialized' /* Connect wallet under the hood */,
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

  const { account, connector, provider } = useWeb3React();

  const [isModalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);

  const api = useApi();

  const { setAccessToken, setRefreshToken, tokens, payload, refreshTokenPayload } = useTokens();

  const {
    value: signature,
    setValue: setSignature,
    status: signatureStatus,
  } = useIndexedDB(account ?? '', null);

  /* This hook can only be used once here ~ it contains token refresh logic */
  useRefreshTokens();

  const disconnectWallet = useCallback(() => {
    if (connector.deactivate) {
      connector.deactivate();
    }

    setConnectionStatus(ConnectionStatus.DISCONNECTED);
    setAddress('');
    setRefreshToken(null);
    setAccessToken(null);
  }, [connector, setConnectionStatus, setRefreshToken, setAccessToken, setAddress]);

  useEffect(() => {
    console.log('connector', connector);
  }, [connector]);

  const authenticate = useCallback(
    async (signature: SignatureType) => {
      const authData: AuthenticateResponse | null = await api.auth.authenticate(signature);

      if (!authData) {
        // since authentication is failed, we ask to sign
        setConnectionStatus(ConnectionStatus.REINITIALIZED);
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
    const signer: JsonRpcSigner | undefined = provider?.getSigner();
    if (!signer) {
      console.error('No signer is initialized in current provider');
      return;
    }

    const address = await signer.getAddress();
    const signatureData = generateSignatureData(address);
    const signatureString = await sign(signer, signatureData.message);

    // set connectionStatus to initialized if we get no signature
    if (!signatureString) {
      setConnectionStatus(ConnectionStatus.UNINITIALIZED);
      return;
    }

    await authenticate({
      ...signatureData,
      signature: signatureString,
      address,
    });
  }, [authenticate, provider]);

  const authenticateWithSignature = useCallback(
    async (signature: SignatureType) => {
      await authenticate(signature);
    },
    [authenticate],
  );

  // handle auth when account has changed
  useEffect(() => {
    console.log('account changed', account, signatureStatus, connectionStatus, address);
    // if wallet is not connected, do nothing
    if (!account) return;
    // do nothing if signature is not loaded yet from indexedDB
    if (signatureStatus !== IndexDBStatus.LOADED || (signature && signature.address !== account))
      return;
    // if wallet connection hasn't attempted, do nothing
    if (
      connectionStatus !== ConnectionStatus.REINITIALIZED &&
      connectionStatus !== ConnectionStatus.INITIALIZED
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
    signature,
    signatureStatus,
    connectionStatus,
    setConnectionStatus,
    authenticateWithSignature,
    authenticateWithoutSignature,
  ]);

  useEffect(() => {
    console.log('reinitialized');
    setConnectionStatus(ConnectionStatus.REINITIALIZED);
  }, [account]);

  // useEffect(() => {
  //   console.log('initialized');
  //   if (connectionStatus === ConnectionStatus.INITIALIZED) {
  //     setConnectionStatus(ConnectionStatus.REINITIALIZED);
  //   }
  // }, [connectionStatus]);

  useEffect(() => {
    if (tokens?.accessToken === null && tokens?.refreshToken === null) {
      disconnectWallet();
    }
  }, [tokens, disconnectWallet]);

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
    ],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
