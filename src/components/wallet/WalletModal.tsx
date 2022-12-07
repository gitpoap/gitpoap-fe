import { useEffect } from 'react';
import { Stack, Group, Modal, Text } from '@mantine/core';
import { rem } from 'polished';
import { URI_AVAILABLE } from '@web3-react/walletconnect';
import { connectors } from '../../connectors';
import { useWeb3Context, ConnectionStatus, ConnectorType } from './Web3Context';
import { BackgroundPanel, BackgroundPanel2 } from '../../colors';
import { MetamaskLogo } from '../shared/elements/icons';
import { WalletConnectLogo } from '../shared/elements/icons/WalletConnectLogo';
import { CoinBaseLogo } from '../shared/elements/icons/CoinbaseLogo';
import { walletConnect } from '../../connectors';

type WalletModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

type ConnectionOptionProps = {
  onClick: () => void;
  logo: React.ReactNode;
  text: string;
};

const ConnectionOption = ({ onClick, logo, text }: ConnectionOptionProps) => {
  return (
    <Group
      p="sm"
      position="apart"
      sx={{
        backgroundColor: BackgroundPanel,
        cursor: 'pointer',
        borderRadius: rem(10),
        transition: 'background-color 150ms ease-in-out',
        padding: `${rem(12)} ${rem(30)} !important`,
        '&:hover:not(:active)': {
          backgroundColor: BackgroundPanel2,
        },
      }}
      onClick={onClick}
    >
      <Text size="md">{text}</Text>
      {logo}
    </Group>
  );
};

export default function WalletModal({ isOpen, closeModal }: WalletModalProps) {
  const { setConnectionStatus, setConnector } = useWeb3Context();

  // log URI when available
  useEffect(() => {
    walletConnect.events.on(URI_AVAILABLE, (uri: string) => {
      console.log(`uri: ${uri}`);
    });
  }, []);

  useEffect(() => {
    walletConnect.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to walletconnect');
    });
  }, []);

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      centered
      title={<Text size="lg">{'Select Wallet'}</Text>}
    >
      <Stack>
        <ConnectionOption
          onClick={() => {
            setConnectionStatus(ConnectionStatus.INITIALIZED);
            setConnector(connectors[ConnectorType.COINBASE_WALLET]);
            connectors[ConnectorType.COINBASE_WALLET][0]
              .activate()
              .then(() => {
                setConnectionStatus(ConnectionStatus.REINITIALIZED);
              })
              .catch(() => {
                setConnectionStatus(ConnectionStatus.UNINITIALIZED);
              });
            closeModal();
          }}
          text={'Coinbase Wallet'}
          logo={<CoinBaseLogo width={32} height={32} />}
        />
        <ConnectionOption
          onClick={() => {
            setConnectionStatus(ConnectionStatus.INITIALIZED);
            setConnector(connectors[ConnectorType.WALLET_CONNECT]);
            connectors[ConnectorType.WALLET_CONNECT][0]
              .activate()
              .then(() => {
                setConnectionStatus(ConnectionStatus.REINITIALIZED);
              })
              .catch((err) => {
                console.log('Error on wallet connect', err);
                setConnectionStatus(ConnectionStatus.UNINITIALIZED);
              });
            closeModal();
          }}
          text={'Wallet Connect'}
          logo={<WalletConnectLogo width={32} height={32} />}
        />
        <ConnectionOption
          onClick={() => {
            setConnectionStatus(ConnectionStatus.INITIALIZED);
            setConnector(connectors[ConnectorType.METAMASK]);
            connectors[ConnectorType.METAMASK][0]
              .activate()
              .then(() => {
                setConnectionStatus(ConnectionStatus.REINITIALIZED);
              })
              .catch(() => {
                setConnectionStatus(ConnectionStatus.UNINITIALIZED);
              });
            closeModal();
          }}
          text={'Metamask'}
          logo={<MetamaskLogo width={32} height={32} />}
        />
      </Stack>
    </Modal>
  );
}
