import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Stack, Group, Modal, Grid, Box } from '@mantine/core';
import { rem } from 'polished';
import { useApi } from '../../hooks/useApi';
import { Input, Button, Text, TextArea } from '../../components/shared/elements';
import { useCreateTeamForm } from './useCreateTeamForm';
import { TeamLogo } from '../team/settings/TeamLogo';

type CreateTeamModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTeamModal = ({ isOpen, onClose }: CreateTeamModalProps) => {
  const api = useApi();
  const router = useRouter();

  const { values, getInputProps, validate, setFieldValue } = useCreateTeamForm();

  const logoImageUrl = values.image ? URL.createObjectURL(values.image) : null;

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

  const onLogoUpload = async (file: File) => {
    setFieldValue('image', file);
  };

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      padding={32}
      title={<Text sx={{ fontSize: `${rem(24)}` }}>Create a Team</Text>}
      size={rem(800)}
    >
      <Stack sx={{ width: '100%', maxWidth: rem(1000) }}>
        <Grid gutter={36}>
          <Grid.Col span="content">
            <Stack>
              <Text>{'Team Logo'}</Text>
              <TeamLogo
                size={250}
                imageUrl={logoImageUrl ?? undefined}
                onLogoUpload={onLogoUpload}
              />
              {/* <Group sx={{ width: '100%' }}>
                <FileButton onChange={onLogoUpload} accept="image/png,image/jpeg">
                  {(props) => (
                    <Button {...props} variant="outline">
                      {logoImageUrl ? 'Replace' : 'Upload'}
                    </Button>
                  )}
                </FileButton>
              </Group> */}
            </Stack>
          </Grid.Col>
          <Grid.Col span="auto">
            <Stack
              // justify="space-between"
              sx={{ maxWidth: rem(600), minWidth: rem(300) }}
            >
              <Input placeholder="Name" label="Team Name" {...getInputProps('name')} required />
              <TextArea
                placeholder="Description"
                label="Description"
                minRows={4}
                {...getInputProps('description')}
              />
              <Group mt={16} position="right">
                <Box>
                  <Button variant="outline" onClick={onClose}>
                    {'Cancel'}
                  </Button>
                </Box>
                <Box>
                  <Button onClick={handleSubmit}>{'Create'}</Button>
                </Box>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
};
