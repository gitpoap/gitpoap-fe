import { Center, Container, Stack } from '@mantine/core';
import { rem } from 'polished';
import { GoMarkGithub } from 'react-icons/go';

import { useAuthContext } from '../github/AuthContext';
import { Button, Header, Text } from '../shared/elements';
import { StyledLink } from './Completed';
import { IntakeForm } from './IntakeForm';

export const OnboardingPage = () => {
  const { tokens, authorizeGitHub, isLoggedIntoGitHub, user } = useAuthContext();

  if (!isLoggedIntoGitHub || !tokens || !user) {
    return (
      <Container>
        <Center>
          <Stack my="xl" spacing="xl">
            <Header>{'GitPOAP Onboarding'}</Header>
            <Text>
              {
                "We'll award 'Annual Contributor' GitPOAPs to anyone who has had at least one merged pull request from the founding year to the current year (e.g. '2020 ProjectName Contributor'). You can award GitPOAPs to individual repos, a group of repos, or your whole org - that's up to you."
              }
            </Text>
            <Text>
              {
                "Offering recognition in the form of a GitPOAP is great as an end in itself, but there's also a whole ecosystem of applications built on top of POAPs that you can leverage to support and grow your community. Read more about the POAP Ecosystem "
              }
              <StyledLink href="https://poap.directory/" target="_blank">
                here
              </StyledLink>
              {'!'}
            </Text>
            <Button
              onClick={authorizeGitHub}
              leftIcon={<GoMarkGithub size={16} />}
              style={{ margin: `${rem(16)} auto`, width: 'fit-content' }}
            >
              {'CONNECT GITHUB'}
            </Button>
          </Stack>
        </Center>
      </Container>
    );
  }

  return <IntakeForm accessToken={tokens.accessToken} githubHandle={user.githubHandle} />;
};
