import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Box, Group, useMantineTheme, Divider } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Input, InputWrapper, TextArea, Text, DateInput, Checkbox } from '../shared/elements';
import { NumberInput } from '../shared/elements';
import { useGetGHRepoId } from '../../hooks/useGetGHRepoId';
import { ImageDropzone, DropzoneChildrenSmall } from './ImageDropzone';
import { THIS_YEAR, DEFAULT_START_DATE, DEFAULT_END_DATE, DEFAULT_EXPIRY } from '../../constants';
import { BackgroundPanel2 } from '../../colors';
import { SubmitButtonRow, ButtonStatus } from './SubmitButtonRow';
import { Errors } from './ErrorText';
import { createGitPOAP } from '../../lib/gitpoap';

const FormInput = styled(Input)`
  width: ${rem(375)};
`;

const FormTextArea = styled(TextArea)`
  width: ${rem(375)};
`;

const FormNumberInput = styled(NumberInput)`
  width: ${rem(150)};
  margin-bottom: ${rem(20)};
`;

const FormDatePicker = styled(DateInput)`
  width: ${rem(200)};
  margin-bottom: ${rem(20)};
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
  ongoing: z.boolean(),
  image: typeof window === 'undefined' ? z.any() : z.instanceof(File),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  rowNumber: number;
  token: string;
};

export const CreateRow = (props: Props) => {
  const [repoUrlSeed, setRepoUrlSeed] = useState<string>('');
  const [projectNameSeed, setProjectNameSeed] = useState<string>('');
  const [githubRepoId, eventUrl] = useGetGHRepoId(repoUrlSeed);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const theme = useMantineTheme();

  const { values, setFieldValue, getInputProps, onSubmit, errors, setErrors } = useForm<
    z.infer<typeof schema>
  >({
    schema: zodResolver(schema),
    initialValues: {
      githubRepoId: undefined!,
      name: '',
      description: '',
      startDate: DEFAULT_START_DATE,
      endDate: DEFAULT_END_DATE,
      expiryDate: DEFAULT_EXPIRY,
      year: THIS_YEAR,
      eventUrl: '',
      email: 'issuer@gitpoap.io',
      numRequestedCodes: 20,
      ongoing: true,
      image: null,
    },
  });

  /* Update Ongoing boolean when end date changes */
  useEffect(() => {
    setFieldValue('ongoing', values.endDate.getTime() > Date.now());
  }, [values.endDate]);

  /* Update the year field based on the start date */
  useEffect(() => {
    setFieldValue('year', values.startDate.getFullYear());
  }, [values.startDate]);

  /* Set GitHubRepoID when values are returned from the hook */
  useEffect(() => {
    if (githubRepoId && githubRepoId !== values.githubRepoId) {
      setFieldValue('githubRepoId', githubRepoId);
    } else if (!githubRepoId) {
      setFieldValue('githubRepoId', undefined!);
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
    const newName = `GitPOAP: ${values.year} ${projectNameSeed} Contributor`;
    const newDescription = `You made at least one contribution to the ${projectNameSeed} project in ${values.year}. Your contributions are greatly appreciated!`;

    if (projectNameSeed) {
      setFieldValue('name', newName);
      setFieldValue('description', newDescription);
    } else {
      setFieldValue('name', '');
      setFieldValue('description', '');
    }
    /* do not include setFieldValue below */
  }, [projectNameSeed, values.year]);

  const clearData = useCallback(() => {
    setRepoUrlSeed('');
    setProjectNameSeed('');
    setButtonStatus(ButtonStatus.INITIAL);
    setFieldValue('githubRepoId', undefined!);
    setFieldValue('name', '');
    setFieldValue('description', '');
    setFieldValue('eventUrl', '');
    setFieldValue('image', null);
    setErrors({});
    /* do not include setFieldValue below */
  }, []);

  const submitCreateGitPOAP = useCallback(async (formValues: FormValues, token: string) => {
    setButtonStatus(ButtonStatus.LOADING);
    if (formValues['image'] === null || formValues.githubRepoId === undefined) {
      setButtonStatus(ButtonStatus.ERROR);
      return;
    }

    const data = await createGitPOAP(
      {
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
        ongoing: formValues.ongoing,
        image: formValues.image,
      },
      token,
    );

    if (data === null) {
      setButtonStatus(ButtonStatus.ERROR);
      return;
    }

    setButtonStatus(ButtonStatus.SUCCESS);
  }, []);

  return (
    <RowContainer>
      {/* Row Number Section */}
      <Box style={{ minWidth: rem(30), marginBottom: rem(10) }}>
        <Text>{`${props.rowNumber}.`}</Text>
      </Box>
      <Group>
        <Group>
          <FormDatePicker
            required
            clearable={false}
            label={'Event Start Date'}
            name={'startDate'}
            {...getInputProps('startDate')}
          />
          <FormDatePicker
            required
            clearable={false}
            label={'Event End Date'}
            name={'endDate'}
            {...getInputProps('endDate')}
          />
          <FormDatePicker
            required
            clearable={false}
            label={'POAP Expiration Date'}
            name={'expiryDate'}
            {...getInputProps('expiryDate')}
          />
          <FormNumberInput
            required
            label={'Year'}
            name={'year'}
            hideControls
            {...getInputProps('year')}
          />
        </Group>
        <Group>
          <FormNumberInput
            required
            label={'Requested Codes'}
            name={'numRequestedCodes'}
            hideControls
            {...getInputProps('numRequestedCodes')}
          />
          <Checkbox mt="md" label="Ongoing?" {...getInputProps('ongoing', { type: 'checkbox' })} />
        </Group>
      </Group>

      {/* Form Inputs Section */}
      <Group direction="row" align="start" spacing="md">
        {/* Project Specific Seed values */}
        <Group direction="column">
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
        </Group>
        {/* Image Upload */}
        <InputWrapper label="Image" required>
          <ImageDropzone
            onDrop={(files) => {
              setFieldValue('image', files[0]);
            }}
            onReject={(files) => console.error('rejected files', files)}
            maxSize={3 * 1024 ** 2}
          >
            {(status) => (
              <DropzoneChildrenSmall
                status={status}
                theme={theme}
                file={values.image}
                error={errors.image}
              />
            )}
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
        onSubmit={onSubmit((values) => submitCreateGitPOAP(values, props.token))}
      />
      {/* Errors Section */}
      <Errors errors={errors} />
      <Divider style={{ width: '100%', borderTopColor: BackgroundPanel2 }} />
    </RowContainer>
  );
};
