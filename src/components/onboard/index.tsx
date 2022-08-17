import { Container, Grid, List, Stack, Title } from '@mantine/core';
import { rem } from 'polished';
import { useState } from 'react';
import { GoMarkGithub } from 'react-icons/go';
import styled from 'styled-components';
import { BackgroundPanel, BackgroundPanel2, PrimaryBlue, White } from '../../colors';
import { BREAKPOINTS } from '../../constants';

import { useAuthContext } from '../github/AuthContext';
import { HowGraphic } from '../home/HowGraphic';
import { Button, Text } from '../shared/elements';
import { StyledLink } from './Completed';
import { IntakeForm } from './IntakeForm';

const Bold = styled.b`
  color: ${PrimaryBlue};
`;

const StyledGrid = styled(Grid)`
  margin: auto;
  min-height: calc(100vh - ${rem(84)});
`;

const StyledStack = styled(Stack)`
  max-width: ${rem(600)};
  margin: ${rem(40)} auto;

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    max-width: 80%;
  }
`;

const StyledCol = styled(Grid.Col)`
  align-items: center;
  display: flex;
  min-height: inherit;

  @media (min-width: ${rem(BREAKPOINTS.lg + 1)}) {
    &:first-child {
      > ${StyledStack} {
        margin-right: 16%;
        padding-left: ${rem(48)};
      }
    }
    &:last-child {
      > ${StyledStack} {
        margin-left: 16%;
        padding-right: ${rem(48)};
      }
    }
  }
`;

const StyledTitle = styled(Title)`
  color: ${White};
`;

const HowGraphicStyled = styled(HowGraphic)`
  margin: auto;
  max-width: 100%;
`;

const ConnectButton = styled(Button)`
  padding: ${rem(12)} ${rem(16)};
  margin: ${rem(16)} auto;
  width: fit-content;

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    width: 100%;
  }
`;

export const OnboardingPage = () => {
  const { tokens, authorizeGitHub, isLoggedIntoGitHub, user } = useAuthContext();
  const [getStarted, setGetStarted] = useState(false);

  if (!getStarted || !isLoggedIntoGitHub || !tokens || !user) {
    return (
      <>
        <StyledGrid columns={2} grow>
          <StyledCol span={2} lg={1} style={{ background: BackgroundPanel2 }}>
            <StyledStack spacing="xl">
              <StyledTitle order={1} style={{ fontSize: rem(42), lineHeight: rem(42) }}>
                {"Let's start creating your GitPOAPs"}
              </StyledTitle>
              {!isLoggedIntoGitHub && (
                <Text style={{ fontSize: rem(16) }}>
                  {`Connect your GitHub to onboard eligible repos.`}
                </Text>
              )}
              <ConnectButton
                onClick={async () => {
                  !isLoggedIntoGitHub && (await authorizeGitHub());
                  setGetStarted(true);
                }}
                leftIcon={<GoMarkGithub size={16} />}
              >
                {isLoggedIntoGitHub ? 'GET STARTED' : 'CONNECT GITHUB'}
              </ConnectButton>
            </StyledStack>
          </StyledCol>
          <StyledCol span={2} lg={1} style={{ background: BackgroundPanel }}>
            <StyledStack spacing="xl">
              <HowGraphicStyled />
              <StyledTitle order={3} style={{ height: 'auto', maxWidth: '100%' }}>
                {'A quick overview:'}
              </StyledTitle>
              <Text>
                <List
                  style={{ color: 'inherit', font: 'inherit', padding: `0 ${rem(24)}` }}
                  spacing="sm"
                >
                  <List.Item>
                    <Bold>Annual Contributor GitPOAPs: </Bold>
                    {" We'll award an annual GitPOAP to anyone who has had a PR merged"}
                  </List.Item>
                  <List.Item>
                    <Bold>Customization: </Bold>
                    {' You’ll choose what repos we track'}
                  </List.Item>
                  <List.Item>
                    <Bold>Historical and Ongoing Issuance: </Bold>
                    {' We’ll award for historical and ongoing contributions'}
                  </List.Item>
                </List>
              </Text>
              <Text>
                {'GitPOAPs also come with utility - gated access, viewing tools, and a lot '}
                <StyledLink href="https://poap.directory/" target="_blank">
                  more
                </StyledLink>
                {'!'}
              </Text>
            </StyledStack>
          </StyledCol>
        </StyledGrid>
      </>
    );
  }

  return (
    <Container size={800}>
      <IntakeForm accessToken={tokens.accessToken} githubHandle={user.githubHandle} />
    </Container>
  );
};
