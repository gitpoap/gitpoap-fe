import { Center, Container, Stack } from '@mantine/core';
import { GoMarkGithub } from 'react-icons/go';

import { useAuthContext } from '../github/AuthContext';
import { Button, Text } from '../shared/elements';
import { IntakeForm } from './IntakeForm';

export const OnboardingPage = () => {
  const { tokens, authorizeGitHub, isLoggedIntoGitHub, user } = useAuthContext();

  if (!isLoggedIntoGitHub || !tokens || !user) {
    return (
      <Container my="xl">
        <Center>
          <Stack>
            <Text>{'Connect your GitHub to onboard your Repos!'}</Text>
            <Button onClick={authorizeGitHub} leftIcon={<GoMarkGithub size={16} />} mt="xl">
              {'CONNECT GITHUB'}
            </Button>
          </Stack>
        </Center>
      </Container>
    );
  }

  return <IntakeForm accessToken={tokens.accessToken} githubHandle={user.githubHandle} />;
};
