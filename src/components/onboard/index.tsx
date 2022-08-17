import { Center, Container, List, Stack } from '@mantine/core';
import { rem } from 'polished';
import { useState } from 'react';
import { GoMarkGithub } from 'react-icons/go';

import { useAuthContext } from '../github/AuthContext';
import { Button, Text } from '../shared/elements';
import { StyledLink } from './Completed';
import { IntakeForm } from './IntakeForm';

export const OnboardingPage = () => {
  const { tokens, authorizeGitHub, isLoggedIntoGitHub, user } = useAuthContext();
  const [getStarted, setGetStarted] = useState(false);

  if (!getStarted || !isLoggedIntoGitHub || !tokens || !user) {
    return (
      <Container>
        <Center>
          <Stack my="xl" spacing="xl">
            <Text style={{ fontSize: rem(40), lineHeight: rem(40), textAlign: 'center' }}>
              {'GitPOAP Onboarding'}
            </Text>
            <Text>{'A quick overview:'}</Text>
            <Text>
              <List
                style={{ color: 'inherit', font: 'inherit', padding: `0 ${rem(24)}` }}
                spacing="sm"
              >
                <List.Item>
                  {" We'll award an annual GitPOAP to anyone who has had a PR merged"}
                </List.Item>
                <List.Item>{' You’ll choose what repos we track'}</List.Item>
                <List.Item>{' We’ll award for historical and ongoing contributions'}</List.Item>
              </List>
            </Text>
            <Text>
              {'GitPOAPs also come with utility - gated access, viewing tools, and a lot '}
              <StyledLink href="https://poap.directory/" target="_blank">
                more
              </StyledLink>
              {'!'}
            </Text>
            <Button
              onClick={async () => {
                !isLoggedIntoGitHub && (await authorizeGitHub());
                setGetStarted(true);
              }}
              leftIcon={<GoMarkGithub size={16} />}
              style={{ margin: `${rem(16)} auto`, width: 'fit-content' }}
            >
              {isLoggedIntoGitHub ? 'GET STARTED' : 'CONNECT GITHUB'}
            </Button>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size={800}>
      <IntakeForm accessToken={tokens.accessToken} githubHandle={user.githubHandle} />
    </Container>
  );
};
