import { Stack, Group, Title, Modal } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';

import { useGetEmail } from '../../hooks/useGetEmail';
import { Button, Text } from '../shared/elements';
import {
  EmailConnectionModalConnect,
  EmailConnectionModalDisconnect,
  EmailConnectionModalPending,
  EmailConnectionModalSubmitted,
} from './EmailConnectionModalStates';
import { useEmailConnectionForm } from './useEmailConnectionForm';

export type EmailConnectionStatus = 'CONNECT' | 'SUBMITTED' | 'PENDING' | 'DISCONNECT';

export const EmailConnection = () => {
  const [status, setStatus] = useState<EmailConnectionStatus>('CONNECT');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userEmail = useGetEmail();

  useEffect(() => {
    if (userEmail) {
      if (userEmail.isValidated) {
        setStatus('DISCONNECT');
      } else if (new Date().getTime() < new Date(userEmail.tokenExpiresAt).getTime()) {
        setStatus('PENDING');
      }
    } else {
      setStatus('CONNECT');
    }
  }, [userEmail]);

  const { values, getInputProps, validate } = useEmailConnectionForm();

  return (
    <Group position="apart" my={4}>
      <Stack spacing={0}>
        <Group>
          <HiOutlineMail size={32} />
          <Title order={5}>Email</Title>
        </Group>
        {
          {
            CONNECT: <></>,
            SUBMITTED: <Text size="xs">{`Pending verification for ${values.email}`}</Text>,
            PENDING: <Text size="xs">{`Pending verification for ${userEmail?.emailAddress}`}</Text>,
            DISCONNECT: <Text size="xs">{`You're connected as ${userEmail?.emailAddress}`}</Text>,
          }[status]
        }
      </Stack>
      <Button
        variant={status === 'CONNECT' ? 'filled' : 'outline'}
        onClick={() => setIsModalOpen(true)}
      >
        {status}
      </Button>
      <Modal
        centered
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        padding={32}
        title={
          {
            CONNECT: 'Connect your email?',
            SUBMITTED: '',
            PENDING: 'Cancel this request?',
            DISCONNECT: 'Disconnect your email?',
          }[status]
        }
      >
        {
          {
            CONNECT: (
              <EmailConnectionModalConnect
                closeModal={() => setIsModalOpen(false)}
                getInputProps={getInputProps}
                setStatus={setStatus}
                validate={validate}
                values={values}
              />
            ),
            SUBMITTED: <EmailConnectionModalSubmitted values={values} />,
            PENDING: (
              <EmailConnectionModalPending
                closeModal={() => setIsModalOpen(false)}
                setStatus={setStatus}
                userEmail={userEmail}
              />
            ),
            DISCONNECT: (
              <EmailConnectionModalDisconnect
                closeModal={() => setIsModalOpen(false)}
                setStatus={setStatus}
                userEmail={userEmail}
              />
            ),
          }[status]
        }
      </Modal>
    </Group>
  );
};
