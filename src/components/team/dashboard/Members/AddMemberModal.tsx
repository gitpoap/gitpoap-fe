import React, { useCallback, useState } from 'react';
import { Stack, Group, Modal } from '@mantine/core';
import { utils } from 'ethers';
import { Button, Text, MultiSelect } from '../../../shared/elements';
import { useAddMembershipMutation } from '../../../../graphql/generated-gql';
import { shortenAddress } from '../../../../helpers';
import { Notifications } from '../../../../notifications';
import { rem } from 'polished';

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

    if (addresses.length === 0) {
      return;
    }

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
      Notifications.success(`Success - Added members`);

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
      padding={24}
      title={
        <Text size={28} sx={{ fontFamily: 'VT323' }}>
          Add members
        </Text>
      }
    >
      <Stack align="stretch" spacing={16}>
        <MultiSelect
          label={<Text>Enter ETH addresses</Text>}
          data={data}
          placeholder="0x1234567890b"
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(query) => {
            const item = { label: shortenAddress(query), value: query };
            setData((current) => [...current, item]);
            return item;
          }}
          value={values}
          onChange={(values) => {
            const errors = values.filter((value) => !utils.isAddress(value));
            if (errors.length === 1) {
              setError(`${errors[0]} is an invalid address`);
            } else if (errors.length === 2) {
              setError(`${errors[0]} and ${errors[1]} are invalid addresses`);
            } else if (errors.length > 2) {
              setError(
                `${errors.slice(0, -1).join(', ')}, and ${errors.slice(-1)} are invalid addresses`,
              );
            } else {
              setError('');
            }
            setValues(values);
          }}
          error={error}
          searchable
          creatable
          styles={{
            input: {
              height: rem(100),
            },
          }}
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
