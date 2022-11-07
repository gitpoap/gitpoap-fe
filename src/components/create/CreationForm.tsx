import { Center, Container, Group, Stack, Input as InputUI, Box } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import Image from 'next/image';
import { rem } from 'polished';
import { useCallback, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import styled from 'styled-components';

import {
  Button,
  DateInput,
  Header,
  HexagonPath,
  HexagonStyles,
  Input,
  Text,
  TextArea,
  TextInputLabelStyles,
} from '../shared/elements';
import { useCreationForm } from './useCreationForm';
import { Contributor, SelectContributors } from './SelectContributors';
import { BackgroundPanel, BackgroundPanel2, BackgroundPanel3 } from '../../colors';
import { useApi } from '../../hooks/useApi';
import {
  ACCEPTED_IMAGE_TYPES,
  GitPOAPRequestCreateValues,
  MAX_FILE_SIZE,
} from '../../lib/api/gitpoapRequest';
import { GitPoapRequestQuery, useGitPoapRequestQuery } from '../../graphql/generated-gql';

const StyledDropzone = styled(Dropzone)`
  ${HexagonStyles}

  top: 4px;
  left: 4px;

  height: ${rem(372)};
  width: ${rem(372)};

  background: ${BackgroundPanel};
  &:hover {
    background: ${BackgroundPanel2};
  }
`;

const DropzoneBorder = styled.div`
  ${HexagonStyles}

  background-image: repeating-conic-gradient(${BackgroundPanel} 0 3deg, ${BackgroundPanel3} 3deg 6deg);

  height: ${rem(380)};
  width: ${rem(380)};
`;

const Label = styled(InputUI.Label)`
  ${TextInputLabelStyles};
  margin-bottom: ${rem(11)};
`;

export enum ButtonStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

type Props = {
  gitPOAPId?: number;
};

type AdminApprovalStatus = 'UNSUBMITTED' | 'APPROVED' | 'REJECTED' | 'PENDING';

export const CreationForm = ({ gitPOAPId }: Props) => {
  const api = useApi();
  const { errors, values, getInputProps, setFieldError, setFieldValue, setValues, validate } =
    useCreationForm();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [adminApprovalStatus, setAdminApprovalStatus] =
    useState<AdminApprovalStatus | 'UNSUBMITTED'>('UNSUBMITTED');

  const imageUrl = values.image ? URL.createObjectURL(values.image) : null;

  const [result, executeGitPoapRequestQuery] = useGitPoapRequestQuery({
    variables: {
      // @ts-ignore
      gitPOAPRequestId: gitPOAPId,
    },
    pause: true,
  });

  useEffect(() => {
    if (gitPOAPId) {
      executeGitPoapRequestQuery();
    }
  }, [gitPOAPId]);

  useEffect(() => {
    if (result.data?.gitPOAPRequest) {
      const formattedResult = {
        ...result.data.gitPOAPRequest,
        image: result.data.gitPOAPRequest.imageUrl,
        projectId: result.data.gitPOAPRequest.project?.repos[0].id,
        organizationId: result.data.gitPOAPRequest.project?.repos[0]?.organization?.id,
      };
      setValues(formattedResult);
      if (formattedResult.adminApprovalStatus) {
        setAdminApprovalStatus(formattedResult.adminApprovalStatus);
      }
    }
  });

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

      if (validate().hasErrors) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      if (formValues['image'] === null) {
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
      <Box style={{ position: 'absolute', left: rem(64) }}>
        <Text color="grey" mb="md">
          {'< BACK TO TYPE SELECTION'}
        </Text>
        <Header>
          {
            {
              UNSUBMITTED: 'Create GitPOAP',
              APPROVED: 'Add Contributors',
              PENDING: 'Edit GitPOAP',
              REJECTED: 'Edit GitPOAP',
            }[adminApprovalStatus]
          }
        </Header>
      </Box>
      <Stack align="center" spacing={64}>
        <Container>
          <Center mt={44}>
            <DropzoneBorder>
              <StyledDropzone
                accept={ACCEPTED_IMAGE_TYPES}
                maxSize={MAX_FILE_SIZE}
                onDrop={(files) => setFieldValue(`image`, files[0])}
                onReject={(fileRejects) => {
                  const { code, message } = fileRejects[0].errors[0];
                  setFieldError(
                    'image',
                    code === 'file-too-large' ? 'Max file size is 5MB.' : message,
                  );
                }}
                styles={() => ({
                  inner: {
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                  },
                })}
              >
                {imageUrl ? (
                  <Image alt={values.name} src={imageUrl} layout="fill" />
                ) : (
                  <>{'Upload Art'}</>
                )}
              </StyledDropzone>
            </DropzoneBorder>
          </Center>
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
          <Label>{'Accomplishment Period'}</Label>
          <Group grow>
            <DateInput placeholder="Start Date" {...getInputProps('startDate')} />
            <DateInput placeholder="End Date" {...getInputProps('endDate')} />
          </Group>
        </Container>
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
          {
            {
              UNSUBMITTED: 'Create & Submit For Review',
              APPROVED: 'Save & Submit Contributors',
              PENDING: 'Save & Submit Changes',
              REJECTED: 'Save & Submit For Rereview',
            }[adminApprovalStatus]
          }
        </Button>
      </Stack>
      <HexagonPath />
    </Container>
  );
};
