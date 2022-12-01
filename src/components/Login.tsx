import { Center, Stack } from '@mantine/core';
import { FaEthereum } from 'react-icons/fa';
import { Header, Loader } from './shared/elements';
import ConnectWallet from './wallet/ConnectWallet';
import { useConnectionStatus, ConnectionStatus } from '../hooks/useConnectionStatus';

export const Login = () => {
  const { connectionStatus } = useConnectionStatus();

  return (
    <Center style={{ width: '100%', height: 600 }}>
      {connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET && (
        <Stack spacing={32}>
          <Header>{'Sign In to Continue'}</Header>
          <ConnectWallet leftIcon={<FaEthereum size={16} />}>{'Connect Wallet'}</ConnectWallet>
        </Stack>
      )}
      {(connectionStatus === ConnectionStatus.CONNECTING_WALLET ||
        connectionStatus === 'disconnecting') && <Loader />}
    </Center>
  );
};
