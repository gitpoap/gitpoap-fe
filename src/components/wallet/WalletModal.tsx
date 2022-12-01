import { useEffect, useCallback } from 'react';
import { Stack, Group, Modal, Button, Text } from '@mantine/core';
import { useWeb3React } from '@web3-react/core';
import { useLocalStorage } from '@mantine/hooks';
import { JsonRpcSigner } from '@ethersproject/providers';
import { connectors } from './connectors';
import { useApi } from '../../hooks/useApi';

enum ProviderType {
  METAMASK = 'injected',
  COINBASE_WALLET = 'coinbaseWallet',
  WALLET_CONNECT = 'walletConnect',
}

type SelectWalletModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function SelectWalletModal({ isOpen, closeModal }: SelectWalletModalProps) {
  const { activate, account, library } = useWeb3React();
  const [, setProvider] = useLocalStorage<ProviderType>({
    key: 'provider',
    defaultValue: undefined,
  });
  const api = useApi();

  const isConnected = typeof account === 'string' && !!library;

  const authenticate = useCallback(async () => {
    const signer: JsonRpcSigner = library.getSigner();
    await api.auth.authenticate(signer);
  }, [library, api.auth]);

  useEffect(() => {
    if (isConnected && account) {
      console.log('account', account);
      void authenticate();
    }
  }, [account, isConnected, authenticate]);

  return (
    <Modal opened={isOpen} onClose={closeModal} centered>
      <Stack>
        <Button
          variant="outline"
          onClick={() => {
            activate(connectors.coinbaseWallet);
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
            activate(connectors.walletConnect);
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
            activate(connectors.injected);
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
    </Modal>
  );
}