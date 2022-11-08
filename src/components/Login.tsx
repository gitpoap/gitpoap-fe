import { Button, Center, Stack } from '@mantine/core';
import { FaEthereum } from 'react-icons/fa';
import { Header, Loader } from './shared/elements';
import { useWeb3Context } from './wallet/Web3Context';

export const Login = () => {
  const { connect, connectionStatus } = useWeb3Context();

  return (
    <Center style={{ width: '100%', height: 600 }}>
      {(connectionStatus === 'disconnected' || connectionStatus === 'uninitialized') && (
        <Stack spacing={32}>
          <Header>{'Sign In to Continue'}</Header>
          <Button leftIcon={<FaEthereum size={16} />} onClick={() => connect()}>
            {'Connect Wallet'}
          </Button>
        </Stack>
      )}
      {(connectionStatus === 'connecting-wallet' || connectionStatus === 'disconnecting') && (
        <Loader />
      )}
    </Center>
  );
};
