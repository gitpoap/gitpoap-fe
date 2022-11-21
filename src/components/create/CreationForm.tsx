import { Container, Group } from '@mantine/core';
import { useState } from 'react';

import { ButtonStatus } from '../shared/compounds/StatusButton';
import { Header } from '../shared/elements';
import { useCreationForm } from './useCreationForm';
import { useApi } from '../../hooks/useApi';
import {
  ContributorsObject,
  CreateFormValues,
  ValidatedCreateFormValues,
  ValidatedContributor,
} from '../../lib/api/gitpoapRequest';
import { FileWithPath } from '@mantine/dropzone';
import { FormFields } from './FormFields';
import { useRouter } from 'next/router';

const HeaderText = {
  UNSUBMITTED: 'Create GitPOAP',
  APPROVED: 'Add Contributors',
  PENDING: 'Edit GitPOAP',
  REJECTED: 'Edit GitPOAP',
};

type AdminApprovalStatus = 'UNSUBMITTED' | 'APPROVED' | 'REJECTED' | 'PENDING';

export const CreationForm = () => {
  const api = useApi();
  const form = useCreationForm();
  const router = useRouter();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const approvalStatus: AdminApprovalStatus = 'UNSUBMITTED';
  const imageUrl = form.values.image ? URL.createObjectURL(form.values.image) : null;

  const submitCreateCustomGitPOAP = async (formValues: CreateFormValues) => {
    setButtonStatus(ButtonStatus.LOADING);

    if (form.validate().hasErrors) {
      setButtonStatus(ButtonStatus.ERROR);
      return;
    }

    const validatedFormValues = formValues as ValidatedCreateFormValues;

    const formattedContributors = validatedFormValues.contributors.reduce(
      (group: ContributorsObject, contributor) => {
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
      <FormFields
        approvalStatus={'UNSUBMITTED'}
        buttonStatus={buttonStatus}
        imageUrl={imageUrl}
        isDisabled={
          !form.isDirty() ||
          buttonStatus === ButtonStatus.SUCCESS ||
          buttonStatus === ButtonStatus.LOADING
        }
        form={form}
        addImage={(image: FileWithPath) => form.setFieldValue('image', image)}
        handleSubmit={submitCreateCustomGitPOAP}
        removeImage={() => form.setFieldValue('image', null)}
      />
    </Container>
  );
};
