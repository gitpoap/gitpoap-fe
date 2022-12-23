import React, { useCallback } from 'react';
import { Stack, Group, Modal } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { rem } from 'polished';
import { Button, TextArea } from '../../../shared/elements';
import { useAddressForm } from './useAddressForm';
import { useAddMembershipMutation } from '../../../../graphql/generated-gql';
import { DarkGray } from '../../../../colors';

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
      const addresses = values.addresses.split(',').map((address) => address.trim());
      Promise.all(
        addresses.map((address) =>
          addMember({
            teamId,
            address,
          }),
        ),
      )
        .then((results) => {
          let errors = '';
          results.forEach((res, index) => {
            if (res.error) {
              errors += `${addresses[index]}: ${res.error.message.replace('[GraphQL] ', '')}\n`;
            }
          });

          if (errors) {
            setErrors({
              addresses: errors,
            });
          } else {
            setValues({
              addresses: '',
            });
            onClose();
          }
        })
        .catch((error) => {
          setErrors(error);
        });
    }
  }, [teamId, validate, values, addMember, onClose, setValues, setErrors]);

  return (
    <Modal centered opened={isOpen} onClose={onClose} padding={32} title={'Add members'}>
      <Stack align="stretch" spacing={16}>
        <TextArea
          label="Enter ETH addresses separated by commas"
          placeholder="0x1234567890b,0x1234567812d"
          {...getInputProps('addresses')}
          onKeyDown={getHotkeyHandler([
            [
              'Enter',
              () => {
                void handleSubmit();
              },
            ],
          ])}
          id="addresses"
          styles={{
            input: {
              border: `${rem(1)} solid ${DarkGray} !important`,
            },
          }}
          required
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
