import { Group, Stack, Input as InputUI, Box, Text, List, Grid, Divider } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { rem } from 'polished';
import styled from 'styled-components';

import { BackgroundPanel, ExtraRed } from '../../colors';
import { useTeamDataQuery } from '../../graphql/generated-gql';
import { useUser } from '../../hooks/useUser';
import { CreateFormValues, EditFormValues } from '../../lib/api/gitpoapRequest';
import { Link } from '../shared/compounds/Link';
import { ButtonStatus, StatusButton } from '../shared/compounds/StatusButton';
import { DateInput, Header, Input, TextArea, TextInputLabelStyles } from '../shared/elements';
import { useTeamsContext } from '../team/TeamsContext';
import { TeamSwitcher } from '../team/TeamSwitcher';
import { HexagonDropzone } from './HexagonDropzone';
import { SelectContributors } from './SelectContributors';

const Label = styled(InputUI.Label)`
  ${TextInputLabelStyles};
`;

const SubmitButtonText = {
  UNSUBMITTED: 'Create & Submit For Review',
  APPROVED: 'Save & Submit Contributors',
  PENDING: 'Save & Submit Changes',
  REJECTED: 'Save & Submit For Rereview',
};

type StaffApprovalStatus = 'UNSUBMITTED' | 'APPROVED' | 'REJECTED' | 'PENDING';

type Props<FormValues> = {
  approvalStatus: StaffApprovalStatus;
  buttonStatus: ButtonStatus;
  imageUrl: string | null;
  isDisabled: boolean;
  form: UseFormReturnType<FormValues>;
  addImage: (image: FileWithPath) => void;
  handleSubmit: (values: FormValues) => void;
  removeImage: () => void;
  creatorEmail?: string;
  teamId?: number | null;
};

const TeamDisplay = ({ teamId }: { teamId: number }) => {
  const [results] = useTeamDataQuery({ variables: { teamId } });
  return results.data?.team ? (
    <Input disabled label="Team" style={{ width: '100%' }} value={results.data.team.name} />
  ) : (
    <></>
  );
};

export const FormFields = <FormValues extends CreateFormValues | EditFormValues>({
  approvalStatus,
  buttonStatus,
  imageUrl,
  isDisabled,
  form,
  addImage,
  handleSubmit,
  removeImage,
  creatorEmail,
  teamId,
}: Props<FormValues>) => {
  const teams = useTeamsContext();
  const user = useUser();

  return (
    <Stack align="center" spacing={32}>
      <HexagonDropzone
        imageUrl={imageUrl}
        setError={form.setFieldError}
        addImage={addImage}
        removeImage={removeImage}
      />
      {Object.keys(form.errors).find((error) => /^image/.test(error)) && (
        <Text style={{ color: ExtraRed }} inline>
          {Object.keys(form.errors)
            .filter((error) => /^image/.test(error))
            .map((key) => form.errors[key])}
        </Text>
      )}
      <Stack spacing={32} sx={{ maxWidth: '100%' }}>
        <Box sx={{ maxWidth: '100%', width: rem(400) }}>
          <Text>{'Image Requirements:'}</Text>
          <List>
            <List.Item>
              <Group spacing={6}>
                <Text>{'Mandatory: PNG or GIF format,'}</Text>
                <Link href="/links/canva-template" target="_blank" rel="noopener noreferrer">
                  <Text variant="link">{'GitPOAP Template'}</Text>
                </Link>
              </Group>
            </List.Item>
            <List.Item>
              <Text>{'Recommended: measures 500x500px, size less than 200KB (Max. 4MB)'}</Text>
            </List.Item>
            <List.Item>
              <Link href="/links/design-guide" target="_blank" rel="noopener noreferrer">
                <Text variant="link">{'Design Guide'}</Text>
              </Link>
            </List.Item>
          </List>
        </Box>
        {user?.permissions?.isStaff &&
          (teamId ? (
            <TeamDisplay teamId={teamId} />
          ) : (
            !creatorEmail &&
            teams.currTeam && (
              <Stack spacing={0}>
                <Label mb={rem(11)} required>
                  Team
                </Label>
                <TeamSwitcher
                  p={8}
                  mb={0}
                  sx={{
                    backgroundColor: BackgroundPanel,
                    borderRadius: rem(6),
                  }}
                />
              </Stack>
            )
          ))}
        <Input
          required
          style={{ width: '100%' }}
          label="GitPOAP Name"
          placeholder="Contributor 2022"
          {...form.getInputProps('name')}
        />
        <TextArea
          required
          style={{ width: '100%' }}
          label="Description"
          placeholder="For all our valuable contributors in 2022"
          {...form.getInputProps('description')}
        />
        <Box>
          <Label mb={rem(11)} required>
            {'Accomplishment Period'}
          </Label>
          <Grid>
            <Grid.Col xs={6} span={12}>
              <DateInput
                maxDate={form.values.endDate}
                placeholder="Start Date"
                weekendDays={[]}
                sx={{ width: '100%', minWidth: rem(220) }}
                {...form.getInputProps('startDate')}
              />
            </Grid.Col>
            <Grid.Col xs={6} span={12}>
              <DateInput
                minDate={form.values.startDate}
                placeholder="End Date"
                weekendDays={[]}
                sx={{ width: '100%', minWidth: rem(220) }}
                {...form.getInputProps('endDate')}
              />
            </Grid.Col>
          </Grid>
        </Box>
        {creatorEmail ? (
          <Input
            required
            style={{ width: '100%' }}
            label="Email"
            placeholder="Email"
            value={creatorEmail}
            disabled={true}
          />
        ) : (
          <Input
            required
            style={{ width: '100%' }}
            label="Email"
            placeholder="Email"
            disabled={false}
            {...form.getInputProps('creatorEmail')}
          />
        )}
      </Stack>
      <Box my={32}>
        <Divider
          mb={32}
          labelPosition="center"
          label={<Header>{'Recipients'}</Header>}
          variant="dashed"
        />
        <SelectContributors
          contributors={form.values.contributors}
          addContributor={(item) => form.insertListItem('contributors', item)}
          removeContributor={(index) => form.removeListItem('contributors', index)}
        />
      </Box>
      <StatusButton
        onClick={async () => await handleSubmit(form.values)}
        isDisabled={isDisabled}
        status={buttonStatus}
      >
        {SubmitButtonText[approvalStatus]}
      </StatusButton>
    </Stack>
  );
};
