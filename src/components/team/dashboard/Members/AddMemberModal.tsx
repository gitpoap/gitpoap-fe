import React, { useCallback, useState } from 'react';
import { Stack, Group, Modal } from '@mantine/core';
import { utils } from 'ethers';
import { Button, Text, MultiSelect } from '../../../shared/elements';
import { useAddMembershipMutation } from '../../../../graphql/generated-gql';
import { shortenAddress } from '../../../../helpers';

type AddMemberModalProps = {
  teamId: number;
  isOpen: boolean;
  onClose: () => void;
  refetchMemberships: () => void;
};

type Item = { value: string; label: string };

export const AddMemberModal = ({
  teamId,
  isOpen,
  onClose,
  refetchMemberships,
}: AddMemberModalProps) => {
  const [data, setData] = useState<Item[]>([]);
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
    const hasError = results.some((res) => res.error);
    if (hasError) {
      setError('Something went wrong');
    } else {
      refetchMemberships();
      setData([]);
      setValues([]);
      onClose();
    }
  }, [teamId, addMember, onClose, setError, refetchMemberships, values]);

  const handleClose = useCallback(() => {
    setError('');
    onClose();
  }, [setError, onClose]);

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={handleClose}
      padding={32}
      title={<Text>Add members</Text>}
    >
      <Stack align="stretch" spacing={16}>
        <MultiSelect
          label={<Text>Enter ETH addresses</Text>}
          data={data}
          placeholder="0x1234567890b"
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(query) => {
            const item = { label: shortenAddress(query), value: query };
            if (!utils.isAddress(query)) {
              setError(`${query} is an invalid address`);
              return;
            } else {
              setError('');
              setData((current) => [...current, item]);
              return item;
            }
          }}
          value={values}
          onChange={setValues}
          error={error}
          searchable
          creatable
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
