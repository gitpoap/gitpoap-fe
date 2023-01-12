import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { INFURA_ID } from './environment';

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  appName: 'gitpoap-fe',
});

const walletconnect = new WalletConnectConnector({
  rpc: { 1: `https://mainnet.infura.io/v3/${INFURA_ID}` },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

/* Metamask */
const injected = new InjectedConnector({});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink,
};
