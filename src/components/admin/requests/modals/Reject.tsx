import React, { useCallback } from 'react';
import { Group, Text, Button, Modal, Textarea } from '@mantine/core';
import { useApi } from '../../../../hooks/useApi';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

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
    // setRejectStatus(ButtonStatus.LOADING);
    const data = await api.gitPOAPRequest.reject(
      gitPOAPRequestId,
      form.values.rejectionReason as string,
    );
    if (data === null) {
      // setRejectStatus(ButtonStatus.ERROR);
      return;
    }
    // setRejectStatus(ButtonStatus.SUCCESS);
    onSubmit();
  }, [gitPOAPRequestId, api.gitPOAPRequest]);

  return (
    <Modal
      centered
      opened={true}
      onClose={onClose}
      size="auto"
      title={<Text>{'Rejection Reason'}</Text>}
    >
      <Textarea
        label={<Text>{'What is the reason for this rejection:'}</Text>}
        {...form.getInputProps('rejectionReason')}
      />
      <Group align="center" grow pt="lg" spacing="md" noWrap>
        <Button onClick={onClose} variant="filled">
          {'Cancel'}
        </Button>
        <Button disabled={!form.isValid()} onClick={submitRejectGitPOAPRequest} variant="filled">
          {'Reject'}
        </Button>
      </Group>
    </Modal>
  );
};
