import { Stack, Group, Title, Modal } from '@mantine/core';
import { rem } from 'polished';
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

  const { values, getInputProps, setErrors, validate } = useEmailConnectionForm();

  const ConnectionStatus = {
    CONNECT: <Text size="xs">{`Emails will not be made public`}</Text>,
    SUBMITTED: <Text size="xs">{`Pending verification for ${values.email}`}</Text>,
    PENDING: <Text size="xs">{`Pending verification for ${userEmail?.emailAddress}`}</Text>,
    DISCONNECT: <Text size="xs">{`You're connected as ${userEmail?.emailAddress}`}</Text>,
  };

  const ModalTitle = {
    CONNECT: 'Connect your email?',
    SUBMITTED: '',
    PENDING: 'Cancel this request?',
    DISCONNECT: 'Disconnect your email?',
  };

  const ModalContent = {
    CONNECT: (
      <EmailConnectionModalConnect
        closeModal={() => setIsModalOpen(false)}
        getInputProps={getInputProps}
        setErrors={setErrors}
        setStatus={setStatus}
        validate={validate}
        values={values}
      />
    ),
    SUBMITTED: (
      <EmailConnectionModalSubmitted
        closeModal={() => setIsModalOpen(false)}
        setStatus={setStatus}
        values={values}
      />
    ),
    PENDING: (
      <EmailConnectionModalPending closeModal={() => setIsModalOpen(false)} setStatus={setStatus} />
    ),
    DISCONNECT: (
      <EmailConnectionModalDisconnect
        closeModal={() => setIsModalOpen(false)}
        setStatus={setStatus}
      />
    ),
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
        onClick={() => setIsModalOpen(true)}
        sx={{ width: rem(145) }}
      >
        {status}
      </Button>
      <Modal
        centered
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        padding={32}
        title={ModalTitle[status]}
      >
        {ModalContent[status]}
      </Modal>
    </Group>
  );
};
