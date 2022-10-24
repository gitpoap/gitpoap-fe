import { Stack, Group, Text as TextUI } from '@mantine/core';
import React from 'react';
import { FaAt } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';

import { EmailConnectionStatus } from './EmailConnection';
import { EmailConnectionFormReturnTypes } from './useEmailConnectionForm';
import { Button, Input, Text } from '../shared/elements';
import { useWeb3Context } from '../wallet/Web3Context';
import { GITPOAP_API_URL } from '../../constants';
import { Notifications } from '../../notifications';
import { EmailReturnType } from '../../lib/api/email';

type ConnectProps = {
  closeModal: () => void;
  getInputProps: EmailConnectionFormReturnTypes['getInputProps'];
  setStatus: (status: EmailConnectionStatus) => void;
  validate: EmailConnectionFormReturnTypes['validate'];
  values: EmailConnectionFormReturnTypes['values'];
};

export const EmailConnectionModalConnect = ({
  closeModal,
  getInputProps,
  setStatus,
  validate,
  values,
}: ConnectProps) => {
  const { web3Provider } = useWeb3Context();
  const signer = web3Provider?.getSigner();
  return (
    <Stack align="stretch" spacing={16}>
      <Text>{`Enter a valid email address.`}</Text>
      <Input icon={<FaAt />} placeholder="Email" required {...getInputProps('email')} />
      <Group grow mt={16}>
        <Button color="red" onClick={closeModal} variant="outline">
          {'Cancel'}
        </Button>
        <Button
          onClick={async () => {
            if (!validate().hasErrors) {
              const address = await signer?.getAddress();
              const timestamp = Date.now();

              try {
                const signature = await signer?.signMessage(
                  JSON.stringify({
                    site: 'gitpoap.io',
                    method: 'POST /email',
                    createdAt: timestamp,
                    emailAddress: values.email,
                  }),
                );

                const res = await fetch(`${GITPOAP_API_URL}/email`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    emailAddress: values.email,
                    address,
                    signature: {
                      data: signature,
                      createdAt: timestamp,
                    },
                  }),
                });

                if (!res || !res.ok) {
                  throw new Error();
                } else {
                  setStatus('SUBMITTED');
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

export const EmailConnectionModalSubmitted = ({ values }: SubmittedProps) => {
  return (
    <Stack align="center" spacing={8}>
      <HiOutlineMailOpen size={64} />
      <TextUI my={16} size={24} weight="bold">{`Verify your email`}</TextUI>
      <TextUI>{`We've sent a verification link to`}</TextUI>
      <TextUI size="lg" weight="bold">
        {values.email}
      </TextUI>
      <TextUI align="center">{`Please check your inbox and click the link to confirm your request.`}</TextUI>

      <TextUI mt={32}>{`This link expires in 24 hours`}</TextUI>
    </Stack>
  );
};

type PendingProps = {
  closeModal: () => void;
  setStatus: (status: EmailConnectionStatus) => void;
  userEmail: EmailReturnType;
};

export const EmailConnectionModalPending = ({ closeModal, setStatus, userEmail }: PendingProps) => {
  const { web3Provider } = useWeb3Context();
  const signer = web3Provider?.getSigner();
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
            const address = await signer?.getAddress();
            const timestamp = Date.now();

            try {
              const signature = await signer?.signMessage(
                JSON.stringify({
                  site: 'gitpoap.io',
                  method: 'DELETE /email',
                  createdAt: timestamp,
                  id: userEmail?.id,
                }),
              );

              const res = await fetch(`${GITPOAP_API_URL}/email`, {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: userEmail?.id,
                  address,
                  signature: {
                    data: signature,
                    createdAt: timestamp,
                  },
                }),
              });

              if (!res || !res.ok) {
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
  userEmail: EmailReturnType;
};

export const EmailConnectionModalDisconnect = ({
  closeModal,
  setStatus,
  userEmail,
}: DisconnectProps) => {
  const { web3Provider } = useWeb3Context();
  const signer = web3Provider?.getSigner();
  return (
    <Stack align="stretch" spacing={16}>
      <Text>{`Are you sure you want to disconnect your email? This action is irreversible.`}</Text>
      <Group grow mt={16}>
        <Button
          color="red"
          onClick={async () => {
            const address = await signer?.getAddress();
            const timestamp = Date.now();

            try {
              const signature = await signer?.signMessage(
                JSON.stringify({
                  site: 'gitpoap.io',
                  method: 'DELETE /email',
                  createdAt: timestamp,
                  id: userEmail?.id,
                }),
              );

              const res = await fetch(`${GITPOAP_API_URL}/email`, {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: userEmail?.id,
                  address,
                  signature: {
                    data: signature,
                    createdAt: timestamp,
                  },
                }),
              });

              if (!res || !res.ok) {
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
