import { Stack, Group, Title, Modal } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React, { ReactNode, useState } from 'react';
import { FaAt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { z } from 'zod';

import { Button, Input, Text } from '../shared/elements';
import { makeGitPOAPAPIRequest } from '../../lib/gitpoap';
import { NotificationFactory } from '../../notifications';

export const EmailConnection = () => {
  const [status, setStatus] =
    useState<'CONNECT' | 'SUBMITTED' | 'VALIDATING' | 'DISCONNECT'>('CONNECT');
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
        return 'Success!';
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
          <>
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
          </>
        );
      case 'SUBMITTED':
        return <Text>{`Check your inbox for a verification link.`}</Text>;
      case 'VALIDATING':
        return (
          <>
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
          </>
        );
      case 'DISCONNECT':
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <Group position="apart" p={16}>
      <Group>
        <MdOutlineEmail size={32} />
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
        <Stack align="stretch" spacing={16}>
          {modalContent()}
        </Stack>
      </Modal>
    </Group>
  );
};
