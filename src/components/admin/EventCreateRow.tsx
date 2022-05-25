import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Box, Group, useMantineTheme, Divider } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { DateTime } from 'luxon';
import { showNotification } from '@mantine/notifications';
import { NotificationFactory } from '../../notifications';
import { Button, Input, InputWrapper, TextArea, Text } from '../shared/elements';
import { useGetGHRepoId } from '../../hooks/useGetGHRepoId';
import { ImageDropzone, DropzoneChildrenSmall } from './ImageDropzone';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../github/AuthContext';
import { BackgroundPanel2, ExtraRed } from '../../colors';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

type Props = {
  eventName: string;
  eventStartDate: Date | null;
  eventEndDate: Date | null;
  expiry: Date | null;
  codeCount: number;
  rowNumber: number;
  hasYear: boolean;
};

const FormInput = styled(Input)`
  width: ${rem(375)};
`;

const FormTextArea = styled(TextArea)`
  width: ${rem(375)};
`;

const ErrorText = styled(Text)`
  color: ${ExtraRed};
  font-size: ${rem(11)};
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
  image: typeof window === 'undefined' ? z.any() : z.instanceof(File),
  city: z.string().optional(),
  country: z.string().optional(),
});

type FormValues = {
  githubRepoId?: number;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  expiryDate: Date | null;
  year: number | null;
  eventUrl: string;
  email: string;
  numRequestedCodes: number;
  ongoing: boolean;
  image: File | null;
  city?: string;
  country?: string;
};

enum ButtonStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

export const EventCreateRow = (props: Props) => {
  const { tokens } = useAuthContext();
  const [repoUrlSeed, setRepoUrlSeed] = useState<string>('');
  const [projectNameSeed, setProjectNameSeed] = useState<string>('');
  const [githubRepoId, eventUrl] = useGetGHRepoId(repoUrlSeed);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [isImgPopoverOpen, setIsImgPopoverOpen] = useState<boolean>(false);
  const theme = useMantineTheme();

  const { values, setFieldValue, getInputProps, onSubmit, errors, setErrors } = useForm<FormValues>(
    {
      schema: zodResolver(schema),
      initialValues: {
        githubRepoId: undefined,
        name: '',
        description: '',
        startDate: props.eventStartDate,
        endDate: props.eventEndDate,
        expiryDate: props.expiry,
        year: props.eventStartDate ? DateTime.fromJSDate(props.eventStartDate).year : null,
        eventUrl: '',
        email: 'issuer@gitpoap.io',
        numRequestedCodes: props.codeCount,
        ongoing: false,
        image: null,
        city: undefined,
        country: undefined,
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
    /* do not include setFieldValue below */
  }, []);

  const submitCreateGitPOAP = useCallback(
    async (formValues: Record<string, any>) => {
      setButtonStatus(ButtonStatus.LOADING);
      const formData = new FormData();

      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          if (formValues[key] instanceof Date) {
            const dateStr = DateTime.fromJSDate(formValues[key]).toFormat('yyyy-MM-dd');
            formData.append(key, dateStr);
          } else {
            formData.append(key, formValues[key]);
          }
        }
      }

      try {
        const res = await fetch(`${GITPOAP_API_URL}/gitpoaps`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: formData,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setButtonStatus(ButtonStatus.SUCCESS);
        showNotification(
          NotificationFactory.createSuccess(
            `Success - GitPOAP Created - ${projectNameSeed}`,
            'Thanks! 🤓',
          ),
        );
      } catch (err) {
        console.error(err);
        showNotification(
          NotificationFactory.createError(
            `Error - Request Failed for ${projectNameSeed}`,
            'Oops, something went wrong! 🤥',
          ),
        );
        setButtonStatus(ButtonStatus.ERROR);
      }
    },
    [tokens?.accessToken, projectNameSeed],
  );

  return (
    <RowContainer>
      {/* Row Number Section */}
      <Box style={{ minWidth: rem(30), marginBottom: rem(10) }}>
        <Text>{`${props.rowNumber}.`}</Text>
      </Box>

      {/* Form Inputs Section */}
      <Group direction="row" align="start" style={{}} spacing="md">
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
                isPopoverOpen={isImgPopoverOpen}
                setIsPopoverOpen={setIsImgPopoverOpen}
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
      <Group position="center" align="end" style={{ marginTop: rem(20), marginBottom: rem(20) }}>
        <Button
          onClick={clearData}
          disabled={[ButtonStatus.SUCCESS, ButtonStatus.LOADING].includes(buttonStatus)}
          variant="outline"
        >
          {'Clear'}
        </Button>
        <Button
          onClick={onSubmit((values) => submitCreateGitPOAP(values))}
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
          {'Submit'}
        </Button>
      </Group>

      {/* Errors Section */}
      {Object.keys(errors).length > 0 && (
        <Group style={{ marginBottom: rem(20) }}>
          <Box>
            {Object.keys(errors).map((errorKey, i) => {
              return <ErrorText key={i}>{`${errorKey}: ${errors[errorKey]}`}</ErrorText>;
            })}
          </Box>
        </Group>
      )}
      <Divider style={{ width: '100%', borderTopColor: BackgroundPanel2 }} />
    </RowContainer>
  );
};
