import React, {
  useContext,
  useState,
  useCallback,
  createContext,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import Web3Modal, { IProviderOptions, getInjectedProviderName } from 'web3modal';
import { JsonRpcProvider, Web3Provider, ExternalProvider } from '@ethersproject/providers';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { BackgroundPanel, BackgroundPanel2, TextLight, TextGray } from '../../colors';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useTokens } from '../../hooks/useTokens';
import { useRefreshTokens } from '../../hooks/useRefreshTokens';
import { useApi } from '../../hooks/useApi';
import { useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'gitpoap-fe',
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      darkMode: true,
    },
  },
};

let initWeb3Modal: Web3Modal;
if (typeof window !== 'undefined') {
  initWeb3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    theme: {
      background: BackgroundPanel,
      main: TextLight,
      secondary: TextGray,
      border: BackgroundPanel,
      hover: BackgroundPanel2,
    },
    providerOptions,
  });
}

type onChainProvider = {
  connect: () => Promise<Web3Provider | undefined>;
  disconnectWallet: () => void;
  address: string | null;
  ensName: string | null;
  connectionStatus: ConnectionStatus;
  web3Provider: JsonRpcProvider | null;
};

type Web3ContextState = {
  onChainProvider: onChainProvider;
} | null;

type ConnectionStatus =
  | 'uninitialized' /* Wallet connection hasn't been attempted yet */
  | 'disconnected' /* Not connected to any wallet */
  | 'disconnecting' /* Disconnecting from wallet */
  | 'connecting-wallet' /* Connecting to wallet & authenticating*/
  | 'connected-to-wallet'; /* Connected to wallet & authenticated */

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
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('uninitialized');
  const [web3Modal, _] = useState<Web3Modal>(initWeb3Modal);
  const [address, setAddress] = useState<string | null>(null);
  const [web3Provider, setWeb3Provider] = useState<JsonRpcProvider | null>(null);
  const hasAttemptedEagerConnect = useRef<boolean>(false);
  const { setRefreshToken, setAccessToken, tokens, payload } = useTokens();
  const api = useApi();
  const router = useRouter();
  const [hasConnectedBefore, setHasConnectedBefore] = useLocalStorage<boolean>({
    key: 'hasConnectedBefore',
    defaultValue: false,
  });
  /* This hook can only be used once here ~ it contains token refresh logic */
  useRefreshTokens();

  const disconnectWallet = useCallback(() => {
    web3Modal.clearCachedProvider();

    setConnectionStatus('disconnected');
    setAddress('');
    setWeb3Provider(null);
    setRefreshToken(null);
    setAccessToken(null);
  }, [web3Modal]);

  /* Authenticate with GitPOAP */
  const authenticate = useCallback(
    async (web3Provider: JsonRpcProvider, token: string | null) => {
      if (token) {
        setConnectionStatus('connected-to-wallet');
      } else {
        const signer = web3Provider.getSigner();
        const tokens = await api.auth.authenticate(signer);

        if (tokens) {
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          setConnectionStatus('connected-to-wallet');
        } else {
          disconnectWallet();
          setConnectionStatus('disconnected');
        }
      }
    },
    [disconnectWallet, setAccessToken, setRefreshToken, api.auth],
  );

  const initializeProvider = useCallback(
    async (provider: ConstructorParameters<typeof Web3Provider>[0]): Promise<Web3Provider> => {
      const web3Provider = new Web3Provider(provider, 'any');
      const connectedAddress = await web3Provider?.getSigner().getAddress();

      setAddress(connectedAddress);
      setWeb3Provider(web3Provider);
      return web3Provider;
    },
    [],
  );

  const addListeners = useCallback(
    async (provider: JsonRpcProvider) => {
      provider.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length > 0 && address !== accounts[0]) {
          const provider = await web3Modal.connect();
          const web3Provider = await initializeProvider(provider);
          await authenticate(web3Provider, null);
        } else {
          await disconnectWallet();
        }
      });

      provider.on('chainChanged', async () => {
        await initializeProvider(provider as unknown as ExternalProvider);
      });

      provider.on('disconnect', async () => {
        await disconnectWallet();
      });
    },
    [disconnectWallet, web3Modal, address, initializeProvider, authenticate],
  );

  const connect = useCallback(async () => {
    setConnectionStatus('connecting-wallet');

    try {
      const provider = await web3Modal.connect();
      const web3Provider = await initializeProvider(provider);
      await authenticate(web3Provider, tokens?.accessToken ?? null);
      await addListeners(provider);
      if (!hasConnectedBefore) {
        setHasConnectedBefore(true);
        void router.push('/settings');
      }
      return web3Provider;
    } catch (err) {
      console.warn(err);
    }
  }, [
    web3Modal,
    addListeners,
    initializeProvider,
    authenticate,
    tokens?.accessToken,
    hasConnectedBefore,
  ]);

  /**
   * Hook to check whether a cached provider exists. If it does, connect to provider. It also
   * prevents MetaMask from prompting login on page load if the wallet is cached, but locked.
   */
  useEffect(() => {
    const connectToCachedProvider = async () => {
      hasAttemptedEagerConnect.current = true;
      if (
        web3Modal.cachedProvider === 'injected' &&
        getInjectedProviderName()?.toLowerCase() === 'metamask'
      ) {
        if (window.ethereum.request) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (!accounts.length) {
            console.warn('MetaMask is not enabled');
            return;
          }
        }
      }
      await connect();
    };

    const isCached = !!web3Modal?.cachedProvider;

    /* Attempt to connect to cached provider */
    if (
      connectionStatus === 'uninitialized' &&
      isCached &&
      hasAttemptedEagerConnect.current === false &&
      tokens?.accessToken
    ) {
      connectToCachedProvider();
    } else if (
      connectionStatus === 'uninitialized' &&
      !isCached &&
      hasAttemptedEagerConnect.current === false
    ) {
      setConnectionStatus('disconnected');
    }
  }, [connectionStatus, connect, web3Modal, tokens?.accessToken]);

  const onChainProvider = useMemo(
    () => ({
      connect,
      disconnectWallet,
      connectionStatus,
      address,
      ensName: payload?.ensName ?? null,
      web3Provider,
    }),
    [connect, disconnectWallet, connectionStatus, address, web3Provider, payload?.ensName],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
