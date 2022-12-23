import React, { useCallback, useEffect } from 'react';
import { Stack, Group, Modal } from '@mantine/core';
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
  const { values, getInputProps, validate, setErrors, setValues } = useAddressForm();

  const [result, addMember] = useAddMembershipMutation();

  const handleSubmit = useCallback(async () => {
    if (!validate().hasErrors) {
      const res = await addMember({
        teamId,
        address: values.address,
      });

      if (res.data?.addNewMembership) {
        setValues({
          address: '',
        });
        onClose();
      }
    }
  }, [teamId, validate, values, addMember, onClose, setValues]);

  useEffect(() => {
    if (result.error) {
      setErrors({ address: result.error.message.replace('[GraphQL] ', '') });
    }
  }, [result, setErrors]);

  return (
    <Modal centered opened={isOpen} onClose={onClose} padding={32} title={'Add members'}>
      <Stack align="stretch" spacing={16}>
        <Text>{`Enter a valid Ethereum address.`}</Text>
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
          <Button onClick={handleSubmit} loading={result.fetching}>
            {'Add'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
