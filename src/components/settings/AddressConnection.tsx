import { Button, Group, Stack, Title, Text, Tooltip } from '@mantine/core';
import { rem } from 'polished';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3Context } from '../wallet/Web3Context';
import { shortenAddress } from '../../helpers';
import { User } from '../../hooks/useUser';
import { Link } from '../shared/compounds/Link';

type Props = {
  user: User;
};

export const AddressConnection = ({ user }: Props) => {
  const { disconnectWallet } = useWeb3Context();

  return (
    <Group position="apart" my={4}>
      <Group>
        <FaEthereum size={32} />
        <Stack spacing={0}>
          <Title order={5}>{'Ethereum'}</Title>
          <Text size="xs">
            {`You're connected as `}
            <Link href={`https://etherscan.io/address/${user.address}`} passHref>
              {user?.ensName ? (
                <Tooltip
                  label={user.address}
                  multiline
                  withArrow
                  transition="fade"
                  position="top"
                  sx={{ textAlign: 'center', maxWidth: rem(450) }}
                >
                  <b>{`${user.ensName}`}</b>
                </Tooltip>
              ) : (
                <b>{`${shortenAddress(user.address)}`}</b>
              )}
            </Link>
          </Text>
        </Stack>
      </Group>
      <Button variant="outline" onClick={disconnectWallet} sx={{ width: rem(145) }}>
        {'SIGN OUT'}
      </Button>
    </Group>
  );
};
