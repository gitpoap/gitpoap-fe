import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Stack, Group, Modal } from '@mantine/core';
import { useApi } from '../../hooks/useApi';
import { FileWithPath } from '@mantine/dropzone';
import { Input, Button, Text, TextArea } from '../../components/shared/elements';
import { HexagonDropzone } from '../shared/compounds/HexagonDropzone';
import { useCreateTeamForm } from './useCreateTeamForm';

type CreateTeamModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTeamModal = ({ isOpen, onClose }: CreateTeamModalProps) => {
  const api = useApi();
  const router = useRouter();

  const { values, getInputProps, validate, setFieldValue, setFieldError } = useCreateTeamForm();

  const imageUrl = values.image ? URL.createObjectURL(values.image) : null;

  const handleSubmit = useCallback(async () => {
    // if (validate().hasErrors) {
    //   return;
    // }

    const data = await api.team.create({
      ...values,
    });

    if (data) {
      await router.push(`/team/${data.id}`);
    }
  }, [validate, api, router, values]);

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      padding={32}
      title={<Text>Create a Team</Text>}
    >
      <Stack align="center" spacing={32}>
        <HexagonDropzone
          label={'Upload a team logo'}
          imageUrl={imageUrl}
          setError={setFieldError}
          addImage={(image: FileWithPath) => setFieldValue('image', image)}
          removeImage={() => setFieldValue('image', null)}
        />

        <Input
          sx={{ width: '100%' }}
          placeholder="Name"
          label="Team Name"
          {...getInputProps('name')}
          required
        />

        <TextArea
          sx={{ width: '100%' }}
          placeholder="Description"
          label="Description"
          {...getInputProps('description')}
        />
      </Stack>

      <Stack align="stretch" spacing={16}>
        <Group grow mt={32}>
          <Button color="red" variant="outline" onClick={onClose}>
            {'Cancel'}
          </Button>
          <Button onClick={handleSubmit}>{'Create'}</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
