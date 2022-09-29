import { Stack, Group, Text as TextUI, Title, Modal } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React, { ReactNode, useState } from 'react';
import { FaAt } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineMailOpen } from 'react-icons/hi';
import { z } from 'zod';

import { Button, Input, Text } from '../shared/elements';
import { makeGitPOAPAPIRequest } from '../../lib/gitpoap';
import { NotificationFactory } from '../../notifications';

export const EmailConnection = () => {
  const [status, setStatus] =
    useState<'CONNECT' | 'SUBMITTED' | 'VALIDATING' | 'DISCONNECT'>('SUBMITTED');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { values, getInputProps, validate } = useForm<{
    email: string;
  }>({
    validate: zodResolver(z.object({ email: z.string().email() })),
    initialValues: {
      email: '',
    },
  });

  const modalTitle = (): string => {
    switch (status) {
      case 'CONNECT':
        return 'Connect your email?';
      case 'SUBMITTED':
        return '';
      case 'VALIDATING':
        return 'Cancel this request?';
      case 'DISCONNECT':
        return 'Disconnect your email?';
    }
  };

  const modalContent = (): ReactNode => {
    switch (status) {
      case 'CONNECT':
        return (
          <Stack align="stretch" spacing={16}>
            <Text>{`Enter a valid email address.`}</Text>
            <Input
              icon={<FaAt />}
              // label={'Email'}
              placeholder="Email"
              required
              {...getInputProps('email')}
            />
            <Group grow mt={16}>
              <Button color="red" onClick={() => setIsModalOpen(false)} variant="outline">
                {'Cancel'}
              </Button>
              <Button
                onClick={async () => {
                  if (!validate().hasErrors) {
                    const formData = new FormData();

                    formData.append('email', values.email);

                    const res = await makeGitPOAPAPIRequest('POST', '/email', formData);

                    if (!res || !res.ok) {
                      showNotification(
                        NotificationFactory.createError('Oops, something went wrong! 🤥'),
                      );
                    } else {
                      setStatus('SUBMITTED');
                    }
                  }
                }}
              >
                {'Submit'}
              </Button>
            </Group>
          </Stack>
        );
      case 'SUBMITTED':
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
      case 'VALIDATING':
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
                  const formData = new FormData();

                  // TODO
                  formData.append('id', 'id');

                  const res = await makeGitPOAPAPIRequest('DELETE', '/email', formData);

                  if (!res || !res.ok) {
                    showNotification(
                      NotificationFactory.createError('Oops, something went wrong! 🤥'),
                    );
                  } else {
                    setIsModalOpen(false);
                  }
                }}
              >
                {'Cancel Request'}
              </Button>
            </Group>
          </Stack>
        );
      case 'DISCONNECT':
        return (
          <Stack align="stretch" spacing={16}>
            <Text>
              {`Are you sure you want to disconnect your email? This action is irreversible.`}
            </Text>
            <Group grow mt={16}>
              <Button color="red" onClick={() => setIsModalOpen(false)} variant="outline">
                {'Cancel'}
              </Button>
              <Button
                color="red"
                onClick={async () => {
                  const formData = new FormData();

                  // TODO
                  formData.append('id', 'id');

                  const res = await makeGitPOAPAPIRequest('DELETE', '/email', formData);

                  if (!res || !res.ok) {
                    showNotification(
                      NotificationFactory.createError('Oops, something went wrong! 🤥'),
                    );
                  } else {
                    setIsModalOpen(false);
                  }
                }}
              >
                {'Disconnect'}
              </Button>
            </Group>
          </Stack>
        );
    }
  };

  return (
    <Group position="apart" p={16}>
      <Group>
        <HiOutlineMail size={32} />
        <Title order={5}>Email</Title>
      </Group>
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
        title={modalTitle()}
      >
        {modalContent()}
      </Modal>
    </Group>
  );
};
