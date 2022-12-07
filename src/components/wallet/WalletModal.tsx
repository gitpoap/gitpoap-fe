import { Stack, Group, Modal, Text } from '@mantine/core';
import { rem } from 'polished';
import { connectors } from '../../connectors';
import { useWeb3Context, ConnectionStatus, ConnectorType } from './Web3Context';
import { BackgroundPanel, BackgroundPanel2 } from '../../colors';
import { MetamaskLogo } from '../shared/elements/icons';
import { WalletConnectLogo } from '../shared/elements/icons/WalletConnectLogo';
import { CoinBaseLogo } from '../shared/elements/icons/CoinbaseLogo';

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
  const { setConnectionStatus } = useWeb3Context();

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
            connectors[ConnectorType.COINBASE_WALLET][0]
              .activate()
              .then(() => {
                setConnectionStatus(ConnectionStatus.INITIALIZED);
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
            connectors[ConnectorType.WALLET_CONNECT][0]
              .activate()
              .then(() => {
                setConnectionStatus(ConnectionStatus.INITIALIZED);
              })
              .catch(() => {
                setConnectionStatus(ConnectionStatus.UNINITIALIZED);
              });
            closeModal();
          }}
          text={'Wallet Connect'}
          logo={<WalletConnectLogo width={32} height={32} />}
        />
        <ConnectionOption
          onClick={() => {
            connectors[ConnectorType.METAMASK][0]
              .activate()
              .then(() => {
                setConnectionStatus(ConnectionStatus.INITIALIZED);
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
