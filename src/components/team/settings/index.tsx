import { Button, Grid, Stack, Text } from '@mantine/core';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { useUpdateTeamMutation } from '../../../graphql/generated-gql';
import { useApi } from '../../../hooks/useApi';
import { Notifications } from '../../../notifications';
import { Link } from '../../shared/compounds/Link';
import { Header, Input, Label, TextArea } from '../../shared/elements';
import { TeamDataWithColor } from '../TeamsContext';
import { TeamLogo } from './TeamLogo';

type Props = {
  teamData: TeamDataWithColor;
};

export const TeamSettings = ({ teamData }: Props) => {
  const api = useApi();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);

  const [updateResult, updateTeam] = useUpdateTeamMutation();
  const updateResultData = updateResult.data?.updateTeam;

  const teamId = teamData.id;

  useEffect(() => {
    setName(teamData?.name || '');
    setDescription(teamData?.description || '');
    setLogoImageUrl(teamData?.logoImageUrl || null);
  }, [teamData]);

  useEffect(() => {
    if (updateResultData) {
      setName(updateResultData?.name || '');
      setDescription(updateResultData?.description || '');
    }
  }, [updateResultData]);

  const hasChanges = name !== teamData?.name || description !== teamData?.description;
  const onSave = async () => {
    const data = await updateTeam({
      teamId,
      input: { name: { set: name }, description: { set: description } },
    });

    if (data === null) {
      Notifications.error('Oops, something went wrong!');
      return;
    }
  };

  const onLogoUpload = async (file: File) => {
    const data = await api.team.addLogo(teamId, file);

    if (data === null) {
      Notifications.error('Oops, something went wrong!');
      return;
    }

    Notifications.success('Logo uploaded successfully!');
    setLogoImageUrl(URL.createObjectURL(file));
  };

  return (
    <Stack pl={rem(32)} sx={{ width: '100%', maxWidth: rem(1000) }}>
      <Header>{'Settings'}</Header>
      <Grid>
        <Grid.Col span="auto">
          <Stack spacing={32} sx={{ maxWidth: rem(600), minWidth: rem(300) }}>
            <Input
              placeholder="Name"
              label={<Label>{'Name'}</Label>}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextArea
              placeholder="Description"
              label={<Label>{'Description'}</Label>}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button disabled={!hasChanges} onClick={onSave}>
              {'Save'}
            </Button>
          </Stack>
        </Grid.Col>
        <Grid.Col span="content">
          <Stack>
            <Label>{'Team Logo'}</Label>
            <TeamLogo
              name={name}
              size={250}
              imageUrl={logoImageUrl ?? undefined}
              onLogoUpload={onLogoUpload}
              color={teamData.color}
            />
          </Stack>
        </Grid.Col>
      </Grid>
      <Text mt={32}>
        {`Contact `}
        <Link href="mailto:support@gitpoap.io">{'support@gitpoap.io'}</Link>
        {` if you need help!`}
      </Text>
    </Stack>
  );
};
