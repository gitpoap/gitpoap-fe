import { Button, ButtonProps } from '@mantine/core';
import WalletModal from './WalletModal';
import { truncateAddress } from '../../helpers';
import { useWeb3Context, ConnectionStatus } from './Web3Context';
import { Loader } from '../shared/elements';
import { White } from '../../colors';

const ConnectWallet = (props: ButtonProps) => {
  const { address, ensName, connectionStatus, isModalOpened, closeModal, handleConnect } =
    useWeb3Context();

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
      <WalletModal isOpen={isModalOpened} closeModal={closeModal} />
    </>
  );
};

export default ConnectWallet;
