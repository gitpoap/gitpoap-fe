import { Button, ButtonProps } from '@mantine/core';
import { truncateAddress } from '../../helpers';
import { Loader } from '../shared/elements';
import { White } from '../../colors';
import { useAuthContext } from '../../hooks/useAuthContext';

export const ConnectWalletButton = (props: ButtonProps) => {
  const { ready, user, handleConnect } = useAuthContext();
  const address = user?.address ?? '';

  if (address) {
    return <Button {...props}>{user?.ensName || `${truncateAddress(address, 4)}`}</Button>;
  }

  if (!ready) {
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
