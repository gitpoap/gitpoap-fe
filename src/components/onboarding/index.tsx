import { useState } from 'react';
import { Center, Code, Container, Group, Radio, Stack, Stepper } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { GoMarkGithub } from 'react-icons/go';
import { z } from 'zod';

import { Button } from '../shared/elements';
import { Text } from '../shared/elements';

import { useAuthContext } from '../github/AuthContext';
import { IntakeForm } from './IntakeForm';

export const OnboardingPage = () => {
  const { tokens, handleLogout, authorizeGitHub, isLoggedIntoGitHub, user } = useAuthContext();

  if (isLoggedIntoGitHub && tokens) {
    return <IntakeForm accessToken={tokens.accessToken} />;
  }

  return (
    <Container>
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
};
