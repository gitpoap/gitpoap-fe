import { Button, Center, Grid, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { validate } from 'email-validator';
import { rem } from 'polished';
import { useCallback, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineError, MdSend } from 'react-icons/md';
import { TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { GITPOAP_API_URL } from '../../environment';
import { Header, Input, Loader, Text } from '../shared/elements';

type LoadingState = 'initial' | 'loading' | 'success' | 'error';

export const PausedPage = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [email, setEmail] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>('');
  const matchesBreakpointSm = useMediaQuery(`(min-width: ${rem(BREAKPOINTS.sm)})`, false);

  const isDisabled = !validate(email) || email.length === 0;

  const submitEmail = useCallback(async () => {
    try {
      setLoadingState('loading');
      const resJwt = await fetch(`${GITPOAP_API_URL}/jwt/`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await (resJwt.json() as Promise<{ access_token: string }>);
      await fetch(`${GITPOAP_API_URL}/subscribe`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access_token}`,
        },
        method: 'POST',
        body: JSON.stringify({ email: email }),
      });
      setLoadingState('success');
      setEmail('');
      setFormStatus('Thanks! Email successfully submitted');
    } catch (e) {
      console.warn(e);
      setLoadingState('error');
      setFormStatus('Please enter a valid email address');
    }
  }, [email]);

  useEffect(() => {
    if (formStatus.length > 0) {
      setTimeout(() => setFormStatus(''), 5000);
    }
  }, [formStatus]);

  const icon =
    loadingState === 'loading' ? (
      <Loader color="white" size={14} />
    ) : loadingState === 'success' ? (
      <FaCheckCircle color={isDisabled ? TextGray : 'white'} size={14} />
    ) : loadingState === 'error' ? (
      <MdOutlineError color={isDisabled ? TextGray : 'white'} size={14} />
    ) : (
      <MdSend color={isDisabled ? TextGray : 'white'} size={14} />
    );

  return (
    <Center style={{ width: 480, height: 600, maxWidth: '90vw' }}>
      <Stack spacing={40}>
        <Header>{`We’ve Paused Onboarding New GitPOAP Issuers`}</Header>
        <Stack spacing={12}>
          <Text>{'Subscribe below for latest updates!'}</Text>
          <Grid gutter={0} sx={{ width: '100%' }}>
            <Grid.Col span="auto">
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder={'Email'}
                value={email}
                style={{ paddingRight: rem(7), width: '100%' }}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <Button
                onClick={async () => {
                  if (validate(email)) {
                    // TODO: trackClickEmailSignup('footer');
                    await submitEmail();
                  }
                }}
                disabled={isDisabled}
                style={{ height: rem(36) }}
                styles={() => ({
                  rightIcon: {
                    marginLeft: matchesBreakpointSm ? 10 : 0,
                  },
                })}
                rightIcon={matchesBreakpointSm && icon}
              >
                {matchesBreakpointSm ? 'Sign Up' : icon}
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
        <Text mt={12}>
          {`If you'd like to get in touch sooner, shoot an email over to team@gitpoap.io and we’ll get back to you as soon as we can.`}
        </Text>
      </Stack>
    </Center>
  );
};
