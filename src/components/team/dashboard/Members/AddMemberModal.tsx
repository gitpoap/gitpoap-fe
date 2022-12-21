import React, { useCallback } from 'react';
import { Stack, Group, Modal } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';

import { Button, Text, Input } from '../../../shared/elements';
import { useAddressForm } from './useAddressForm';

type AddMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddMemberModal = ({ isOpen, onClose }: AddMemberModalProps) => {
  const { values, getInputProps, validate } = useAddressForm();

  const handleSubmit = () => {
    if (!validate().hasErrors) {
      console.log('address', values.address);
    }
  };

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
          <Button color="red" onClick={onClose} variant="outline">
            {'Cancel'}
          </Button>
          <Button onClick={handleSubmit}>{'Add'}</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
