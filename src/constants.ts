import { DateTime } from 'luxon';

/* Environment Constants */
export const DEV_ENVIRONMENT = 'development';
export const PRODUCTION_ENVIRONMENT = 'production';

/* CSS Breakpoints */
export const BREAKPOINTS = {
  xs: 400,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const FIVE_MINUTES_IN_MS = 5 * 60 * 1000; // in milliseconds
export const FIVE_MINUTES_IN_S = 5 * 60; // in seconds
export const ONE_HOUR_IN_S = 3600; // in seconds
export const ONE_DAY_IN_S = 86400; // in seconds
export const ONE_YEAR_IN_S = ONE_DAY_IN_S * 365; // in seconds
export const ONE_WEEK_IN_S = ONE_DAY_IN_S * 7; // in seconds
export const ONE_MONTH_IN_S = ONE_DAY_IN_S * 30; // in seconds

/** Date Constants **/
export const THIS_YEAR = DateTime.local().year;
export const DEFAULT_START_DATE = DateTime.local(THIS_YEAR, 1, 1).toJSDate();
export const DEFAULT_END_DATE = DateTime.local(THIS_YEAR, 12, 31).toJSDate();
export const DEFAULT_EXPIRY = DateTime.local(2024, 1, 1).toJSDate();

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
export const STAFF_GITHUB_IDS = [
  914240, // colfax23
  52794365, // Patricio (poapxyz)
  64825072, // Emilio (emilio-silva)
  128195919, // Moe (CanMat)
  43926625, // Iz (oggonz)
  19580671, // Tomas (tomso11)
];

export const STAFF_ADDRESSES = [
  '0x56d389c4e07a48d429035532402301310b8143a0', // Colfax
  '0x9B6e1a427be7A9456f4aF18eeaa354ccabF3980a', // gitpoap.eth
  '0xa5f6057a21da3a919008e8791c19c849fe98e1f9', // heurea.eth
  '0x4124cf34f56fa151e05c91ace550ada0dd5aabd7', // izgnzlz.eth
  '0xf6b6f07862a02c85628b3a9688beae07fea9c863', // poap.eth
  '0xac1c5131f0a85eafaa637a1ab342ed8e7771212d', // emiliosilva.eth
  '0xf2dfcae8fef5b5cd5d89a527d193da567a5d6297', // tomso.eth
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
