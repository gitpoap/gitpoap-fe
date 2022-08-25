import React, { useContext, useState, useCallback, createContext, useMemo, useEffect } from 'react';
import Web3Modal, { IProviderOptions, getInjectedProviderName } from 'web3modal';
import { JsonRpcProvider, Web3Provider, InfuraProvider } from '@ethersproject/providers';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { NETWORKS } from '../../constants';
import { BackgroundPanel, BackgroundPanel2, TextLight, TextGray } from '../../colors';

type Props = {
  children: React.ReactNode;
};

const providerOptions: IProviderOptions = {
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
  disconnect: () => void;
  hasCachedProvider: () => boolean;
  address: string;
  ensName: string | null;
  connectionStatus: ConnectionStatus;
  web3Provider: JsonRpcProvider | null;
  infuraProvider: InfuraProvider | null;
  web3Modal: Web3Modal;
  chainId: number | null;
};

type Web3ContextState = {
  onChainProvider: onChainProvider;
} | null;

type ConnectionStatus = 'connecting' | 'connected' | 'disconnecting' | 'disconnected';

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
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [web3Modal, _] = useState<Web3Modal>(initWeb3Modal);
  const [address, setAddress] = useState('');
  const [web3Provider, setWeb3Provider] = useState<JsonRpcProvider | null>(null);
  const [infuraProvider, setInfuraProvider] = useState<InfuraProvider | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [ensName, setEnsName] = useState<string | null>(null);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();

    setConnectionStatus('disconnected');
    setAddress('');
    setWeb3Provider(null);
    setEnsName(null);
  }, [web3Modal]);

  const initialize = useCallback(
    async (provider: any): Promise<Web3Provider> => {
      const web3Provider = new Web3Provider(provider, 'any');
      const connectedAddress = await web3Provider?.getSigner().getAddress();
      const chainId = (await web3Provider?.getNetwork()).chainId;

      const ensName = await infuraProvider?.lookupAddress(connectedAddress);
      if (ensName) {
        setEnsName(ensName);
      } else {
        setEnsName(null);
      }

      setAddress(connectedAddress);
      setWeb3Provider(web3Provider);
      setChainId(chainId);
      setConnectionStatus('connected');

      return web3Provider;
    },
    [infuraProvider],
  );

  const addListeners = useCallback(
    async (provider: JsonRpcProvider) => {
      provider.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length > 0 && address !== accounts[0]) {
          const provider = await web3Modal.connect();
          await initialize(provider);
        } else {
          await disconnect();
        }
      });

      provider.on('chainChanged', async (chainId: number) => {
        await initialize(provider);
      });

      provider.on('disconnect', async (error: { code: number; message: string }) => {
        await disconnect();
      });

      provider.on('connect', async (info: { chainId: number }) => {
        if (connectionStatus === 'disconnected') {
          await initialize(provider);
        }
      });
    },
    [disconnect, web3Modal, connectionStatus, address, initialize],
  );

  const connect = useCallback(async () => {
    setConnectionStatus('connecting');

    try {
      const provider = await web3Modal.connect();
      const web3Provider = await initialize(provider);
      await addListeners(provider);

      return web3Provider;
    } catch (err) {
      console.warn(err);
    }
  }, [web3Modal, addListeners, initialize]);

  const hasCachedProvider = useCallback(() => {
    if (!web3Modal?.cachedProvider) {
      return false;
    }

    return true;
  }, [web3Modal]);

  /**
   * Hook to check whether a cached provider exists. If it does, connect to provider. It also
   * prevents MetaMask from prompting login on page load if the wallet is cached, but locked.
   */
  useEffect(() => {
    const connectToCachedProvider = async () => {
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

    const isCached = hasCachedProvider();

    /* Attempt to connect to cached provider */
    if (connectionStatus === 'disconnected' && isCached && infuraProvider) {
      connectToCachedProvider();
    }
  }, [hasCachedProvider, connectionStatus, connect, infuraProvider, web3Modal]);

  useEffect(() => {
    /* Always initialize a backup provider for when no wallet is connected */
    if (!infuraProvider) {
      const provider = new InfuraProvider(NETWORKS[1].chainId, {
        projectId: process.env.NEXT_PUBLIC_INFURA_ID,
      });
      setInfuraProvider(provider);
    }
  }, [infuraProvider]);

  const onChainProvider = useMemo(
    () => ({
      connect,
      disconnect,
      hasCachedProvider,
      connectionStatus,
      address,
      ensName,
      web3Provider,
      infuraProvider,
      web3Modal,
      chainId,
    }),
    [
      connect,
      disconnect,
      hasCachedProvider,
      connectionStatus,
      address,
      ensName,
      web3Provider,
      infuraProvider,
      web3Modal,
      chainId,
    ],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
