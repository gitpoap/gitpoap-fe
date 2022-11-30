// import React, {
//   useContext,
//   useState,
//   useCallback,
//   createContext,
//   useMemo,
//   useEffect,
//   useRef,
// } from 'react';
// import { useWeb3React } from '@web3-react/core';
// import { JsonRpcProvider, Web3Provider, ExternalProvider } from '@ethersproject/providers';
// import { useTokens } from '../../hooks/useTokens';
// import { useRefreshTokens } from '../../hooks/useRefreshTokens';
// import { useApi } from '../../hooks/useApi';
// import { useLocalStorage } from '@mantine/hooks';
// import { useRouter } from 'next/router';

// type Props = {
//   children: React.ReactNode;
// };

// type onChainProvider = {
//   connect: () => Promise<Web3Provider | undefined>;
//   disconnectWallet: () => void;
//   address: string | null;
//   ensName: string | null;
//   connectionStatus: ConnectionStatus;
//   web3Provider: JsonRpcProvider | null;
// };

// type Web3ContextState = {
//   onChainProvider: onChainProvider;
// } | null;

// type ConnectionStatus =
//   | 'uninitialized' /* Wallet connection hasn't been attempted yet */
//   | 'disconnected' /* Not connected to any wallet */
//   | 'disconnecting' /* Disconnecting from wallet */
//   | 'connecting-wallet' /* Connecting to wallet & authenticating*/
//   | 'connected-to-wallet'; /* Connected to wallet & authenticated */

// const Web3Context = createContext<Web3ContextState>(null);

// export const useWeb3Context = () => {
//   const web3Context = useContext(Web3Context);

//   if (!web3Context) {
//     throw new Error(
//       'useWeb3Context() can only be used inside of <Web3ContextProvider />, ' +
//         'please declare it at a higher level.',
//     );
//   }

//   const { onChainProvider } = web3Context;

//   return useMemo<onChainProvider>(() => {
//     return { ...onChainProvider };
//   }, [onChainProvider]);
// };

// export const Web3ContextProvider = (props: Props) => {
//   const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('uninitialized');

//   const { activate, deactivate, account, library } = useWeb3React();

//   const [address, setAddress] = useState<string | null>(null);
//   const [web3Provider, setWeb3Provider] = useState<JsonRpcProvider | null>(null);
//   const hasAttemptedEagerConnect = useRef<boolean>(false);
//   const { setRefreshToken, setAccessToken, tokens, payload } = useTokens();
//   const api = useApi();
//   const router = useRouter();
//   const [hasConnectedBefore, setHasConnectedBefore] = useLocalStorage<boolean>({
//     key: 'hasConnectedBefore',
//     defaultValue: false,
//   });
//   /* This hook can only be used once here ~ it contains token refresh logic */
//   useRefreshTokens();

//   const disconnectWallet = useCallback(() => {
//     deactivate();

//     setConnectionStatus('disconnected');
//     setAddress('');
//     setWeb3Provider(null);
//     setRefreshToken(null);
//     setAccessToken(null);
//   }, []);

//   /* Authenticate with GitPOAP */
//   const authenticate = useCallback(
//     async (web3Provider: JsonRpcProvider, token: string | null) => {
//       if (token) {
//         setConnectionStatus('connected-to-wallet');
//       } else {
//         const signer = web3Provider.getSigner();
//         const tokens = await api.auth.authenticate(signer);

//         if (tokens) {
//           setAccessToken(tokens.accessToken);
//           setRefreshToken(tokens.refreshToken);
//           setConnectionStatus('connected-to-wallet');
//         } else {
//           disconnectWallet();
//           setConnectionStatus('disconnected');
//         }
//       }
//     },
//     [disconnectWallet, setAccessToken, setRefreshToken, api.auth],
//   );

//     const isCached = !!web3Modal?.cachedProvider;

//     /* Attempt to connect to cached provider */
//     if (
//       connectionStatus === 'uninitialized' &&
//       isCached &&
//       hasAttemptedEagerConnect.current === false &&
//       tokens?.accessToken
//     ) {
//       connectToCachedProvider();
//     } else if (
//       connectionStatus === 'uninitialized' &&
//       !isCached &&
//       hasAttemptedEagerConnect.current === false
//     ) {
//       setConnectionStatus('disconnected');
//     }
//   }, [connectionStatus, connect, web3Modal, tokens?.accessToken]);

//   const onChainProvider = useMemo(
//     () => ({
//       connect,
//       disconnectWallet,
//       connectionStatus,
//       address,
//       ensName: payload?.ensName ?? null,
//       web3Provider,
//     }),
//     [connect, disconnectWallet, connectionStatus, address, web3Provider, payload?.ensName],
//   );

//   return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
// };
