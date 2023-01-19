import { useState, useEffect, useCallback } from 'react';
import { Button, Group, Stack, Title, Text } from '@mantine/core';
import { usePrivy } from '@privy-io/react-auth';
import { rem } from 'polished';
import { FaDiscord } from 'react-icons/fa';
import { User } from '../../hooks/useUser';

type Props = {
  user: User;
};

export const DiscordConnection = ({ user }: Props) => {
  const { user: privyUser, linkDiscord, unlinkDiscord } = usePrivy();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const discordHandle = user.discordHandle ?? '';
  const discordSubject = privyUser?.discord?.subject ?? '';

  useEffect(() => {
    if (discordHandle) {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, discordHandle]);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    if (user.capabilities.hasDiscord) {
      void unlinkDiscord(discordSubject);
    } else {
      linkDiscord();
    }
  }, [user, discordSubject, setIsLoading, linkDiscord, unlinkDiscord]);

  return (
    <Group position="apart" my={4}>
      <Group>
        <FaDiscord size={32} />
        <Stack spacing={0}>
          <Title order={5}>{'Discord'}</Title>
          {user.discordHandle && (
            <Text size="xs">
              {`You're connected as `}
              <b>{`@${user.discordHandle}`}</b>
            </Text>
          )}
        </Stack>
      </Group>
      <Button
        variant={user.capabilities.hasDiscord ? 'outline' : 'filled'}
        onClick={handleSubmit}
        loading={isLoading}
        sx={{ width: rem(145) }}
      >
        {user.capabilities.hasDiscord ? 'DISCONNECT' : 'CONNECT'}
      </Button>
    </Group>
  );
};
