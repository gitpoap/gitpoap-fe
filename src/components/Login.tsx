import { Center, Stack } from '@mantine/core';
import { FaEthereum } from 'react-icons/fa';
import { Header, Loader } from './shared/elements';
import { ConnectWalletButton } from './wallet/ConnectWallet';
import { useWeb3Context, ConnectionStatus } from './wallet/Web3Context';

export const Login = () => {
  const { connectionStatus } = useWeb3Context();

  return (
    <Center style={{ width: '100%', height: 600 }}>
      {(connectionStatus === ConnectionStatus.DISCONNECTED ||
        connectionStatus === ConnectionStatus.UNINITIALIZED) && (
        <Stack spacing={32}>
          <Header>{'Sign In to Continue'}</Header>
          <ConnectWalletButton leftIcon={<FaEthereum size={16} />}>
            {'Connect Wallet'}
          </ConnectWalletButton>
        </Stack>
      )}
      {(connectionStatus === ConnectionStatus.CONNECTING_WALLET ||
        connectionStatus === ConnectionStatus.DISCONNECTING) && <Loader />}
    </Center>
  );
};
