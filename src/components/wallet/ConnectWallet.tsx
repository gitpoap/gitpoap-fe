import { useWeb3React } from '@web3-react/core';
import useENSName from '../../hooks/useENSName';
import { Button, ButtonProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SelectWalletModal from './WalletModal';
import { truncateAddress } from '../../helpers';

const ConnectWallet = (props: ButtonProps) => {
  const { error, account } = useWeb3React();

  const [opened, { close, open }] = useDisclosure(false);

  const ENSName = useENSName(account ?? '');

  if (error) {
    return null;
  }

  if (typeof account !== 'string') {
    return (
      <div>
        <Button {...props} onClick={open}>
          {props.children}
        </Button>
        <SelectWalletModal isOpen={opened} closeModal={close} />
      </div>
    );
  }

  return <Button {...props}>{ENSName || `${truncateAddress(account, 4)}`}</Button>;
};

export default ConnectWallet;
