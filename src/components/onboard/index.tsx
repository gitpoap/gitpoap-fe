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
            <Header>{'Connect your GitHub to onboard your Repos!'}</Header>
            <Text>
              {
                "We'll award 'Annual Contributor' GitPOAPs to anyone who as had at least one PR merged to your repo. You can award GitPOAPs to individual repos, a group of repos, or your whole org, up to you."
              }
            </Text>
            <Text>
              {
                "Offering recognition in the form of GitPOAPs is great as an end on it's own, but there is much more.  There is a whole ecosystem of applications built on top of GitPOAP you can leverage to support and grown your community. Read more about the POAP Ecosystem "
              }
              <StyledLink href="https://poap.directory/">here</StyledLink>
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
