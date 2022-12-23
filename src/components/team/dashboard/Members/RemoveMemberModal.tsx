import React, { useCallback } from 'react';
import { Stack, Group, Modal } from '@mantine/core';
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
    const res = await removeMember({
      teamId,
      address,
    });

    if (res.data?.removeMembership) {
      onClose();
    }
  }, [teamId, address, removeMember, onClose]);

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      padding={32}
      title={'Are you sure to remove this member from the team?'}
    >
      <Stack align="stretch" spacing={16}>
        {result.error && <Text color="red">{result.error.message.replace('[GraphQL] ', '')}</Text>}
        <Group grow mt={16}>
          <Button color="red" variant="outline" onClick={onClose} disabled={result.fetching}>
            {'Cancel'}
          </Button>
          <Button onClick={handleSubmit} loading={result.fetching}>
            {'Delete'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
