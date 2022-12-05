import { Button, ButtonProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SelectWalletModal from './WalletModal';
import { truncateAddress } from '../../helpers';
import { useWeb3Context, ConnectionStatus } from './Web3Context';
import { Loader } from '../shared/elements';

const ConnectWallet = (props: ButtonProps) => {
  const { address, ensName, connectionStatus } = useWeb3Context();

  const [opened, { close, open }] = useDisclosure(false);

  if (address && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET) {
    return <Button {...props}>{ensName || `${truncateAddress(address, 4)}`}</Button>;
  }

  if (connectionStatus === ConnectionStatus.CONNECTING_WALLET) {
    return (
      <Button>
        <Loader />
      </Button>
    );
  }

  return (
    <div>
      <Button {...props} onClick={open}>
        {props.children}
      </Button>
      <SelectWalletModal isOpen={opened} closeModal={close} />
    </div>
  );
};

export default ConnectWallet;
