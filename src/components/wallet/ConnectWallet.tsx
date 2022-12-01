import { Button, ButtonProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SelectWalletModal from './WalletModal';
import { truncateAddress } from '../../helpers';
import { useWeb3Context } from './Web3Context';

const ConnectWallet = (props: ButtonProps) => {
  const { address, ensName } = useWeb3Context();

  const [opened, { close, open }] = useDisclosure(false);

  if (typeof address !== 'string') {
    return (
      <div>
        <Button {...props} onClick={open}>
          {props.children}
        </Button>
        <SelectWalletModal isOpen={opened} closeModal={close} />
      </div>
    );
  }

  return <Button {...props}>{ensName || `${truncateAddress(address, 4)}`}</Button>;
};

export default ConnectWallet;
