import { Center, Stack } from '@mantine/core';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';
import { Header /* Loader */ } from './shared/elements';
import ConnectWallet from './wallet/ConnectWallet';

export const Login = () => {
  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  return (
    <Center style={{ width: '100%', height: 600 }}>
      {!isConnected && (
        <Stack spacing={32}>
          <Header>{'Sign In to Continue'}</Header>
          <ConnectWallet leftIcon={<FaEthereum size={16} />}>{'Connect Wallet'}</ConnectWallet>
        </Stack>
      )}
      {/* TODO; Tyler */}
      {/* {(connectionStatus === 'connecting-wallet' || connectionStatus === 'disconnecting') && (
        <Loader />
      )} */}
    </Center>
  );
};
