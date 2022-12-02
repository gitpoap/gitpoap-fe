import { Stack, Group, Modal, Text } from '@mantine/core';
import { useWeb3React } from '@web3-react/core';
import { useLocalStorage } from '@mantine/hooks';
import { connectors } from './connectors';
import { MetamaskLogo } from '../shared/elements/icons';
import { WalletConnectLogo } from '../shared/elements/icons/WalletConnectLogo';
import { CoinBaseLogo } from '../shared/elements/icons/CoinbaseLogo';
import { rem } from 'polished';
import { BackgroundPanel, BackgroundPanel2 } from '../../colors';
import styled from 'styled-components';

enum ProviderType {
  METAMASK = 'injected',
  COINBASE_WALLET = 'coinbaseWallet',
  WALLET_CONNECT = 'walletConnect',
}

type SelectWalletModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const ConnectionOption = styled(Group)`
  background-color: ${BackgroundPanel};
  cursor: pointer;
  border-radius: ${rem(10)};
  transition: background-color 150ms ease-in-out;

  &:hover:not(:active) {
    background-color: ${BackgroundPanel2};
  }
`;

export default function SelectWalletModal({ isOpen, closeModal }: SelectWalletModalProps) {
  const { activate } = useWeb3React();
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
            activate(connectors.coinbaseWallet);
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
            activate(connectors.walletConnect);
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
            activate(connectors.injected);
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
