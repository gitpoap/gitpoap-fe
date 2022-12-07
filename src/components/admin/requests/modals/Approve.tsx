import React, { useCallback } from 'react';
import { Group, Text, Button, Modal } from '@mantine/core';
import { useApi } from '../../../../hooks/useApi';
import { Notifications } from '../../../../notifications';

type ModalProps = {
  gitPOAPRequestId: number;
  onClose: () => void;
  onSubmit: () => void;
};

export const GitPOAPRequestApproveModal = ({ gitPOAPRequestId, onClose, onSubmit }: ModalProps) => {
  const api = useApi();

  const submitApproveGitPOAPRequest = useCallback(async () => {
    const data = await api.gitPOAPRequest.approve(gitPOAPRequestId);
    if (data === null) {
      Notifications.error('Error - Request to claim GitPOAP failed');
      return;
    }
    onSubmit();
  }, [gitPOAPRequestId, api.gitPOAPRequest]);

  return (
    <Modal centered opened={true} onClose={onClose} title={<Text>{'Approve Request'}</Text>}>
      <Text>{'Are you sure you want to approve this request?'}</Text>
      <Group align="center" grow pt="lg" spacing="md" noWrap>
        <Button onClick={onClose} variant="outline">
          {'Cancel'}
        </Button>
        <Button onClick={submitApproveGitPOAPRequest}>{'Approve'}</Button>
      </Group>
    </Modal>
  );
};
