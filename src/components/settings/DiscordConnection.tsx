import { Button, Group, Stack, Title, Text } from '@mantine/core';
import { rem } from 'polished';
import { FaDiscord } from 'react-icons/fa';
import { User } from '../../hooks/useUser';
import { useOAuthContext } from '../oauth/OAuthContext';
import { Link } from '../shared/compounds/Link';

type Props = {
  user: User;
};

export const DiscordConnection = ({ user }: Props) => {
  const { github } = useOAuthContext();

  return (
    <Group position="apart" my={4}>
      <Group>
        <FaDiscord size={32} />
        <Stack spacing={0}>
          <Title order={5}>{'Discord'}</Title>
          {user.githubHandle && (
            <Text size="xs">
              {`You're connected as `}
              <Link href={`https://github.com/${user.githubHandle}`} passHref>
                <b>{`@${user.githubHandle}`}</b>
              </Link>
            </Text>
          )}
        </Stack>
      </Group>
      <Button
        variant={user.capabilities.hasGithub ? 'outline' : 'filled'}
        onClick={user.capabilities.hasGithub ? github.disconnect : github.authorize}
        sx={{ width: rem(145) }}
      >
        {user.capabilities.hasGithub ? 'DISCONNECT' : 'CONNECT'}
      </Button>
    </Group>
  );
};
