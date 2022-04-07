import React, { useContext, useState, useCallback, createContext, useMemo, useEffect } from 'react';
import Web3Modal, { IProviderOptions } from 'web3modal';
import { JsonRpcProvider, Web3Provider, InfuraProvider } from '@ethersproject/providers';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { NETWORKS } from '../../constants';
import { BackgroundPanel, BackgroundPanel2, TextLight, TextGray } from '../../colors';
import { useEnsAvatar } from '../../hooks/useEnsAvatar';

type Props = {
  children: React.ReactNode;
};

let providerOptions: IProviderOptions = {
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
  avatarURI: string | null;
  isConnected: boolean;
  web3Provider: JsonRpcProvider | null;
  infuraProvider: InfuraProvider | null;
  web3Modal: Web3Modal;
  chainId: number;
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
  const [isConnected, setIsConnected] = useState(false);
  const [web3Modal, _] = useState<Web3Modal>(initWeb3Modal);
  const [address, setAddress] = useState('');
  const [web3Provider, setWeb3Provider] = useState<JsonRpcProvider | null>(null);
  const [infuraProvider, setInfuraProvider] = useState<InfuraProvider | null>(null);
  const [chainId, setChainId] = useState(NETWORKS[1].chainId);
  const [ensName, setEnsName] = useState<string | null>(null);
  const avatarURI = useEnsAvatar(web3Provider ?? infuraProvider, ensName);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();

    setIsConnected(false);
    setAddress('');
    setWeb3Provider(null);
    setEnsName(null);
  }, [web3Modal]);

  const initialize = useCallback(async (provider: any): Promise<Web3Provider> => {
    const web3Provider = new Web3Provider(provider, 'any');
    const connectedAddress = await web3Provider?.getSigner().getAddress();

    const ensName = await web3Provider?.lookupAddress(connectedAddress);
    if (ensName) {
      setEnsName(ensName);
    } else {
      setEnsName(null);
    }

    setAddress(connectedAddress);
    setWeb3Provider(web3Provider);
    setIsConnected(true);

    return web3Provider;
  }, []);

  const addListeners = useCallback(
    async (provider: JsonRpcProvider) => {
      provider.on('accountsChanged', async () => {
        const provider = await web3Modal.connect();
        initialize(provider);
      });

      provider.on('chainChanged', (chainId) => {
        setChainId(chainId);
      });

      provider.on('disconnect', () => {
        disconnect();
      });
    },
    [disconnect, initialize, web3Modal],
  );

  const connect = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();
      const web3Provider = initialize(provider);
      addListeners(provider);

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

  /* Hook to check whether a cached provider exists. If it does, connect to provider */
  useEffect(() => {
    const isCached = hasCachedProvider();

    /* Attempt to connect to cached provider */
    if (!isConnected && isCached) {
      connect();
    }

    /* Always initialize a backup provider for when no wallet is connected */
    if (!infuraProvider) {
      const provider = new InfuraProvider(NETWORKS[1].chainId, {
        projectId: process.env.NEXT_PUBLIC_INFURA_ID,
      });
      setInfuraProvider(provider);
    }
  }, [hasCachedProvider, isConnected, connect, infuraProvider]);

  const onChainProvider = useMemo(
    () => ({
      connect,
      disconnect,
      hasCachedProvider,
      isConnected,
      address,
      ensName,
      avatarURI,
      web3Provider,
      infuraProvider,
      web3Modal,
      chainId,
    }),
    [
      connect,
      disconnect,
      hasCachedProvider,
      isConnected,
      address,
      ensName,
      avatarURI,
      web3Provider,
      infuraProvider,
      web3Modal,
      chainId,
    ],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
