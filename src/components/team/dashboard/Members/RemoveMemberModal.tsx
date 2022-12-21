import React, { useCallback } from 'react';
import { Stack, Group, Modal, Loader } from '@mantine/core';

import { Button, Text } from '../../../shared/elements';
import { useRemoveMembershipMutation } from '../../../../graphql/generated-gql';

type RemoveMemberModalProps = {
  teamId: number;
  address: string;
  isOpen: boolean;
  onClose: () => void;
};

export const RemoveMemberModal = ({ teamId, address, isOpen, onClose }: RemoveMemberModalProps) => {
  const [result, removeMember] = useRemoveMembershipMutation();

  const handleSubmit = useCallback(async () => {
    removeMember({
      teamId,
      address,
    });
  }, [teamId, address, removeMember]);

  if (result.data?.removeMembership) {
    return (
      <Modal
        centered
        opened={isOpen}
        onClose={onClose}
        padding={32}
        title={'Successfully removed a member from the team'}
      ></Modal>
    );
  }

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      padding={32}
      title={'Are you sure to remove this member from the team?'}
    >
      <Stack align="stretch" spacing={16}>
        {result.error && <Text color="red">{result.error.message}</Text>}
        <Group grow mt={16}>
          <Button color="red" variant="outline" onClick={onClose} disabled={result.fetching}>
            {'Cancel'}
          </Button>
          <Button onClick={handleSubmit} disabled={result.fetching}>
            {result.fetching ? <Loader /> : 'Delete'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
