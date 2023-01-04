import React, { useCallback, useState } from 'react';
import { Stack, Group, Modal, MultiSelect } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { utils } from 'ethers';
import { Button } from '../../../shared/elements';
import { useAddMembershipMutation } from '../../../../graphql/generated-gql';
import { getMembershipGQLErrorMessage } from '../../../../helpers';

type AddMemberModalProps = {
  teamId: number;
  isOpen: boolean;
  onClose: () => void;
  refetchMemberships: () => void;
};

export const AddMemberModal = ({
  teamId,
  isOpen,
  onClose,
  refetchMemberships,
}: AddMemberModalProps) => {
  const [values, setValues] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [result, addMember] = useAddMembershipMutation();

  const handleSubmit = useCallback(async () => {
    const addresses = values.map((address) => address.trim());
    const results = await Promise.all(
      addresses.map((address) =>
        addMember({
          teamId,
          address,
        }),
      ),
    );

    let errors = '';
    results.forEach((res, index) => {
      if (res.error) {
        const errorMessage = res.error.message.replace('[GraphQL] ', '');
        errors += `${addresses[index]}: ${getMembershipGQLErrorMessage(errorMessage)}\n`;
      }
    });

    if (errors) {
      setError(errors);
    } else {
      refetchMemberships();
      setValues([]);
      onClose();
    }
  }, [teamId, addMember, onClose, setError, refetchMemberships, values]);

  const handleClose = useCallback(() => {
    setError('');
    onClose();
  }, [setError, onClose]);

  return (
    <Modal centered opened={isOpen} onClose={handleClose} padding={32} title={'Add members'}>
      <Stack align="stretch" spacing={16}>
        <MultiSelect
          label="Enter ETH addresses"
          data={[]}
          placeholder="0x1234567890b"
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            if (!utils.isAddress(query)) {
              setError(`${query} is an invalid address`);
              return;
            } else {
              setError('');
              setValues([...values, query]);
              return item;
            }
          }}
          error={error}
          onChange={(value) => setValues(value)}
          onKeyDown={getHotkeyHandler([
            [
              'Enter',
              () => {
                void handleSubmit();
              },
            ],
          ])}
          searchable
          creatable
          required
        />
        <Group grow mt={16}>
          <Button color="red" variant="outline" onClick={handleClose} disabled={result.fetching}>
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
