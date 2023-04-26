import { Center, Stack } from '@mantine/core';
import { FaEthereum } from 'react-icons/fa';
import { Header, Loader } from './shared/elements';
import { ConnectWalletButton } from './wallet/ConnectWallet';
import { useAuthContext } from '../hooks/useAuthContext';

export const Login = () => {
  const { ready } = useAuthContext();

  return (
    <Center style={{ width: '100%', height: 600 }}>
      {ready ? (
        <Stack spacing={32}>
          <Header>{'Sign In to Continue'}</Header>
          <ConnectWalletButton leftIcon={<FaEthereum size={16} />}>
            {'Connect Wallet'}
          </ConnectWalletButton>
        </Stack>
      ) : (
        <Loader />
      )}
    </Center>
  );
};
