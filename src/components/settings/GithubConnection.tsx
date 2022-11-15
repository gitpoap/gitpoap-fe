import { Button, Group, Stack, Title, Text } from '@mantine/core';
import { GoMarkGithub } from 'react-icons/go';
import { User } from '../../hooks/useUser';
import { useOAuthContext } from '../oauth/OAuthContext';
import { Link } from '../shared/compounds/Link';

type Props = {
  user: User;
};
export const GithubConnection = ({ user }: Props) => {
  const { github } = useOAuthContext();

  return (
    <Group position="apart" my={4}>
      <Group>
        <GoMarkGithub size={32} />
        <Stack spacing={0}>
          <Title order={5}>{'GitHub'}</Title>
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
      >
        {user.capabilities.hasGithub ? 'DISCONNECT' : 'CONNECT'}
      </Button>
    </Group>
  );
};
