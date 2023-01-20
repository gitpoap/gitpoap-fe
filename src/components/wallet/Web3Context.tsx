import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
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
  ensName: string | null;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (connectionStatus: ConnectionStatus) => void;
  disconnect: () => void;
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
  const { ready, authenticated, user, login, getAccessToken, logout } = usePrivy();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.UNINITIALIZED,
  );
  const api = useApi();
  const { setAccessToken, tokens, payload } = useTokens();
  const address = user?.wallet?.address ?? '';

  const disconnect = useCallback(async () => {
    trackDisconnectWallet(address);

    setConnectionStatus(ConnectionStatus.DISCONNECTING);
    await logout();
    setAccessToken(null);
    setConnectionStatus(ConnectionStatus.DISCONNECTED);
  }, [setConnectionStatus, , setAccessToken, logout, address]);

  useEffect(() => {
    if (tokens?.accessToken === null) {
      void disconnect();
    }
  }, [tokens, disconnect]);

  const handleConnect = useCallback(async () => {
    // // if previous access token exists, we check if refresh token is valid or not
    // // if valid, we use it to refresh access token, no need to ask to sign
    // const issuedAt = refreshTokenPayload?.iat ?? 0;
    // const isExpired = DateTime.now().toUnixInteger() >= issuedAt + ONE_MONTH_IN_S;
    trackConnectWallet(payload?.ethAddress);
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
    setConnectionStatus(ConnectionStatus.CONNECTING_WALLET);
    login();
  }, [login, payload?.ethAddress]);

  // Privy Auth
  const authenticate = useCallback(async () => {
    const authToken = await getAccessToken();
    // without connected wallet, auth is not working on BE for now
    if (!authToken) {
      return;
    }

    setIsAuthenticating(true);
    const authData: AuthenticateResponse | null = await api.auth.authenticate(authToken);
    setIsAuthenticating(false);

    if (!authData) {
      // update connection status
      setConnectionStatus(ConnectionStatus.UNINITIALIZED);
      return;
    }
    // update connection status
    setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
    // update tokens
    setAccessToken(authData.tokens.accessToken);
  }, [getAccessToken, setConnectionStatus, api.auth, setAccessToken, setIsAuthenticating]);

  // handle login
  useEffect(() => {
    if (connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET) return;

    if (ready && authenticated && !isAuthenticating) {
      void authenticate();
    }
  }, [ready, authenticated, connectionStatus, isAuthenticating, authenticate]);

  // refresh access token from BE
  useEffect(() => {
    if (user && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET) {
      void authenticate();
    }
  }, [user, connectionStatus]);

  const onChainProvider = useMemo(
    () => ({
      connectionStatus,
      setConnectionStatus,
      ensName: payload?.ensName ?? null,
      disconnect,
      handleConnect,
    }),
    [connectionStatus, setConnectionStatus, payload?.ensName, disconnect, handleConnect],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
