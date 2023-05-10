import { Alert, Center, Container, List, Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Text } from '../shared/elements';
import { StyledLink } from './Completed';
import { IntakeForm } from './IntakeForm';
import { useAuthContext } from '../../hooks/useAuthContext';

export const OnboardingPage = () => {
  const { user } = useAuthContext();
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
              {`We’ve temporarily paused our GitHub repo onboarding, we’ll reach out when we’re ready to onboard you.`}
            </Alert>
            <Text style={{ fontSize: rem(16) }}>
              {'Here’s an overview of the onboarding process:'}
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
            <Text style={{ fontSize: rem(16) }}>
              {'If you’d like to be added to the waitlist, send an email to: team@gitpoap.io'}
            </Text>
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
