import { useState, useEffect, useCallback } from 'react';
import { Button, Group, Stack, Title, Text } from '@mantine/core';
import { usePrivy } from '@privy-io/react-auth';
import { rem } from 'polished';
import { FaDiscord } from 'react-icons/fa';
import { User } from '../../hooks/useUser';

type Props = {
  user: User;
};

export type DiscordConnectionStatus = 'CONNECT' | 'PENDING' | 'DISCONNECT';

export const DiscordConnection = ({ user }: Props) => {
  const { user: privyUser, linkDiscord, unlinkDiscord } = usePrivy();
  const [status, setStatus] = useState<DiscordConnectionStatus>('CONNECT');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const discordHandle = user.discordHandle ?? '';
  const discordSubject = privyUser?.discord?.subject ?? '';
  const linkedAccounts = privyUser?.linkedAccounts;
  const isOnlyDiscordConnected = !!discordHandle && linkedAccounts?.length === 1;

  useEffect(() => {
    if (discordHandle) {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, discordHandle]);

  useEffect(() => {
    if (discordHandle) {
      setStatus('DISCONNECT');
    } else {
      setStatus('CONNECT');
    }
  }, [discordHandle]);

  const handleSubmit = useCallback(async () => {
    setStatus('PENDING');
    if (status === 'DISCONNECT') {
      void unlinkDiscord(discordSubject);
    } else if (status === 'CONNECT') {
      linkDiscord();
    }
  }, [linkDiscord, unlinkDiscord, status, discordSubject]);

  const ConnectionStatus = {
    CONNECT: <Text size="xs">{`Connect your account`}</Text>,
    PENDING: (
      <Text size="xs">
        {`Pending `}
        {user.discordHandle && <b>{`@${user.discordHandle}`}</b>}
      </Text>
    ),
    DISCONNECT: (
      <Text size="xs">
        {`You're connected as `}
        <b>{`@${user.discordHandle}`}</b>
      </Text>
    ),
  };

  return (
    <Group position="apart" my={4}>
      <Group>
        <FaDiscord size={32} />
        <Stack spacing={0}>
          <Title order={5}>{'Discord'}</Title>
          {ConnectionStatus[status]}
        </Stack>
      </Group>
      <Button
        variant={status === 'CONNECT' ? 'filled' : 'outline'}
        onClick={handleSubmit}
        loading={status === 'PENDING'}
        sx={{ width: rem(145) }}
        disabled={isOnlyDiscordConnected}
      >
        {status}
      </Button>
    </Group>
  );
};
