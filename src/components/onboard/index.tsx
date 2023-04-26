import { Alert, Center, Container, List, Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { GoMarkGithub } from 'react-icons/go';
import { Button, Text } from '../shared/elements';
import { StyledLink } from './Completed';
import { IntakeForm } from './IntakeForm';
import { ConnectWalletButton } from '../wallet/ConnectWallet';
import { useAuthContext } from '../../hooks/useAuthContext';
import { usePrivy } from '@privy-io/react-auth';

export const OnboardingPage = () => {
  const { user } = useAuthContext();
  const { linkGithub } = usePrivy();
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
              {'GitPOAP Onboarding Waitlist'}
            </Text>
            <Alert icon={<FiAlertCircle />} color="red">
              {`We’ve temporarily paused our GitHub repo onboarding, submit a request here to be added to the waitlist and we’ll reach out when we’re ready to onboard you.  If you have any questions, email team@gitpoap.io and we’ll get back to you as soon as we can.`}
            </Alert>
            <Text style={{ fontSize: rem(16) }}>
              {'An overview of the process once you’re off the waitlist:'}
            </Text>
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
            {!user ? (
              <ConnectWalletButton
                style={{ margin: `${rem(16)} auto`, width: 'fit-content' }}
                leftIcon={<FaEthereum />}
              >
                {'CONNECT WALLET'}
              </ConnectWalletButton>
            ) : (
              <Button
                onClick={() => {
                  if (!user?.capabilities.hasGithub) {
                    /* User doesn't have a connected Github */
                    setIsOnboardingConnectButtonActive(true);
                    linkGithub();
                  } else {
                    /* If ETH wallet is connected & Github is connected, then progress */
                    setGetStarted(true);
                  }
                }}
                leftIcon={<GoMarkGithub />}
                style={{ margin: `${rem(16)} auto`, width: 'fit-content' }}
              >
                {!user?.capabilities.hasGithub ? 'CONNECT GITHUB' : 'GET STARTED'}
              </Button>
            )}
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
