import { Stack, Group, Text as TextUI } from '@mantine/core';
import React from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';

import { EmailConnectionStatus } from './EmailConnection';
import { EmailConnectionFormReturnTypes } from './useEmailConnectionForm';
import { Button, Input, Text } from '../shared/elements';
import { Notifications } from '../../notifications';
import { useApi } from '../../hooks/useApi';

type ConnectProps = {
  closeModal: () => void;
  getInputProps: EmailConnectionFormReturnTypes['getInputProps'];
  setErrors: EmailConnectionFormReturnTypes['setErrors'];
  setStatus: (status: EmailConnectionStatus) => void;
  validate: EmailConnectionFormReturnTypes['validate'];
  values: EmailConnectionFormReturnTypes['values'];
};

export const EmailConnectionModalConnect = ({
  closeModal,
  getInputProps,
  setErrors,
  setStatus,
  validate,
  values,
}: ConnectProps) => {
  const api = useApi();
  return (
    <Stack align="stretch" spacing={16}>
      <Text>{`Enter a valid email address.`}</Text>
      <Input placeholder="Email" required {...getInputProps('email')} />
      <Group grow mt={16}>
        <Button color="red" onClick={closeModal} variant="outline">
          {'Cancel'}
        </Button>
        <Button
          onClick={async () => {
            if (!validate().hasErrors) {
              try {
                const data = await api.email.add(values.email);

                if (data === null) {
                  throw new Error();
                } else if (data.msg === 'SUBMITTED') {
                  setStatus('SUBMITTED');
                } else if (data.msg === 'TAKEN') {
                  setErrors({ email: 'Email is already taken' });
                } else {
                  throw new Error();
                }
              } catch (err) {
                Notifications.error('Oops, something went wrong!');
              }
            }
          }}
        >
          {'Submit'}
        </Button>
      </Group>
    </Stack>
  );
};

type SubmittedProps = {
  values: EmailConnectionFormReturnTypes['values'];
};

export const EmailConnectionModalSubmitted = ({ values }: SubmittedProps) => (
  <Stack align="center" spacing={8}>
    <HiOutlineMailOpen size={64} />
    <TextUI my={16} size={24} weight="bold">{`Verify your email`}</TextUI>
    <TextUI>{`We've sent a verification link to`}</TextUI>
    <TextUI size="lg" weight="bold">
      {values.email}
    </TextUI>
    <TextUI align="center">{`Check your inbox and click the link to confirm your request.`}</TextUI>

    <TextUI mt={32}>{`This link expires in 24 hours`}</TextUI>
  </Stack>
);

type PendingProps = {
  closeModal: () => void;
  setStatus: (status: EmailConnectionStatus) => void;
};

export const EmailConnectionModalPending = ({ closeModal, setStatus }: PendingProps) => {
  const api = useApi();
  return (
    <Stack align="stretch" spacing={16}>
      <Text>
        {`Your email is currently waiting to be validated, check your inbox for the verification link.`}
      </Text>
      <Text>{`Would you like to cancel this request?`}</Text>
      <Group grow mt={16}>
        <Button
          color="red"
          onClick={async () => {
            try {
              const data = await api.email.delete();

              if (data === null) {
                throw new Error();
              } else {
                closeModal();
                setStatus('CONNECT');
              }
            } catch (err) {
              Notifications.error('Oops, something went wrong!');
            }
          }}
        >
          {'Cancel Request'}
        </Button>
      </Group>
    </Stack>
  );
};

type DisconnectProps = {
  closeModal: () => void;
  setStatus: (status: EmailConnectionStatus) => void;
};

export const EmailConnectionModalDisconnect = ({ closeModal, setStatus }: DisconnectProps) => {
  const api = useApi();
  return (
    <Stack align="stretch" spacing={16}>
      <Text>{`Are you sure you want to disconnect your email? This action is irreversible.`}</Text>
      <Group grow mt={16}>
        <Button
          color="red"
          onClick={async () => {
            try {
              const data = await api.email.delete();

              if (data === null) {
                throw new Error();
              } else {
                closeModal();
                setStatus('CONNECT');
              }
            } catch (err) {
              Notifications.error('Oops, something went wrong!');
            }
          }}
        >
          {'Disconnect'}
        </Button>
      </Group>
    </Stack>
  );
};
