import React, { useState } from 'react';
import { Stack, Group, Modal } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
// import { utils } from 'ethers';

import { Button, Text, Input } from '../../../shared/elements';

type AddMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddMemberModal = ({ isOpen, onClose }: AddMemberModalProps) => {
  const [address, setAddress] = useState('');

  const handleSubmit = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
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
          value={address}
          onChange={handleChange}
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
