import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Group, Title, Tooltip } from '@mantine/core';
import { usePrivy } from '@privy-io/react-auth';
import { rem } from 'polished';
import { HiOutlineMail } from 'react-icons/hi';
import { truncateString } from '../../helpers';
import { useUser } from '../../hooks/useUser';
import { Button, Text } from '../shared/elements';

export type EmailConnectionStatus = 'CONNECT' | 'SUBMITTED' | 'PENDING' | 'DISCONNECT';

export const EmailConnection = () => {
  const user = useUser();
  const { user: privyUser, linkEmail, unlinkEmail } = usePrivy();
  const [status, setStatus] = useState<EmailConnectionStatus>('CONNECT');

  const userEmail = user?.emailAddress ?? '';

  useEffect(() => {
    if (userEmail) {
      setStatus('DISCONNECT');
    } else {
      setStatus('CONNECT');
    }
  }, [userEmail]);

  const handleSubmit = useCallback(async () => {
    if (status === 'CONNECT') {
      linkEmail();
    } else if (status === 'DISCONNECT') {
      setStatus('PENDING');
      await unlinkEmail(userEmail);
    }
  }, [linkEmail, unlinkEmail, status, userEmail]);

  const ConnectionStatus = {
    CONNECT: <Text size="xs">{`Emails will not be made public`}</Text>,
    SUBMITTED: (
      <Tooltip
        label={privyUser?.email?.address ?? ''}
        multiline
        transition="fade"
        position="top"
        sx={{ textAlign: 'center', maxWidth: rem(450) }}
      >
        <Text size="xs">{`Pending verification for ${truncateString(
          privyUser?.email?.address ?? '' ?? '',
          18,
        )}`}</Text>
      </Tooltip>
    ),
    PENDING: (
      <Tooltip
        label={privyUser?.email?.address ?? ''}
        multiline
        transition="fade"
        position="top"
        sx={{ textAlign: 'center', maxWidth: rem(450) }}
      >
        <Text size="xs">{`Pending verification for ${truncateString(
          privyUser?.email?.address ?? '',
          18,
        )}`}</Text>
      </Tooltip>
    ),
    DISCONNECT: <Text size="xs">{`You're connected as ${userEmail}`}</Text>,
  };

  return (
    <Group position="apart" my={4}>
      <Stack spacing={0}>
        <Group>
          <HiOutlineMail size={32} />
          <Stack spacing={0}>
            <Title order={5}>Email</Title>
            {ConnectionStatus[status]}
          </Stack>
        </Group>
      </Stack>
      <Button
        variant={status === 'CONNECT' ? 'filled' : 'outline'}
        onClick={handleSubmit}
        sx={{ width: rem(145) }}
        loading={status === 'PENDING'}
      >
        {status}
      </Button>
    </Group>
  );
};
