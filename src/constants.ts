import { DateTime } from 'luxon';

export const REACT_APP_CLIENT_ID = process.env.NEXT_PUBLIC_REACT_APP_CLIENT_ID;
export const GITPOAP_API_URL = process.env.NEXT_PUBLIC_GITPOAP_API_URL;
export const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

/* CSS Breakpoints */
export const BREAKPOINTS = {
  xs: 400,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const FIVE_MINUTES_IN_MS = 5 * 60 * 1000; // in milliseconds
export const ONE_DAY_IN_S = 86400; // in seconds
export const ONE_YEAR_IN_S = ONE_DAY_IN_S * 365; // in seconds
export const ONE_WEEK_IN_S = ONE_DAY_IN_S * 7; // in seconds

/** Date Constants **/
export const THIS_YEAR = DateTime.local().year;
export const DEFAULT_START_DATE = DateTime.local(THIS_YEAR, 1, 1).toJSDate();
export const DEFAULT_END_DATE = DateTime.local(THIS_YEAR, 12, 31).toJSDate();
export const DEFAULT_EXPIRY = DateTime.local(THIS_YEAR + 1, 4, 1).toJSDate();

/** TypeForm Links **/
export const TYPEFORM_LINKS = {
  feedback: 'https://2jxwpvhqb4y.typeform.com/gitpoapfeedback',
};

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

/* GitPOAP Staff ~ used for soft-gating admin pages */
export const ADMIN_GITHUB_IDS = [
  914240, // colfax23
  8076957, // peebeejay
  1555326, // burz
  23272494, // kayleen / nixorokish
  109097759, // Kayla
  19416312, // Aldo
];

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
