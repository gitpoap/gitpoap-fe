import { Container, Group, Stack, Input as InputUI, Box, Text, Button } from '@mantine/core';
import { rem } from 'polished';
import { useCallback, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import styled from 'styled-components';

import { DateInput, Header, Input, TextArea, TextInputLabelStyles } from '../shared/elements';
import { useCreationForm } from './useCreationForm';
import { Contributor, SelectContributors } from './SelectContributors';
import { useApi } from '../../hooks/useApi';
import { GitPOAPRequestCreateValues } from '../../lib/api/gitpoapRequest';
import { GitPoapRequestQuery } from '../../graphql/generated-gql';
import { HexagonDropzone } from './HexagonDropzone';

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

type Props = {
  gitPOAPRequest?: GitPoapRequestQuery['gitPOAPRequest'];
};

export const CreationForm = ({ gitPOAPRequest }: Props) => {
  const api = useApi();
  const { errors, values, getInputProps, setFieldError, setFieldValue, setValues, validate } =
    useCreationForm();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [adminApprovalStatus, setAdminApprovalStatus] =
    useState<AdminApprovalStatus>('UNSUBMITTED');

  const imageUrl = values.image ? URL.createObjectURL(values.image) : null;

  useEffect(() => {
    if (gitPOAPRequest) {
      const formattedResult = {
        ...gitPOAPRequest,
        image: gitPOAPRequest.imageUrl,
        projectId: gitPOAPRequest.project?.repos[0].id,
        organizationId: gitPOAPRequest.project?.repos[0]?.organization?.id,
      };
      setValues(formattedResult);
      if (formattedResult.adminApprovalStatus) {
        setAdminApprovalStatus(formattedResult.adminApprovalStatus);
      }
    }
  }, [gitPOAPRequest]);

  const submitCreateCustomGitPOAP = useCallback(
    async (formValues: GitPOAPRequestCreateValues) => {
      setButtonStatus(ButtonStatus.LOADING);

      // Reformat Contributor[] to GitPOAPRequestCreateValues['contributors']
      await setFieldValue(
        'contributors',
        contributors.reduce((group: GitPOAPRequestCreateValues['contributors'], contributor) => {
          const { type, value }: Contributor = contributor;
          group[type] = group[type] || [];
          group[type]?.push(value);
          return group;
        }, {}),
      );

      if (validate().hasErrors || formValues['image'] === null) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      const data = await api.gitPOAPRequest.create(formValues);

      if (data === null) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      setButtonStatus(ButtonStatus.SUCCESS);
    },
    [api.gitPOAPRequest],
  );

  return (
    <Container mt={24} mb={72} p={0} style={{ zIndex: 1 }}>
      <Group position="apart" style={{ left: '5%', position: 'absolute', width: '90%' }}>
        <Box>
          <Text color="grey" component="a" href="/create/select-type" mb="md">
            {'< BACK TO TYPE SELECTION'}
          </Text>
          <Header>{HeaderText[adminApprovalStatus]}</Header>
        </Box>
        <Header>{adminApprovalStatus}</Header>
      </Group>
      <Stack align="center" spacing={64}>
        <Stack spacing={32}>
          <HexagonDropzone
            imageUrl={imageUrl}
            setFieldError={setFieldError}
            setFieldValue={setFieldValue}
          />
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
            <Group grow>
              <DateInput placeholder="Start Date" {...getInputProps('startDate')} />
              <DateInput placeholder="End Date" {...getInputProps('endDate')} />
            </Group>
          </Box>
        </Stack>
        <SelectContributors
          contributors={contributors}
          errors={errors}
          setContributors={setContributors}
        />
        <Button
          onClick={() => {
            if (!validate().hasErrors) {
              submitCreateCustomGitPOAP(values);
            }
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
          {SubmitButtonText[adminApprovalStatus]}
        </Button>
      </Stack>
    </Container>
  );
};
