import { Grid, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { MdErrorOutline, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { useUpdateTeamMutation } from '../../../graphql/generated-gql';
import { useApi } from '../../../hooks/useApi';
import { Notifications } from '../../../notifications';
import { Link } from '../../shared/compounds/Link';
import { Header, Input, Label, Loader, TextArea } from '../../shared/elements';
import { TeamDataWithColor } from '../TeamsContext';
import { TeamLogo } from './TeamLogo';

type Props = {
  teamData: TeamDataWithColor;
};

type FieldState = 'DEFAULT' | 'LOADING' | 'ERROR' | 'SUCCESS';
const FieldStateIcon = {
  DEFAULT: <></>,
  LOADING: <Loader size={20} />,
  ERROR: (
    <Tooltip label="An Error Occured">
      <ThemeIcon variant="outline" color="red" radius="xl" sx={{ border: 'none' }}>
        <MdErrorOutline size={rem(20)} />
      </ThemeIcon>
    </Tooltip>
  ),
  SUCCESS: (
    <Tooltip label="Saved">
      <ThemeIcon variant="outline" color="green" radius="xl" sx={{ border: 'none' }}>
        <MdOutlineCheckCircleOutline size={rem(20)} />
      </ThemeIcon>
    </Tooltip>
  ),
};

export const TeamSettings = ({ teamData }: Props) => {
  const api = useApi();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);

  const [nameFieldState, setNameFieldState] = useState<FieldState>('DEFAULT');
  const [descriptionFieldState, setDescriptionFieldState] = useState<FieldState>('DEFAULT');

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

  const onSaveName = async () => {
    setNameFieldState('LOADING');

    const data = await updateTeam({
      teamId,
      input: { name: { set: name } },
    });

    if (data === null) {
      setNameFieldState('ERROR');
      return;
    }

    setNameFieldState('SUCCESS');
  };

  const onSaveDescription = async () => {
    setDescriptionFieldState('LOADING');

    const data = await updateTeam({
      teamId,
      input: { description: { set: description } },
    });

    if (data === null) {
      setDescriptionFieldState('ERROR');
      return;
    }

    setDescriptionFieldState('SUCCESS');
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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
  };

  return (
    <Stack sx={{ width: '100%', maxWidth: rem(1000) }}>
      <Header>{'Settings'}</Header>
      <Grid>
        <Grid.Col span="auto">
          <Stack spacing={32} sx={{ maxWidth: rem(600), minWidth: rem(300) }}>
            <Input
              placeholder="Name"
              label={<Label>{'Name'}</Label>}
              value={name}
              onBlur={onSaveName}
              onChange={(e) => {
                setNameFieldState('DEFAULT');
                setName(e.target.value);
              }}
              onKeyDown={handleKeyPress}
              rightSection={FieldStateIcon[nameFieldState]}
            />
            <TextArea
              placeholder="Description"
              label={<Label>{'Description'}</Label>}
              value={description}
              onBlur={onSaveDescription}
              onChange={(e) => {
                setDescriptionFieldState('DEFAULT');
                setDescription(e.target.value);
              }}
              onKeyDown={handleKeyPress}
              rightSection={FieldStateIcon[descriptionFieldState]}
            />
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
