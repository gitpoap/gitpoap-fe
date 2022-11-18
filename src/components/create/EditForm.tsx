import {
  Container,
  Group,
  Stack,
  Input as InputUI,
  Box,
  Text,
  List,
  Grid,
  Divider,
} from '@mantine/core';
import { rem } from 'polished';
import { useState } from 'react';
import styled from 'styled-components';

import { DateInput, Header, Input, TextArea, TextInputLabelStyles } from '../shared/elements';
import { SelectContributors } from './SelectContributors';
import { useApi } from '../../hooks/useApi';
import { HexagonDropzone } from './HexagonDropzone';
import { useRouter } from 'next/router';
import { Link } from '../shared/compounds/Link';
import { ExtraRed } from '../../colors';
import { useEditForm } from './useEditForm';
import { FileWithPath } from '@mantine/dropzone';
import {
  ContributorsObject,
  EditFormValues,
  ValidatedContributor,
  ValidatedEditFormValues,
} from '../../lib/api/gitpoapRequest';
import { ButtonStatus, StatusButton } from '../shared/compounds/StatusButton';

const Label = styled(InputUI.Label)`
  ${TextInputLabelStyles};
`;

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
  REJECTED: 'Save & Submit For Re-review',
};

type AdminApprovalStatus = 'UNSUBMITTED' | 'APPROVED' | 'REJECTED' | 'PENDING';

type Props = {
  adminApprovalStatus: AdminApprovalStatus;
  creatorEmail: string;
  initialValues: EditFormValues;
  gitPOAPRequestId: number;
  savedImageUrl: string;
};

export const EditForm = ({
  adminApprovalStatus,
  creatorEmail,
  initialValues,
  gitPOAPRequestId,
  savedImageUrl,
}: Props) => {
  const api = useApi();
  const [hasRemovedSavedImage, setHasRemovedSavedImage] = useState(false);
  const {
    errors,
    values,
    getInputProps,
    insertListItem,
    isDirty,
    removeListItem,
    setFieldError,
    setFieldValue,
    validate,
  } = useEditForm(initialValues, hasRemovedSavedImage);
  const router = useRouter();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);

  const imageUrl = hasRemovedSavedImage
    ? values.image
      ? URL.createObjectURL(values.image)
      : null
    : savedImageUrl;

  const submitEditCustomGitPOAP = async (formValues: EditFormValues) => {
    setButtonStatus(ButtonStatus.LOADING);

    if (validate().hasErrors) {
      setButtonStatus(ButtonStatus.ERROR);
      return;
    }

    const validatedFormValues = formValues as ValidatedEditFormValues;

    const formattedContributors = validatedFormValues.contributors.reduce(
      (group: ContributorsObject, contributor) => {
        const { type, value }: ValidatedContributor = contributor;
        group[type] = group[type] || [];
        group[type]?.push(value);
        return group;
      },
      {},
    );

    const data = await api.gitPOAPRequest.patch(gitPOAPRequestId, {
      ...formValues,
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
        <Header>{HeaderText[adminApprovalStatus]}</Header>
        <Header>{adminApprovalStatus}</Header>
      </Group>
      <Stack align="center" spacing={32}>
        <HexagonDropzone
          imageUrl={imageUrl}
          setError={setFieldError}
          addImage={(image: FileWithPath) => {
            if (!hasRemovedSavedImage) {
              setHasRemovedSavedImage(true);
            }
            setFieldValue('image', image);
          }}
          removeImage={() => {
            if (hasRemovedSavedImage) {
              setFieldValue('image', null);
            } else {
              setHasRemovedSavedImage(true);
            }
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
                  <Link
                    href="https://www.canva.com/design/DAFQoFm0dhQ/H17FASlR17kwLk6m303hBw/view?utm_content=DAFQoFm0dhQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text variant="link">{'GitPOAP Template'}</Text>
                  </Link>
                </Group>
              </List.Item>
              <List.Item>
                <Text>{'Recommended: measures 500x500px, size less than 200KB (Max. 4MB)'}</Text>
              </List.Item>
              <List.Item>
                <Link
                  href="https://gitpoap.notion.site/GitPOAP-Design-Guide-Requirements-9a843acfe1c7490bbfcdab2d1a47e8af"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            value={creatorEmail}
            disabled={true}
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
            addContributor={(item) => insertListItem('contributors', item)}
            removeContributor={(index) => removeListItem('contributors', index)}
          />
        </Box>
        <StatusButton
          onClick={async () => await submitEditCustomGitPOAP(values)}
          isDisabled={
            !isDirty() ||
            values.contributors.length !== initialValues.contributors.length ||
            buttonStatus === ButtonStatus.SUCCESS ||
            buttonStatus === ButtonStatus.LOADING
          }
          status={buttonStatus}
        >
          {SubmitButtonText[adminApprovalStatus]}
        </StatusButton>
      </Stack>
    </Container>
  );
};
