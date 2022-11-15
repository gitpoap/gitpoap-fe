import { Stack, Title, Container } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link } from '../shared/compounds/Link';
import { Text, Loader } from '../shared/elements';
import { Notifications } from '../../notifications';
import { useApi } from '../../hooks/useApi';
import { Status } from '../../lib/api/email';

type Props = {
  token: string;
};

export const VerifyEmail = ({ token }: Props) => {
  const [status, setStatus] = useState<Status>('LOADING');
  const api = useApi();

  const verifyToken = async () => {
    const data = await api.email.verify(token);

    if (!data) {
      setStatus('INVALID');
      Notifications.error('Oops, something went wrong!');
      return;
    }

    setStatus(data.msg ?? 'INVALID');
  };

  useEffect(() => {
    if (token) {
      setStatus('LOADING');
      void verifyToken();
    }
  }, [token]);

  return (
    <Container my={64} size={600}>
      <Stack spacing={32} align="center">
        {
          {
            VALID: (
              <>
                <Title>🎉 Success 🎉</Title>
                <Text>Your email has been verified!</Text>
                <Text>You can now be awarded GitPOAPs based on your email address.</Text>
              </>
            ),
            INVALID: (
              <>
                <Title>Invalid Link</Title>
                <Text>The verification link provided is invalid.</Text>
                <Text>
                  {'You can generate a new one in your '}
                  <Link href="/settings">{'settings'}</Link>
                  {'.'}
                </Text>
              </>
            ),
            EXPIRED: (
              <>
                <Title>Expired Link</Title>
                <Text>The verification link provided is expired.</Text>
                <Text>
                  {'You can generate a new one in your '}
                  <Link href="/settings">{'settings'}</Link>
                  {'.'}
                </Text>
              </>
            ),
            USED: (
              <>
                <Title>Used Link</Title>
                <Text>The verification link provided has already been used.</Text>
                <Text>
                  {'You can generate a new one in your '}
                  <Link href="/settings">{'settings'}</Link>
                  {'.'}
                </Text>
              </>
            ),
            LOADING: (
              <>
                <Loader />
              </>
            ),
          }[status]
        }
      </Stack>
    </Container>
  );
};
