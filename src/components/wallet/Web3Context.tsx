import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRefreshTokens } from '../../hooks/useRefreshTokens';
import { useTokens } from '../../hooks/useTokens';

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

  const { setAccessToken, setRefreshToken, payload } = useTokens();

  const { deactivate } = useWeb3React();

  /* This hook can only be used once here ~ it contains token refresh logic */
  useRefreshTokens();

  const disconnectWallet = useCallback(() => {
    deactivate();

    setConnectionStatus(ConnectionStatus.DISCONNECTED);
    setAddress('');
    setRefreshToken(null);
    setAccessToken(null);
  }, [deactivate, setConnectionStatus, setRefreshToken, setAccessToken, setAddress]);

  const onChainProvider = useMemo(
    () => ({
      address,
      setAddress,
      connectionStatus,
      setConnectionStatus,
      ensName: payload?.ensName ?? null,
      disconnectWallet,
    }),
    [
      address,
      setAddress,
      connectionStatus,
      setConnectionStatus,
      payload?.ensName,
      disconnectWallet,
    ],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
