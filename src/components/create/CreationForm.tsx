import {
  Container,
  Group,
  Stack,
  Input as InputUI,
  Box,
  Text,
  Button,
  List,
  Grid,
} from '@mantine/core';
import { rem } from 'polished';
import { useCallback, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import styled from 'styled-components';

import { DateInput, Header, Input, TextArea, TextInputLabelStyles } from '../shared/elements';
import { useCreationForm } from './useCreationForm';
import { Contributor, SelectContributors } from './SelectContributors';
import { useApi } from '../../hooks/useApi';
import { GitPOAPRequestCreateValues } from '../../lib/api/gitpoapRequest';
import { HexagonDropzone } from './HexagonDropzone';
import { useRouter } from 'next/router';
import { Link } from '../shared/compounds/Link';
import { ExtraRed } from '../../colors';

const Label = styled(InputUI.Label)`
  ${TextInputLabelStyles};
`;

export enum ButtonStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

const HeaderText = {
  UNSUBMITTED: 'Create GitPOAP',
  APPROVED: 'Add Contributors',
  PENDING: 'Edit GitPOAP',
  REJECTED: 'Edit GitPOAP',
};

const SubmitButtonText = {
  UNSUBMITTED: 'Create & Submit For Review',
  APPROVED: 'Save & Submit Contributors',
  PENDING: 'Save & Submit Changes',
  REJECTED: 'Save & Submit For Rereview',
};

type AdminApprovalStatus = 'UNSUBMITTED' | 'APPROVED' | 'REJECTED' | 'PENDING';

export const CreationForm = () => {
  const api = useApi();
  const { errors, values, getInputProps, setFieldError, setFieldValue, validate } =
    useCreationForm();
  const router = useRouter();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const approvalStatus: AdminApprovalStatus = 'UNSUBMITTED';

  const imageUrl = values.image ? URL.createObjectURL(values.image) : null;

  const submitCreateCustomGitPOAP = useCallback(
    async (formValues: GitPOAPRequestCreateValues) => {
      setButtonStatus(ButtonStatus.LOADING);

      if (validate().hasErrors) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      const data = await api.gitPOAPRequest.create(formValues);

      if (data === null) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      setButtonStatus(ButtonStatus.SUCCESS);
      await router.push('/me/requests');
    },
    [api.gitPOAPRequest],
  );

  return (
    <Container mt={24} mb={72} p={0} style={{ width: '90%', zIndex: 1 }}>
      <Group
        position="apart"
        style={{ left: '5%', position: 'absolute', width: '90%', zIndex: 99 }}
      >
        <Box>
          <Link href="/create/select-type">
            <Text color="grey" mb="md">
              {'< BACK TO TYPE SELECTION'}
            </Text>
          </Link>
          <Header>{HeaderText[approvalStatus]}</Header>
        </Box>
        <Header>{approvalStatus}</Header>
      </Group>
      <Stack align="center" spacing={32}>
        <HexagonDropzone
          disabled={false}
          imageUrl={imageUrl}
          setError={setFieldError}
          setValue={setFieldValue}
        />
        {Object.keys(errors).find((error) => /^image/.test(error)) && (
          <Text style={{ color: ExtraRed }} inline>
            {Object.keys(errors)
              .filter((error) => /^image/.test(error))
              .map((key) => errors[key])}
          </Text>
        )}
        <Stack spacing={32} sx={{ maxWidth: '100%' }}>
          <Box sx={{ maxWidth: '100%', width: rem(400) }}>
            <Text>{'Image Requirements:'}</Text>
            <List>
              <List.Item>
                <Group spacing={6}>
                  <Text>{'Mandatory: PNG or GIF format,'}</Text>
                  <Link href="https://www.canva.com/design/DAFQoFm0dhQ/H17FASlR17kwLk6m303hBw/view?utm_content=DAFQoFm0dhQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview">
                    <Text>{'GitPOAP Template'}</Text>
                  </Link>
                </Group>
              </List.Item>
              <List.Item>
                <Text>{'Recommended: measures 500x500px, size less than 200KB (Max. 4MB)'}</Text>
              </List.Item>
              <List.Item>
                <Link href="docs.gitpoap.io">
                  <Text>{'Design Guide'}</Text>
                </Link>
              </List.Item>
            </List>
          </Box>
          <Input
            style={{ width: '100%' }}
            label="GitPOAP Name"
            placeholder="Contributor 2022"
            {...getInputProps('name')}
          />
          <TextArea
            style={{ width: '100%' }}
            label="Description"
            placeholder="For all our valuable contributors in 2022"
            {...getInputProps('description')}
          />
          <Box>
            <Label mb={rem(11)}>{'Accomplishment Period'}</Label>
            <Grid>
              <Grid.Col xs={6} span={12}>
                <DateInput
                  placeholder="Start Date"
                  sx={{ width: '100%' }}
                  {...getInputProps('startDate')}
                />
              </Grid.Col>
              <Grid.Col xs={6} span={12}>
                <DateInput
                  placeholder="End Date"
                  sx={{ width: '100%' }}
                  {...getInputProps('endDate')}
                />
              </Grid.Col>
            </Grid>
          </Box>
          <Input
            style={{ width: '100%' }}
            label="Email"
            placeholder="Email"
            disabled={false}
            {...getInputProps('creatorEmail')}
          />
        </Stack>
        <SelectContributors
          contributors={contributors}
          errors={errors}
          setContributors={setContributors}
        />
        <Button
          onClick={async () => {
            const formattedContributors = contributors.reduce(
              (group: GitPOAPRequestCreateValues['contributors'], contributor) => {
                const { type, value }: Contributor = contributor;
                group[type] = group[type] || [];
                group[type]?.push(value);
                return group;
              },
              {},
            );
            await setFieldValue('contributors', formattedContributors);
            await submitCreateCustomGitPOAP(values);
          }}
          loading={buttonStatus === ButtonStatus.LOADING}
          disabled={buttonStatus === ButtonStatus.SUCCESS || buttonStatus === ButtonStatus.LOADING}
          leftIcon={
            buttonStatus === ButtonStatus.SUCCESS ? (
              <FaCheckCircle size={18} />
            ) : buttonStatus === ButtonStatus.ERROR ? (
              <MdError size={18} />
            ) : null
          }
        >
          {SubmitButtonText[approvalStatus]}
        </Button>
      </Stack>
    </Container>
  );
};
