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
  Divider,
} from '@mantine/core';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import styled from 'styled-components';

import { DateInput, Header, Input, TextArea, TextInputLabelStyles } from '../shared/elements';
import { useCreationForm } from './useCreationForm';
import { SelectContributors } from './SelectContributors';
import { useApi } from '../../hooks/useApi';
import {
  ContributorsObjectValues,
  CreateFormValues,
  ValidatedCreateValues,
  ValidatedContributor,
} from '../../lib/api/gitpoapRequest';
import { HexagonDropzone } from './HexagonDropzone';
import { useRouter } from 'next/router';
import { Link } from '../shared/compounds/Link';
import { ExtraRed } from '../../colors';
import { FileWithPath } from '@mantine/dropzone';

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
  const {
    errors,
    values,
    getInputProps,
    insertListItem,
    isDirty,
    removeListItem,
    setFieldError,
    setFieldValue,
    setDirty,
    validate,
  } = useCreationForm();
  const router = useRouter();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const approvalStatus: AdminApprovalStatus = 'UNSUBMITTED';
  const imageUrl = values.image ? URL.createObjectURL(values.image) : null;

  useEffect(() => {
    setDirty({ contributors: values.contributors.length > 0 });
  }, [values.contributors]);

  const submitCreateCustomGitPOAP = async (formValues: CreateFormValues) => {
    setButtonStatus(ButtonStatus.LOADING);

    if (validate().hasErrors) {
      setButtonStatus(ButtonStatus.ERROR);
      return;
    }

    const validatedFormValues = formValues as ValidatedCreateValues;

    const formattedContributors = validatedFormValues.contributors.reduce(
      (group: ContributorsObjectValues, contributor) => {
        const { type, value }: ValidatedContributor = contributor;
        group[type] = group[type] || [];
        group[type]?.push(value);
        return group;
      },
      {},
    );

    const data = await api.gitPOAPRequest.create({
      ...validatedFormValues,
      contributors: formattedContributors,
    });

    if (data === null) {
      setButtonStatus(ButtonStatus.ERROR);
      return;
    }

    setButtonStatus(ButtonStatus.SUCCESS);
    await router.push('/me/gitpoaps');
  };

  return (
    <Container mt={24} mb={72} p={0} style={{ width: '90%', zIndex: 1 }}>
      <Group
        position="apart"
        style={{ left: '5%', position: 'absolute', width: '90%', zIndex: 99 }}
      >
        <Header>{HeaderText[approvalStatus]}</Header>
        <Header>{approvalStatus}</Header>
      </Group>
      <Stack align="center" spacing={32}>
        <HexagonDropzone
          imageUrl={imageUrl}
          setError={setFieldError}
          addImage={(image: FileWithPath) => setFieldValue('image', image)}
          removeImage={() => {
            setFieldValue('image', null);
          }}
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
          <Input
            required
            style={{ width: '100%' }}
            label="GitPOAP Name"
            placeholder="Contributor 2022"
            {...getInputProps('name')}
          />
          <TextArea
            required
            style={{ width: '100%' }}
            label="Description"
            placeholder="For all our valuable contributors in 2022"
            {...getInputProps('description')}
          />
          <Box>
            <Label mb={rem(11)} required>
              {'Accomplishment Period'}
            </Label>
            <Grid>
              <Grid.Col xs={6} span={12}>
                <DateInput
                  maxDate={values.endDate}
                  placeholder="Start Date"
                  weekendDays={[]}
                  sx={{ width: '100%', minWidth: rem(220) }}
                  {...getInputProps('startDate')}
                />
              </Grid.Col>
              <Grid.Col xs={6} span={12}>
                <DateInput
                  minDate={values.startDate}
                  placeholder="End Date"
                  weekendDays={[]}
                  sx={{ width: '100%', minWidth: rem(220) }}
                  {...getInputProps('endDate')}
                />
              </Grid.Col>
            </Grid>
          </Box>
          <Input
            required
            style={{ width: '100%' }}
            label="Email"
            placeholder="Email"
            disabled={false}
            {...getInputProps('creatorEmail')}
          />
        </Stack>
        <Box my={32}>
          <Divider
            mb={32}
            labelPosition="center"
            label={<Header>{'Recipients'}</Header>}
            variant="dashed"
          />
          <SelectContributors
            contributors={values.contributors}
            insertContributor={(item) => insertListItem('contributors', item)}
            removeContributor={(index) => removeListItem('contributors', index)}
          />
        </Box>
        <Button
          onClick={async () => await submitCreateCustomGitPOAP(values)}
          loading={buttonStatus === ButtonStatus.LOADING}
          disabled={
            !isDirty() ||
            buttonStatus === ButtonStatus.SUCCESS ||
            buttonStatus === ButtonStatus.LOADING
          }
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
