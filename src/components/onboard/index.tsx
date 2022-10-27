import { Center, Container, List, Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { GoMarkGithub } from 'react-icons/go';
import { useUser } from '../../hooks/useUser';
import { useOAuthContext } from '../oauth/OAuthContext';
import { Button, Text } from '../shared/elements';
import { useWeb3Context } from '../wallet/Web3Context';
import { StyledLink } from './Completed';
import { IntakeForm } from './IntakeForm';

export const OnboardingPage = () => {
  const { github } = useOAuthContext();
  const { connect } = useWeb3Context();
  const user = useUser();
  const [getStarted, setGetStarted] = useState(false);

  const [isOnboardingConnectButtonActive, setIsOnboardingConnectButtonActive] =
    useLocalStorage<boolean>({
      key: 'isOnboardingConnectButtonActive',
      defaultValue: false,
    });

  /* Hook is used to enter the first stage of the form after github auth */
  useEffect(() => {
    if (user?.githubHandle && isOnboardingConnectButtonActive) {
      setGetStarted(true);
      setIsOnboardingConnectButtonActive(false);
    }
  }, [user?.githubHandle, isOnboardingConnectButtonActive]);

  if (!getStarted || !user?.githubHandle) {
    return (
      <Container mt={32}>
        <Center>
          <Stack my="xl" spacing="xl">
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: rem(40),
                lineHeight: rem(40),
                textAlign: 'center',
              }}
            >
              {'GitPOAP Onboarding'}
            </Text>
            <Text style={{ fontSize: rem(16) }}>{'A quick overview:'}</Text>
            <Text style={{ fontSize: rem(16) }}>
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
            <Text style={{ fontSize: rem(16) }}>
              {'GitPOAPs also come with utility - gated access, viewing tools, and a lot '}
              <StyledLink href="https://poap.directory/" target="_blank">
                more
              </StyledLink>
              {'!'}
            </Text>
            <Button
              onClick={() => {
                if (!user) {
                  /* User's ETH wallet isn't connected */
                  connect();
                } else if (!user?.capabilities.hasGithub) {
                  /* User doesn't have a connected Github */
                  setIsOnboardingConnectButtonActive(true);
                  github.authorize();
                } else {
                  /* If ETH wallet is connected & Github is connected, then progress */
                  setGetStarted(true);
                }
              }}
              leftIcon={!user ? <FaEthereum /> : <GoMarkGithub />}
              style={{ margin: `${rem(16)} auto`, width: 'fit-content' }}
            >
              {!user
                ? 'CONNECT WALLET'
                : !user?.capabilities.hasGithub
                ? 'CONNECT GITHUB'
                : 'GET STARTED'}
            </Button>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size={800}>
      <IntakeForm githubHandle={user.githubHandle} />
    </Container>
  );
};
