import { Stack, Title, Container } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import { Link } from '../shared/compounds/Link';
import { Text, Loader } from '../shared/elements';
import { GITPOAP_API_URL } from '../../constants';

type Props = {
  token: string;
};

type Status = 'VALID' | 'INVALID' | 'EXPIRED' | 'USED' | 'LOADING';

export const VerifyEmail = ({ token }: Props) => {
  const [status, setStatus] = useState<Status>('LOADING');

  useEffect(() => {
    if (token) {
      setStatus('LOADING');
      fetch(`${GITPOAP_API_URL}/email/verify`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activeToken: token }),
      })
        .then((response) => response.json())
        .then((data) => setStatus(data.msg ?? 'INVALID'));
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
                  You can generate a new one on the <Link href="/settings">settings page</Link>.
                </Text>
              </>
            ),
            EXPIRED: (
              <>
                <Title>Expired Link</Title>
                <Text>The verification link provided is expired.</Text>
                <Text>
                  You can generate a new one on the <Link href="/settings">settings page</Link>.
                </Text>
              </>
            ),
            USED: (
              <>
                <Title>Used Link</Title>
                <Text>The verification link provided has already been used.</Text>
                <Text>
                  You can generate a new one on the <Link href="/settings">settings page</Link>.
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
