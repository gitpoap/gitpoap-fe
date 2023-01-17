import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Group, Modal, Grid, Box } from '@mantine/core';
import { rem } from 'polished';
import { useApi } from '../../hooks/useApi';
import { Input, Button, Text, TextArea } from '../../components/shared/elements';
import { useCreateTeamForm } from './useCreateTeamForm';
import { TeamLogo } from '../team/settings/TeamLogo';
import { useTeamsContext } from '../team/TeamsContext';

type CreateTeamModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTeamModal = ({ isOpen, onClose }: CreateTeamModalProps) => {
  const api = useApi();
  const router = useRouter();
  const { setTeamId, refetch } = useTeamsContext();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');

  const { values, getInputProps, validate, setFieldValue, errors } = useCreateTeamForm();

  const logoImageUrl = values.image ? URL.createObjectURL(values.image) : null;

  const handleSubmit = useCallback(async () => {
    setAPIError('');

    if (validate().hasErrors) {
      return;
    }

    setIsSubmitting(true);

    const data = await api.team.create({
      ...values,
    });

    setIsSubmitting(false);

    if (data === null) {
      setAPIError('Something went wrong');
      return;
    }

    setTeamId(data.id);
    refetch();
    await router.push(`/app/team/dashboard`);
  }, [validate, api, router, values, setAPIError, setTeamId, refetch]);

  const onLogoUpload = async (file: File) => {
    setFieldValue('image', file);
  };

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      padding={32}
      title={
        <Text size={36} sx={{ fontFamily: 'VT323' }}>
          Create a Team
        </Text>
      }
      size={rem(800)}
    >
      <Stack sx={{ width: '100%', maxWidth: rem(1000) }}>
        <Grid gutter={36}>
          <Grid.Col span="content">
            <Stack sx={{ width: rem(250) }}>
              <TeamLogo
                name={values.name}
                size={250}
                imageUrl={logoImageUrl ?? undefined}
                onLogoUpload={onLogoUpload}
                error={errors.image}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span="auto">
            <Stack sx={{ maxWidth: rem(600), minWidth: rem(300) }}>
              <Input placeholder="Name" label="Team Name" {...getInputProps('name')} required />
              <TextArea
                placeholder="Description"
                label="Description"
                minRows={4}
                {...getInputProps('description')}
              />

              {apiError && <Text color="red">{apiError}</Text>}

              <Group mt={16} position="right">
                <Box>
                  <Button variant="outline" onClick={onClose}>
                    {'Cancel'}
                  </Button>
                </Box>
                <Box>
                  <Button onClick={handleSubmit} loading={isSubmitting}>
                    {'Create'}
                  </Button>
                </Box>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
};
