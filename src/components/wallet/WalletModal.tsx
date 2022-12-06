import { Stack, Group, Modal, Text } from '@mantine/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { useLocalStorage } from '@mantine/hooks';
import { rem } from 'polished';
import styled from 'styled-components';
import { connectors } from '../../connectors';
import { useWeb3Context, ConnectionStatus } from './Web3Context';
import { BackgroundPanel, BackgroundPanel2 } from '../../colors';
import { MetamaskLogo } from '../shared/elements/icons';
import { WalletConnectLogo } from '../shared/elements/icons/WalletConnectLogo';
import { CoinBaseLogo } from '../shared/elements/icons/CoinbaseLogo';

enum ProviderType {
  METAMASK = 'injected',
  COINBASE_WALLET = 'coinbaseWallet',
  WALLET_CONNECT = 'walletConnect',
}

const ConnectionOption = styled(Group)`
  background-color: ${BackgroundPanel};
  cursor: pointer;
  border-radius: ${rem(10)};
  transition: background-color 150ms ease-in-out;

  &:hover:not(:active) {
    background-color: ${BackgroundPanel2};
  }
`;

type WalletModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function WalletModal({ isOpen, closeModal }: WalletModalProps) {
  const { activate, setError } = useWeb3React();
  const { setConnectionStatus } = useWeb3Context();
  const [, setProvider] = useLocalStorage<ProviderType>({
    key: 'provider',
    defaultValue: undefined,
  });

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      centered
      title={<Text size="lg">{'Select Wallet'}</Text>}
    >
      <Stack>
        <ConnectionOption
          p="sm"
          position="center"
          onClick={() => {
            activate(connectors.coinbaseWallet).catch((error) => {
              // ignore the error if it's a user rejected request
              if (error instanceof UserRejectedRequestError) {
                setConnectionStatus(ConnectionStatus.UNINITIALIZED);
              } else {
                setError(error);
              }
            });
            setProvider(ProviderType.COINBASE_WALLET);
            closeModal();
          }}
        >
          <CoinBaseLogo width={32} height={32} />
          <Text size="md">{'Coinbase Wallet'}</Text>
        </ConnectionOption>
        <ConnectionOption
          p="sm"
          position="center"
          onClick={() => {
            activate(connectors.walletConnect).catch((error) => {
              // ignore the error if it's a user rejected request
              if (error instanceof UserRejectedRequestError) {
                setConnectionStatus(ConnectionStatus.UNINITIALIZED);
              } else {
                setError(error);
              }
            });
            setProvider(ProviderType.WALLET_CONNECT);
            closeModal();
          }}
        >
          <WalletConnectLogo width={32} height={32} />
          <Text size="md">{'Wallet Connect'}</Text>
        </ConnectionOption>
        <ConnectionOption
          p="sm"
          position="center"
          onClick={() => {
            activate(connectors.injected).catch((error) => {
              // ignore the error if it's a user rejected request
              if (error instanceof UserRejectedRequestError) {
                setConnectionStatus(ConnectionStatus.UNINITIALIZED);
              } else {
                setError(error);
              }
            });
            setProvider(ProviderType.METAMASK);
            closeModal();
          }}
        >
          <MetamaskLogo width={32} height={32} />
          <Text size="md">{'Metamask'}</Text>
        </ConnectionOption>
      </Stack>
    </Modal>
  );
}
