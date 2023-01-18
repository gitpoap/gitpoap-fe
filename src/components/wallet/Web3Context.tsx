import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRefreshTokens } from '../../hooks/useRefreshTokens';
import { useTokens } from '../../hooks/useTokens';
import { useApi } from '../../hooks/useApi';
import { AuthenticateResponse } from '../../lib/api/auth';
import { trackConnectWallet, trackDisconnectWallet } from '../../lib/tracking/events';

type Props = {
  children: React.ReactNode;
};

export enum ProviderType {
  METAMASK = 'injected',
  COINBASE_WALLET = 'coinbaseWallet',
  WALLET_CONNECT = 'walletConnect',
}

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
  const { ready, authenticated, user, login, getAccessToken } = usePrivy();

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.UNINITIALIZED,
  );
  const [address, setAddress] = useState<string | null>(null);
  const api = useApi();
  const { setAccessToken, setRefreshToken, tokens, payload } = useTokens();

  /* This hook can only be used once here ~ it contains token refresh logic */
  useRefreshTokens();

  const disconnectWallet = useCallback(() => {
    trackDisconnectWallet(address);

    setConnectionStatus(ConnectionStatus.DISCONNECTED);
    setAddress('');
    setRefreshToken(null);
    setAccessToken(null);
  }, [setConnectionStatus, setRefreshToken, setAccessToken, setAddress, address]);

  useEffect(() => {
    if (tokens?.accessToken === null && tokens?.refreshToken === null) {
      disconnectWallet();
    }
  }, [tokens, disconnectWallet]);

  const handleConnect = useCallback(async () => {
    // // if previous access token exists, we check if refresh token is valid or not
    // // if valid, we use it to refresh access token, no need to ask to sign
    // const issuedAt = refreshTokenPayload?.iat ?? 0;
    // const isExpired = DateTime.now().toUnixInteger() >= issuedAt + ONE_MONTH_IN_S;
    trackConnectWallet(payload?.address);
    // if (tokens && payload?.address && !isExpired && tokens.refreshToken) {
    //   // use existing refresh token to refresh access token
    //   setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);
    //   //  unlock if metamask is locked
    //   if (provider === 'injected') {
    //     if (window.ethereum.isMetaMask) {
    //       if (window.ethereum.request) {
    //         /* Check if MetaMask is unlocked - if locked, ask to unlock */
    //         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    //         if (!accounts.length) {
    //           try {
    //             await activate(connectors.injected);
    //           } catch {
    //             setConnectionStatus(ConnectionStatus.DISCONNECTED);
    //             return;
    //           }
    //         }
    //       }
    //     }
    //   }

    //   void refreshToken(payload.address);
    // } else {
    //   // otherwise, open wallet connect modal
    //   openModal();
    // }

    login();
  }, [login]);

  // Privy Auth

  const authenticateWithPrivy = useCallback(async () => {
    const authToken = await getAccessToken();

    console.log('auth token', authToken);
    if (!authToken || !user || !user.wallet) {
      return;
    }

    const authData: AuthenticateResponse | null = await api.auth.authenticate(authToken);

    if (!authData) {
      // update connection status
      setConnectionStatus(ConnectionStatus.UNINITIALIZED);
      return;
    }
    // update connection status
    setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
    setAddress(user?.wallet?.address);
    // update tokens
    setAccessToken(authData.tokens.accessToken);
    setRefreshToken(authData.tokens.refreshToken);
  }, [
    getAccessToken,
    user,
    setConnectionStatus,
    setAddress,
    api.auth,
    setAccessToken,
    setRefreshToken,
  ]);

  useEffect(() => {
    if (ready && authenticated && user) {
      console.log('authenticated', user.wallet);
      void authenticateWithPrivy();
    }
  }, [ready, authenticated, user]);

  const onChainProvider = useMemo(
    () => ({
      address,
      setAddress,
      connectionStatus,
      setConnectionStatus,
      ensName: payload?.ensName ?? null,
      disconnectWallet,
      handleConnect,
    }),
    [
      address,
      setAddress,
      connectionStatus,
      setConnectionStatus,
      payload?.ensName,
      disconnectWallet,
      handleConnect,
    ],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
