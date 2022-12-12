import { Stack, Group, Modal, Text } from '@mantine/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { useLocalStorage } from '@mantine/hooks';
import { rem } from 'polished';
import { connectors } from '../../connectors';
import { useWeb3Context, ConnectionStatus, ProviderType } from './Web3Context';
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
  const { activate, setError } = useWeb3React();
  const { setConnectionStatus, isMetaMaskInstalled } = useWeb3Context();
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
          key="coinbase-wallet-option"
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
          text={'Coinbase Wallet'}
          logo={<CoinBaseLogo width={32} height={32} />}
        />
        <ConnectionOption
          key="wallet-connect-option"
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
          text={'Wallet Connect'}
          logo={<WalletConnectLogo width={32} height={32} />}
        />
        {isMetaMaskInstalled && (
          <ConnectionOption
            key="metamask-wallet-option"
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
            text={'Metamask'}
            logo={<MetamaskLogo width={32} height={32} />}
          />
        )}
      </Stack>
    </Modal>
  );
}
