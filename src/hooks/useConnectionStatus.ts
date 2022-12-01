import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useTokens } from './useTokens';
import { useIndexedDB } from './useIndexedDB';

export enum ConnectionStatus {
  CONNECTED_TO_WALLET = 'connected-to-wallet' /* Connected to wallet & authenticated */,
  CONNECTING_WALLET = 'connecting-wallet' /* Connecting to wallet & authenticating*/,
  DISCONNECTING = 'disconnecting' /* Disconnecting from wallet */,
  DISCONNECTED = 'disconnected' /* Not connected to any wallet */,
  UNINITIALIZED = 'uninitialized' /* Wallet connection hasn't been attempted yet */,
}

/**
 * This hook is used to get and set wallet connection status
 * We assume it is connected if wallet is connected, sign a signature and get jwt tokens from API.
 * @returns connection status getter and setter.
 */
export const useConnectionStatus = () => {
  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;
  const { tokens } = useTokens();

  const { value: signature } = useIndexedDB('signature');
  const { value: signedAddress } = useIndexedDB('address');

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.UNINITIALIZED,
  );

  useEffect(() => {
    // we check if wallet is connected, access_token/refresh_token exist, and signature is signed by connected address
    if (
      isConnected &&
      signature &&
      signedAddress === account &&
      tokens?.accessToken &&
      tokens?.refreshToken
    ) {
      setConnectionStatus(ConnectionStatus.CONNECTED_TO_WALLET);
    } else {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    }
  }, [isConnected, tokens, signature, signedAddress, account]);

  return { connectionStatus, setConnectionStatus };
};
