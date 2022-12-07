import React, { useCallback } from 'react';
import { Group, Text, Button, Modal, Textarea } from '@mantine/core';
import { useApi } from '../../../../hooks/useApi';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Notifications } from '../../../../notifications';

type ModalProps = {
  gitPOAPRequestId: number;
  onClose: () => void;
  onSubmit: () => void;
};

export const GitPOAPRequestRejectModal = ({ gitPOAPRequestId, onClose, onSubmit }: ModalProps) => {
  const form = useForm<{ rejectionReason: string | null }>({
    initialValues: {
      rejectionReason: null,
    },
    validate: zodResolver(
      z.object({
        rejectionReason: z.string().min(1, { message: 'Rejection reason is required' }),
      }),
    ),
  });

  const api = useApi();

  const submitRejectGitPOAPRequest = useCallback(async () => {
    if (form.validate().hasErrors) {
      return;
    }
    const data = await api.gitPOAPRequest.reject(
      gitPOAPRequestId,
      form.values.rejectionReason as string,
    );
    if (data === null) {
      Notifications.error('Error - Unable to reject request');
      return;
    }
    onSubmit();
  }, [gitPOAPRequestId, api.gitPOAPRequest]);

  return (
    <Modal centered opened={true} onClose={onClose} title={<Text>{'Rejection Reason'}</Text>}>
      <Textarea
        label={<Text>{'What is the reason for this rejection:'}</Text>}
        {...form.getInputProps('rejectionReason')}
      />
      <Group align="center" grow pt="lg" spacing="md" noWrap>
        <Button onClick={onClose} variant="outline">
          {'Cancel'}
        </Button>
        <Button disabled={!form.isValid()} onClick={submitRejectGitPOAPRequest}>
          {'Reject'}
        </Button>
      </Group>
    </Modal>
  );
};
