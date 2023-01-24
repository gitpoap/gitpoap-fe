import React, { useCallback, useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button, Group, Stack, Title, Text, Tooltip } from '@mantine/core';
import { rem } from 'polished';
import { FaEthereum } from 'react-icons/fa';
import { shortenAddress } from '../../helpers';
import { User } from '../../hooks/useUser';
import { Link } from '../shared/compounds/Link';

type Props = {
  user: User;
};

export type AddressConnectionStatus = 'CONNECT' | 'PENDING' | 'DISCONNECT';

export const AddressConnection = ({ user }: Props) => {
  const { user: privyUser, linkWallet, unlinkWallet } = usePrivy();
  const [status, setStatus] = useState<AddressConnectionStatus>('CONNECT');

  const userAddress = user.address ?? '';
  const linkedAccounts = privyUser?.linkedAccounts;
  const isOnlyAddressConnected = !!userAddress && linkedAccounts?.length === 1;

  useEffect(() => {
    if (userAddress) {
      setStatus('DISCONNECT');
    } else {
      setStatus('CONNECT');
    }
  }, [userAddress]);

  const handleSubmit = useCallback(async () => {
    setStatus('PENDING');
    if (status === 'CONNECT') {
      linkWallet();
    } else if (status === 'DISCONNECT') {
      await unlinkWallet(userAddress);
    }
  }, [linkWallet, unlinkWallet, status, userAddress]);

  const ConnectionStatus = {
    CONNECT: <Text size="xs">{`Connect your account`}</Text>,
    PENDING: (
      <Text size="xs">
        {`Connecting `}
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
            <b>{`${shortenAddress(user.address ?? '')}`}</b>
          )}
        </Link>
      </Text>
    ),
    DISCONNECT: (
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
            <b>{`${shortenAddress(user.address ?? '')}`}</b>
          )}
        </Link>
      </Text>
    ),
  };

  return (
    <Group position="apart" my={4}>
      <Group>
        <FaEthereum size={32} />
        <Stack spacing={0}>
          <Title order={5}>{'Ethereum'}</Title>
          {ConnectionStatus[status]}
        </Stack>
      </Group>
      <Button
        variant={status === 'CONNECT' ? 'filled' : 'outline'}
        onClick={handleSubmit}
        sx={{ width: rem(145) }}
        loading={status === 'PENDING'}
        disabled={isOnlyAddressConnected}
      >
        {status}
      </Button>
    </Group>
  );
};
