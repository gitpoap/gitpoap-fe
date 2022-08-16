import { Center, Container, List, Stack } from '@mantine/core';
import { rem } from 'polished';
import { GoMarkGithub } from 'react-icons/go';
import styled from 'styled-components';
import { PrimaryBlue } from '../../colors';

import { useAuthContext } from '../github/AuthContext';
import { Button, Text } from '../shared/elements';
import { StyledLink } from './Completed';
import { IntakeForm } from './IntakeForm';

const Bold = styled.b`
  color: ${PrimaryBlue};
`;

export const OnboardingPage = () => {
  const { tokens, authorizeGitHub, isLoggedIntoGitHub, user } = useAuthContext();

  if (!isLoggedIntoGitHub || !tokens || !user) {
    return (
      <Container>
        <Center>
          <Stack my="xl" spacing="xl">
            <Text style={{ fontSize: rem(40), lineHeight: rem(40), textAlign: 'center' }}>
              {'GitPOAP Onboarding'}
            </Text>
            <Text>{"Welcome! Here's a bit more info for you:"}</Text>
            <Text>
              <List
                style={{ color: 'inherit', font: 'inherit', padding: `0 ${rem(24)}` }}
                spacing="sm"
              >
                <List.Item>
                  <Bold>Annual Contributor GitPOAPs:</Bold>
                  {
                    " We'll award a GitPOAP to anyone who has had a Pull Request merged to your project in each given year"
                  }
                </List.Item>
                <List.Item>
                  <Bold>Customization:</Bold>
                  {
                    ' You can select which repos are eligible, and can award a separate GitPOAP per repo or one across a group of repos'
                  }
                </List.Item>
                <List.Item>
                  <Bold>Historical and Ongoing:</Bold>
                  {
                    " We'll comb through the contribution history on GitHub and award GitPOAPs to everyone who has contributed since the start, as well as everyone going forward"
                  }
                </List.Item>
              </List>
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
