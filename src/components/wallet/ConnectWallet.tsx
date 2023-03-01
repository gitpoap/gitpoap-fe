import { Button, ButtonProps } from '@mantine/core';
import { truncateAddress } from '../../helpers';
import { useWeb3Context, ConnectionStatus } from './Web3Context';
import { Loader } from '../shared/elements';
import { White } from '../../colors';
import { useUser } from '../../hooks/useUser';

export const ConnectWalletButton = (props: ButtonProps) => {
  const { ensName, connectionStatus, handleConnect } = useWeb3Context();
  const user = useUser();
  const address = user?.address ?? '';

  if (address && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET) {
    return <Button {...props}>{ensName || `${truncateAddress(address, 4)}`}</Button>;
  }

  if (connectionStatus === ConnectionStatus.CONNECTING_WALLET) {
    return (
      <Button>
        <Loader size="sm" color={White} />
      </Button>
    );
  }

  return (
    <>
      <Button {...props} onClick={handleConnect} key="connect-wallet-button">
        {props.children}
      </Button>
    </>
  );
};
