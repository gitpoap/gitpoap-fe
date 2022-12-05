import { Stack, Group, Modal, Button, Text } from '@mantine/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { useLocalStorage } from '@mantine/hooks';
import { connectors } from '../../connectors';
import { useWeb3Context, ConnectionStatus } from './Web3Context';

enum ProviderType {
  METAMASK = 'injected',
  COINBASE_WALLET = 'coinbaseWallet',
  WALLET_CONNECT = 'walletConnect',
}

type WalletModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function WalletModal({ isOpen, closeModal }: WalletModalProps) {
  const { activate, setError } = useWeb3React();
  const { setConnectionStatus, address } = useWeb3Context();
  const [, setProvider] = useLocalStorage<ProviderType>({
    key: 'provider',
    defaultValue: undefined,
  });

  return (
    <Modal opened={isOpen} onClose={closeModal} centered>
      {address ? (
        <p>{address}</p>
      ) : (
        <Stack>
          <Button
            variant="outline"
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
            fullWidth
          >
            <Group position="center" grow>
              {/* <img src="/cbw.png" alt="Coinbase Wallet Logo" width={25} height={25} /> */}
              <Text>Coinbase Wallet</Text>
            </Group>
          </Button>
          <Button
            variant="outline"
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
            fullWidth
          >
            <Group>
              {/* <img src="/wc.png" alt="Wallet Connect Logo" width={26} height={26} /> */}
              <Text>Wallet Connect</Text>
            </Group>
          </Button>
          <Button
            variant="outline"
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
            fullWidth
          >
            <Group position="center" grow>
              {/* <img src="/mm.png" alt="Metamask Logo" width={25} height={25} /> */}
              <Text>Metamask</Text>
            </Group>
          </Button>
        </Stack>
      )}
    </Modal>
  );
}
