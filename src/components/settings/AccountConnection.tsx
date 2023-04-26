import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { User } from '@privy-io/react-auth';
import { Button, Group, Stack, Title, Text } from '@mantine/core';
import { rem } from 'polished';

type Props = {
  user: User | null;
  accountValue: string | null;
  label: string;
  icon: ReactNode;
  description: ReactNode;
  linkAccount: () => void;
  unlinkAccount: (account: string) => Promise<User>;
};

export type AccountConnectionStatus = 'CONNECT' | 'PENDING' | 'DISCONNECT';

export const AccountConnection = ({
  user,
  accountValue,
  label,
  icon,
  description,
  linkAccount,
  unlinkAccount,
}: Props) => {
  const [status, setStatus] = useState<AccountConnectionStatus>('CONNECT');
  const isOnlyConnected = !!accountValue && user?.linkedAccounts?.length === 1;

  useEffect(() => {
    if (accountValue) {
      setStatus('DISCONNECT');
    } else {
      setStatus('CONNECT');
    }
  }, [accountValue]);

  const handleSubmit = useCallback(async () => {
    if (status === 'CONNECT') {
      linkAccount();
    } else if (status === 'DISCONNECT' && accountValue) {
      setStatus('PENDING');
      await unlinkAccount(accountValue);
    }
  }, [linkAccount, unlinkAccount, status, accountValue]);

  const ConnectionStatus = {
    CONNECT: <Text size="xs">{`Connect your account`}</Text>,
    PENDING: (
      <Text size="xs">
        {`Pending`}
        {description}
      </Text>
    ),
    DISCONNECT: (
      <Text size="xs">
        {`You're connected as `}
        {description}
      </Text>
    ),
  };

  return (
    <Group position="apart" my={4}>
      <Group>
        {icon}
        <Stack spacing={0}>
          <Title order={5}>{label}</Title>
          {ConnectionStatus[status]}
        </Stack>
      </Group>
      <Button
        variant={status === 'CONNECT' ? 'filled' : 'outline'}
        onClick={handleSubmit}
        sx={{ width: rem(145) }}
        loading={status === 'PENDING'}
        disabled={isOnlyConnected}
      >
        {status}
      </Button>
    </Group>
  );
};
