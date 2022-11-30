import { Container, Group } from '@mantine/core';
import { useState } from 'react';

import { ButtonStatus } from '../shared/compounds/StatusButton';
import { Header } from '../shared/elements';
import { useApi } from '../../hooks/useApi';
import { useRouter } from 'next/router';
import { useEditForm } from './useEditForm';
import { FileWithPath } from '@mantine/dropzone';
import {
  ContributorsObject,
  EditFormValues,
  ValidatedContributor,
  ValidatedEditFormValues,
} from '../../lib/api/gitpoapRequest';
import { FormFields } from './FormFields';

const HeaderText = {
  UNSUBMITTED: 'Create GitPOAP',
  APPROVED: 'Add Contributors',
  PENDING: 'Edit GitPOAP',
  REJECTED: 'Edit GitPOAP',
};

type StaffApprovalStatus = 'UNSUBMITTED' | 'APPROVED' | 'REJECTED' | 'PENDING';

type Props = {
  staffApprovalStatus: StaffApprovalStatus;
  creatorEmail: string;
  initialValues: EditFormValues;
  gitPOAPRequestId: number;
  savedImageUrl: string;
};

export const EditForm = ({
  staffApprovalStatus,
  creatorEmail,
  initialValues,
  gitPOAPRequestId,
  savedImageUrl,
}: Props) => {
  const api = useApi();
  const [hasRemovedSavedImage, setHasRemovedSavedImage] = useState(false);
  const form = useEditForm(initialValues, hasRemovedSavedImage);
  const router = useRouter();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);

  const imageUrl = hasRemovedSavedImage
    ? form.values.image
      ? URL.createObjectURL(form.values.image)
      : null
    : savedImageUrl;

  const submitEditCustomGitPOAP = async (formValues: EditFormValues) => {
    setButtonStatus(ButtonStatus.LOADING);

    if (form.validate().hasErrors) {
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
        <Header>{HeaderText[staffApprovalStatus]}</Header>
        <Header>{staffApprovalStatus}</Header>
      </Group>
      <FormFields
        approvalStatus={staffApprovalStatus}
        buttonStatus={buttonStatus}
        creatorEmail={creatorEmail}
        imageUrl={imageUrl}
        isDisabled={
          (!form.isDirty() &&
            JSON.stringify(initialValues.contributors) ===
              JSON.stringify(form.values.contributors)) ||
          buttonStatus === ButtonStatus.SUCCESS ||
          buttonStatus === ButtonStatus.LOADING
        }
        form={form}
        addImage={(image: FileWithPath) => {
          if (!hasRemovedSavedImage) {
            setHasRemovedSavedImage(true);
          }
          form.setFieldValue('image', image);
        }}
        handleSubmit={submitEditCustomGitPOAP}
        removeImage={() => {
          if (hasRemovedSavedImage) {
            form.setFieldValue('image', null);
          } else {
            setHasRemovedSavedImage(true);
          }
        }}
      />
    </Container>
  );
};
