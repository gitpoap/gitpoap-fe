import { Button, Group, Stack, Title, Text } from '@mantine/core';
import { rem } from 'polished';
import { FaDiscord } from 'react-icons/fa';
import { User } from '../../hooks/useUser';
import { useOAuthContext } from '../oauth/OAuthContext';

type Props = {
  user: User;
};

export const DiscordConnection = ({ user }: Props) => {
  const { discord } = useOAuthContext();

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
        onClick={user.capabilities.hasDiscord ? discord.disconnect : discord.authorize}
        sx={{ width: rem(145) }}
      >
        {user.capabilities.hasDiscord ? 'DISCONNECT' : 'CONNECT'}
      </Button>
    </Group>
  );
};
