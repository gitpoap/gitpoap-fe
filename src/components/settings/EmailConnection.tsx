import { Stack, Group, Text as TextUI, Title, Modal } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { FaAt } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineMailOpen } from 'react-icons/hi';
import { z } from 'zod';

import { Button, Input, Text } from '../shared/elements';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { NotificationFactory } from '../../notifications';
import { useUserEmailQuery } from '../../graphql/generated-gql';
import { GITPOAP_API_URL } from '../../constants';

type Props = {
  ethAddress: string;
};

export const EmailConnection = ({ ethAddress }: Props) => {
  const { web3Provider } = useWeb3Context();
  const signer = web3Provider?.getSigner();
  const [status, setStatus] =
    useState<'CONNECT' | 'SUBMITTED' | 'PENDING' | 'DISCONNECT'>('CONNECT');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userEmailResponse] = useUserEmailQuery({ variables: { ethAddress } });
  const userEmail = userEmailResponse.data?.userEmail;

  useEffect(() => {
    if (userEmail) {
      if (userEmail.isValidated) {
        setStatus('DISCONNECT');
      } else if (new Date(userEmail.tokenExpiresAt).getTime() > new Date().getTime()) {
        setStatus('PENDING');
      }
    } else {
      setStatus('CONNECT');
    }
  }, [userEmail]);

  const { values, getInputProps, validate } = useForm<{
    email: string;
  }>({
    validate: zodResolver(z.object({ email: z.string().email() })),
    initialValues: {
      email: '',
    },
  });

  return (
    <Group position="apart" p={16}>
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
            DISCONNECT: <Text size="xs">{`You are connected as ${userEmail?.emailAddress}`}</Text>,
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
              <Stack align="stretch" spacing={16}>
                <Text>{`Enter a valid email address.`}</Text>
                <Input icon={<FaAt />} placeholder="Email" required {...getInputProps('email')} />
                <Group grow mt={16}>
                  <Button color="red" onClick={() => setIsModalOpen(false)} variant="outline">
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
                          showNotification(
                            NotificationFactory.createError('Oops, something went wrong! 🤥'),
                          );
                        }
                      }
                    }}
                  >
                    {'Submit'}
                  </Button>
                </Group>
              </Stack>
            ),
            SUBMITTED: (
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
            ),
            PENDING: (
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
                          setIsModalOpen(false);
                          setStatus('CONNECT');
                        }
                      } catch (err) {
                        showNotification(
                          NotificationFactory.createError('Oops, something went wrong! 🤥'),
                        );
                      }
                    }}
                  >
                    {'Cancel Request'}
                  </Button>
                </Group>
              </Stack>
            ),
            DISCONNECT: (
              <Stack align="stretch" spacing={16}>
                <Text>
                  {`Are you sure you want to disconnect your email? This action is irreversible.`}
                </Text>
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
                          setIsModalOpen(false);
                          setStatus('CONNECT');
                        }
                      } catch (err) {
                        showNotification(
                          NotificationFactory.createError('Oops, something went wrong! 🤥'),
                        );
                      }
                    }}
                  >
                    {'Disconnect'}
                  </Button>
                </Group>
              </Stack>
            ),
          }[status]
        }
      </Modal>
    </Group>
  );
};
