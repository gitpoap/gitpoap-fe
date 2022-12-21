import React, { useCallback, useEffect } from 'react';
import { Stack, Group, Modal, Loader } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';

import { Button, Text, Input } from '../../../shared/elements';
import { useAddressForm } from './useAddressForm';
import { useAddMembershipMutation } from '../../../../graphql/generated-gql';

type AddMemberModalProps = {
  teamId: number;
  isOpen: boolean;
  onClose: () => void;
};

export const AddMemberModal = ({ teamId, isOpen, onClose }: AddMemberModalProps) => {
  const { values, getInputProps, validate, setErrors } = useAddressForm();

  const [result, addMember] = useAddMembershipMutation();

  const handleSubmit = useCallback(async () => {
    if (!validate().hasErrors) {
      addMember({
        teamId,
        address: values.address,
      });
    }
  }, [teamId, validate, values, addMember]);

  useEffect(() => {
    if (result.error) {
      setErrors({ address: result.error.message });
    }
  }, [result, setErrors]);

  if (result.data) {
    return (
      <Modal
        centered
        opened={isOpen}
        onClose={onClose}
        padding={32}
        title={'Successfully added a new member'}
      ></Modal>
    );
  }

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      padding={32}
      title={'Add a new member by address'}
    >
      <Stack align="stretch" spacing={16}>
        <Text>{`Enter a valid eth address.`}</Text>
        <Input
          placeholder="Address"
          required
          {...getInputProps('address')}
          onKeyDown={getHotkeyHandler([
            [
              'Enter',
              () => {
                void handleSubmit();
              },
            ],
          ])}
        />
        <Group grow mt={16}>
          <Button color="red" variant="outline" onClick={onClose} disabled={result.fetching}>
            {'Cancel'}
          </Button>
          <Button onClick={handleSubmit} disabled={result.fetching}>
            {result.fetching ? <Loader /> : 'Add'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
