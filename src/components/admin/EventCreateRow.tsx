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
import { ImageDropzone, dropzoneChildrenSmall } from './ImageDropzone';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../github/AuthContext';
import { BackgroundPanel2 } from '../../colors';

type Props = {
  eventName: string;
  eventDate: Date | null;
  expiry: Date | null;
  codeCount: number;
  rowNumber: number;
  hasYear: boolean;
};

const FormInput = styled(Input)`
  width: ${rem(400)};
`;

const FormTextArea = styled(TextArea)`
  width: ${rem(400)};
`;

const schema = z.object({
  githubRepoId: z.number(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  startDate: z.date(),
  endDate: z.date(),
  expiryDate: z.date(),
  year: z.number(),
  eventUrl: z.string().url().nonempty(),
  email: z.string().email({ message: 'Invalid email' }),
  numRequestedCodes: z.number(),
  image: typeof window === 'undefined' ? z.any() : z.instanceof(File),
});

type FormValues = {
  githubRepoId?: number;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  expiryDate: Date | null;
  year: number;
  eventUrl: string;
  email: string;
  numRequestedCodes: number;
  ongoing: boolean;
  image: File | null;
};

export const EventCreateRow = (props: Props) => {
  const { tokens } = useAuthContext();
  const [repoUrlSeed, setRepoUrlSeed] = useState<string>('');
  const [projectNameSeed, setProjectNameSeed] = useState<string>('');
  const [githubRepoId, eventUrl] = useGetGHRepoId(repoUrlSeed);
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();

  const theme = useMantineTheme();

  const { values, setFieldValue, getInputProps, onSubmit, errors } = useForm<FormValues>({
    schema: zodResolver(schema),
    initialValues: {
      githubRepoId: undefined,
      name: '',
      description: '',
      startDate: props.eventDate,
      endDate: props.eventDate,
      expiryDate: props.expiry,
      year: DateTime.local().year,
      eventUrl: '',
      email: 'issuer@gitpoap.io',
      numRequestedCodes: props.codeCount,
      ongoing: false,
      image: null as any,
    },
  });

  /* Set GitHubRepoID & eventUrl when values are returned from the hook */
  useEffect(() => {
    if (githubRepoId && githubRepoId !== values.githubRepoId) {
      setFieldValue('githubRepoId', githubRepoId);
    }
    if (eventUrl && eventUrl !== values.eventUrl) {
      setFieldValue('eventUrl', eventUrl);
    }
    /* do not include setFieldValue below */
  }, [githubRepoId, eventUrl, values.githubRepoId, values.eventUrl]);

  useEffect(() => {
    const newName = `GitPOAP: ${props.eventName.trim()} - ${projectNameSeed.trim()} Contributor`;
    const newDescription = `You made at least one contribution to the ${projectNameSeed.trim()} project during the ${props.eventName.trim()}${
      props.hasYear ? ` in ${values.year}` : ''
    }. Hope you had fun!`;

    if (projectNameSeed) {
      setFieldValue('name', newName);
    }
    if (projectNameSeed) {
      setFieldValue('description', newDescription);
    }
    /* do not include setFieldValue below */
  }, [projectNameSeed, values.year, props.eventName, props.hasYear]);

  const submitCreateGitPOAP = useCallback(
    async (formValues: Record<string, any>) => {
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
        setIsSuccessful(true);
      } catch (err) {
        console.error(err);
        showNotification(
          NotificationFactory.createError(
            'Error - Request Failed',
            'Oops, something went wrong! 🤥',
          ),
        );
        setIsError(true);
      }
    },
    [tokens?.accessToken],
  );

  return (
    <>
      <Group direction="row" align="start" style={{ marginBottom: rem(20) }} spacing="md">
        <Box style={{ minWidth: rem(30) }}>
          <Text>{`${props.rowNumber}.`}</Text>
        </Box>
        {/* Project Specific Seed values */}
        <Group direction="column">
          <FormInput
            required
            label={'Repo URL Seed'}
            value={repoUrlSeed}
            onChange={(e) => setRepoUrlSeed(e.target.value)}
          />
          <FormInput
            required
            label={'Project Name Seed'}
            value={projectNameSeed}
            onChange={(e) => setProjectNameSeed(e.target.value)}
          />
        </Group>
        {/* Derived Values */}
        <FormTextArea
          required
          label={'GitPOAP Name (generated)'}
          name={'name'}
          minRows={5}
          maxRows={5}
          {...getInputProps('name')}
        />
        <FormTextArea
          required
          label={'Description (generated)'}
          name={'description'}
          minRows={5}
          maxRows={5}
          autosize
          {...getInputProps('description')}
        />
        {/* Image Upload */}
        <InputWrapper label="Image" required>
          <ImageDropzone
            onDrop={(files) => {
              setFieldValue('image', files[0]);
            }}
            onReject={(files) => console.error('rejected files', files)}
            maxSize={3 * 1024 ** 2}
          >
            {(status) => dropzoneChildrenSmall(status, theme, values.image, errors.image)}
          </ImageDropzone>
        </InputWrapper>

        <Group position="center" align="end" style={{ height: rem(180) }}>
          <Button
            onClick={onSubmit((values) => submitCreateGitPOAP(values))}
            style={{ marginTop: rem(20), marginBottom: rem(20) }}
            loading={buttonStatus === ButtonStatus.LOADING}
            disabled={
              buttonStatus === ButtonStatus.SUCCESS || buttonStatus === ButtonStatus.LOADING
            }
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
      </Group>
      <Group>
        <Errors>
          {errors &&
            Object.keys(errors).map((errorKey, i) => {
              return <ErrorText key={i}>{`${errorKey}: ${errors[errorKey]}`}</ErrorText>;
            })}
        </Errors>
      </Group>
      <Divider style={{ width: '100%', borderTopColor: BackgroundPanel2 }} />
    </>
  );
};
