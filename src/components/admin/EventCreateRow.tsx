import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Box, Group, Divider, Stack } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { DateTime } from 'luxon';
import { Input, InputWrapper, TextArea, Text } from '../shared/elements';
import { useGetGHRepoId } from '../../hooks/useGetGHRepoId';
import { ImageDropzone, DropzoneChildrenSmall } from './ImageDropzone';
import { BackgroundPanel2 } from '../../colors';
import { SubmitButtonRow, ButtonStatus } from './SubmitButtonRow';
import { Errors } from './ErrorText';
import { useApi } from '../../hooks/useApi';

type Props = {
  rowId: string;
  onDelete: (rowId: string) => void;
  eventName: string;
  eventStartDate: Date;
  eventEndDate: Date;
  expiry: Date;
  codeCount: number;
  rowNumber: number;
  hasYear: boolean;
  city?: string;
  country?: string;
  isEnabled: boolean;
};

const FormInput = styled(Input)`
  width: ${rem(375)};
`;

const FormTextArea = styled(TextArea)`
  width: ${rem(375)};
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const RowHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  min-width: ${rem(30)};
  margin-bottom: ${rem(10)};
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;

/* Validates on Submit */
const schema = z.object({
  githubRepoId: z.number(),
  name: z.string().min(1),
  description: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  expiryDate: z.date(),
  year: z.number(),
  eventUrl: z.string().url().min(1),
  email: z.string().email({ message: 'Invalid email' }),
  numRequestedCodes: z.number(),
  isOngoing: z.boolean(),
  image: typeof window === 'undefined' ? z.any() : z.instanceof(File),
  city: z.string().optional(),
  country: z.string().optional(),
});

type FormValues = {
  githubRepoId?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  expiryDate: Date;
  year: number;
  eventUrl: string;
  email: string;
  numRequestedCodes: number;
  isOngoing: boolean;
  image: File | null;
  city?: string;
  country?: string;
  isEnabled: boolean;
};

export const EventCreateRow = (props: Props) => {
  const [repoUrlSeed, setRepoUrlSeed] = useState<string>('');
  const [projectNameSeed, setProjectNameSeed] = useState<string>('');
  const [githubRepoId, eventUrl] = useGetGHRepoId(repoUrlSeed);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const api = useApi();

  const { values, setFieldValue, getInputProps, onSubmit, errors, setErrors } = useForm<FormValues>(
    {
      validate: zodResolver(schema),
      initialValues: {
        githubRepoId: undefined,
        name: '',
        description: '',
        startDate: props.eventStartDate,
        endDate: props.eventEndDate,
        expiryDate: props.expiry,
        year: DateTime.fromJSDate(props.eventStartDate).year,
        eventUrl: '',
        email: 'issuer@gitpoap.io',
        numRequestedCodes: props.codeCount,
        isOngoing: false,
        image: null,
        city: props.city,
        country: props.country,
        isEnabled: props.isEnabled,
      },
    },
  );

  /* -- Hooks to sync form state w passed props -- */
  useEffect(() => {
    setFieldValue('expiryDate', props.expiry);
    /* do not include setFieldValue below */
  }, [props.expiry]);

  useEffect(() => {
    setFieldValue('startDate', props.eventStartDate);
    if (props.eventStartDate) {
      setFieldValue('year', DateTime.fromJSDate(props.eventStartDate).year);
    }
    /* do not include setFieldValue below */
  }, [props.eventStartDate]);

  useEffect(() => {
    setFieldValue('endDate', props.eventEndDate);
    /* do not include setFieldValue below */
  }, [props.eventEndDate]);

  useEffect(() => {
    setFieldValue('numRequestedCodes', props.codeCount);
    /* do not include setFieldValue below */
  }, [props.codeCount]);

  useEffect(() => {
    setFieldValue('city', props.city);
    /* do not include setFieldValue below */
  }, [props.city]);

  useEffect(() => {
    setFieldValue('country', props.country);
    /* do not include setFieldValue below */
  }, [props.country]);

  useEffect(() => {
    setFieldValue('isEnabled', props.isEnabled);
    /* do not include setFieldValue below */
  }, [props.isEnabled]);

  /* Set GitHubRepoID when values are returned from the hook */
  useEffect(() => {
    if (githubRepoId && githubRepoId !== values.githubRepoId) {
      setFieldValue('githubRepoId', githubRepoId);
    } else if (!githubRepoId) {
      setFieldValue('githubRepoId', undefined);
    }
    /* do not include setFieldValue below */
  }, [githubRepoId, values.githubRepoId]);

  /* Set eventUrl when values are returned from the hook */
  useEffect(() => {
    if (eventUrl && eventUrl !== values.eventUrl) {
      setFieldValue('eventUrl', eventUrl);
    } else if (!eventUrl) {
      setFieldValue('eventUrl', '');
    }
    /* do not include setFieldValue below */
  }, [eventUrl, values.eventUrl]);

  /* Hook is used to set new gitpoap name & description strings */
  useEffect(() => {
    const newName = `GitPOAP: ${
      props.hasYear ? `${values.year} ` : ''
    }${props.eventName.trim()} - ${projectNameSeed.trim()} Contributor`;
    const newDescription = `You made at least one contribution to the ${projectNameSeed.trim()} project during the ${props.eventName.trim()}${
      props.hasYear ? ` in ${values.year}` : ''
    }. Hope you had fun!`;

    if (projectNameSeed) {
      setFieldValue('name', newName);
      setFieldValue('description', newDescription);
    } else {
      setFieldValue('name', '');
      setFieldValue('description', '');
    }
    /* do not include setFieldValue below */
  }, [projectNameSeed, values.year, props.eventName, props.hasYear]);

  const clearData = useCallback(() => {
    setRepoUrlSeed('');
    setProjectNameSeed('');
    setButtonStatus(ButtonStatus.INITIAL);
    setFieldValue('githubRepoId', undefined);
    setFieldValue('name', '');
    setFieldValue('description', '');
    setFieldValue('eventUrl', '');
    setFieldValue('image', null);
    setErrors({});
    /* do not include setFieldValue or setErrors below */
  }, []);

  const submitCreateGitPOAP = useCallback(
    async (formValues: FormValues) => {
      setButtonStatus(ButtonStatus.LOADING);
      if (formValues['image'] === null || formValues.githubRepoId === undefined) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      const data = await api.gitpoap.create({
        project: { githubRepoIds: [formValues.githubRepoId] },
        name: formValues.name,
        description: formValues.description,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        expiryDate: formValues.expiryDate,
        year: formValues.year,
        eventUrl: formValues.eventUrl,
        email: formValues.email,
        numRequestedCodes: formValues.numRequestedCodes,
        isOngoing: formValues.isOngoing,
        isEnabled: formValues.isEnabled,
        isPRBased: true,
        image: formValues.image,
      });

      if (data === null) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      setButtonStatus(ButtonStatus.SUCCESS);
    },
    [api.gitpoap],
  );

  return (
    <RowContainer>
      {/* Row Number Section */}
      <RowHeader>
        <Text style={{ fontSize: rem(24), fontWeight: 'bold' }}>{`${props.rowNumber}.`}</Text>
        <Text style={{ fontSize: rem(12) }}>{`Row ID: ${props.rowId.slice(0, 8)}`}</Text>
      </RowHeader>

      {/* Form Inputs Section */}
      <Group align="start" spacing="md">
        {/* Project Specific Seed values */}
        <Stack>
          <FormInput
            required
            label={'Repo URL Seed (generates githubRepoID)'}
            value={repoUrlSeed}
            onChange={(e) => setRepoUrlSeed(e.target.value)}
            error={getInputProps('githubRepoId').error}
          />
          <FormInput
            required
            label={'Project Name Seed'}
            value={projectNameSeed}
            onChange={(e) => setProjectNameSeed(e.target.value)}
          />
        </Stack>
        {/* Image Upload */}
        <InputWrapper label="Image" required>
          <ImageDropzone
            onDrop={(files) => {
              setFieldValue('image', files[0]);
            }}
            onReject={(files) => console.error('rejected files', files)}
            maxSize={3 * 1024 ** 2}
          >
            <DropzoneChildrenSmall file={values.image} error={errors.image} />
          </ImageDropzone>
        </InputWrapper>
        {/* Derived Values */}
        <FormTextArea
          required
          label={'GitPOAP Name (generated)'}
          name={'name'}
          minRows={5}
          maxRows={5}
          placeholder={'Add project name to generate.'}
          {...getInputProps('name')}
        />
        <FormTextArea
          required
          label={'Description (generated)'}
          name={'description'}
          minRows={5}
          maxRows={5}
          placeholder={'Add project name to generate.'}
          autosize
          {...getInputProps('description')}
        />
      </Group>

      {/* Buttons Section */}
      <SubmitButtonRow
        data={values}
        clearData={clearData}
        buttonStatus={buttonStatus}
        onSubmit={onSubmit((values) => submitCreateGitPOAP(values))}
        onDelete={() => props.onDelete(props.rowId)}
      />

      {/* Errors Section */}
      <Errors errors={errors} />
      <Divider style={{ width: '100%', borderTopColor: BackgroundPanel2 }} />
    </RowContainer>
  );
};
