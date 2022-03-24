export const REACT_APP_CLIENT_ID = process.env.NEXT_PUBLIC_REACT_APP_CLIENT_ID;
export const REACT_APP_REDIRECT_URI = process.env.NEXT_PUBLIC_REACT_APP_REDIRECT_URI;
export const GITPOAP_API_URL = process.env.NEXT_PUBLIC_GITPOAP_API_URL;

/* CSS Breakpoints */
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const FIVE_MINUTES = 5 * 60 * 1000;

interface NativeCurrency {
  name: string;
  symbol: string;
  decimals?: number;
}

interface Network {
  chainName: string;
  chainId: number;
  nativeCurrency: NativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

/**
 * These networks will be available for users to select. Other networks may be functional
 *(e.g. testnets, or mainnets being prepared for launch) but need to be selected directly via the wallet.
 */
export const USER_SELECTABLE_NETWORKS = [1];

export const NETWORKS: Record<number, Network> = {
  1: {
    chainName: 'Ethereum',
    chainId: 1,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: ['https://etherscan.io/#/'],
  },
  4: {
    chainName: 'Rinkeby Testnet',
    chainId: 4,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/#/'],
  },
  42161: {
    chainName: 'Arbitrum',
    chainId: 42161,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://explorer.arbitrum.io/#/'],
  },
  421611: {
    chainName: 'Arbitrum Testnet',
    chainId: 421611,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io/#/'],
  },
  43113: {
    chainName: 'Avalanche Fuji Testnet',
    chainId: 43113,
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/#/'],
  },
  43114: {
    chainName: 'Avalanche',
    chainId: 43114,
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  },
};
