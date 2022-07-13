import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { z } from 'zod';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DateTime } from 'luxon';
import { useForm, zodResolver } from '@mantine/form';
import { Group, useMantineTheme, Grid } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Input, NumberInput, Header } from '../../../components/shared/elements';
import { TextArea, Divider, Checkbox } from '../../../components/shared/elements';
import { useAuthContext } from '../../../components/github/AuthContext';
import { NotificationFactory } from '../../../notifications';
import { ImageDropzone, dropzoneChildren } from '../../../components/admin/ImageDropzone';
import { DateInput } from '../../../components/shared/elements/DateInput';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import {
  THIS_YEAR,
  DEFAULT_START_DATE,
  DEFAULT_END_DATE,
  GITPOAP_API_URL,
  DEFAULT_EXPIRY,
} from '../../../constants';
import { useGetGHRepoId } from '../../../hooks/useGetGHRepoId';
import { SubmitButtonRow, ButtonStatus } from '../../../components/admin/SubmitButtonRow';
import { Errors } from '../../../components/admin/ErrorText';

const CreationForm = styled.form`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const FormInput = styled(Input)`
  width: ${rem(400)};
`;

const FormDatePicker = styled(DateInput)`
  align-self: flex-start;
  width: ${rem(400)};
`;

const FormNumberInput = styled(NumberInput)`
  width: ${rem(400)};
`;

const FormTextArea = styled(TextArea)`
  width: ${rem(400)};
`;

const FormLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > * {
    margin-bottom: ${rem(20)};
  }
`;

const FormRight = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: ${rem(20)};
  }
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

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
  ongoing: boolean;
  image: File | null;
};

const CreateGitPOAP: NextPage = () => {
  const { tokens, isLoggedIntoGitHub } = useAuthContext();
  const theme = useMantineTheme();
  /* Form Seed Values */
  const [repoUrlSeed, setRepoUrlSeed] = useState<string>('');
  const [projectNameSeed, setProjectNameSeed] = useState<string>('');
  const [githubRepoId, eventUrl] = useGetGHRepoId(repoUrlSeed);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const { values, setFieldValue, getInputProps, onSubmit, errors, setErrors } = useForm<FormValues>(
    {
      schema: zodResolver(schema),
      initialValues: {
        githubRepoId: undefined,
        name: '',
        description: '',
        startDate: DEFAULT_START_DATE,
        endDate: DEFAULT_END_DATE,
        expiryDate: DEFAULT_EXPIRY,
        year: THIS_YEAR,
        eventUrl: '',
        email: 'issuer@gitpoap.io',
        numRequestedCodes: 20,
        ongoing: false,
        image: null,
      },
    },
  );

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

  /* Update Ongoing boolean when end date changes */
  useEffect(() => {
    setFieldValue('ongoing', values.endDate.getTime() > Date.now());
  }, [values.endDate]);

  /* Update Name && Description */
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
    setFieldValue('githubRepoId', undefined);
    setFieldValue('name', '');
    setFieldValue('description', '');
    setFieldValue('eventUrl', '');
    setFieldValue('image', null);
    setErrors({});
    /* do not include setFieldValue or setErrors below */
  }, []);

  const submitCreateGitPOAP = useCallback(
    async (formValues: Record<string, any>) => {
      setButtonStatus(ButtonStatus.LOADING);
      const formData = new FormData();

      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          if (formValues[key] instanceof Date) {
            const dateStr = DateTime.fromJSDate(formValues[key]).toFormat('MM-DD-YYYY');
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
    <div>
      <Head>
        <title>{'Create GitPOAP | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
        <Grid.Col span={10}>
          {isLoggedIntoGitHub ? (
            <section>
              <FormContainer>
                <CreationForm onSubmit={onSubmit((values) => submitCreateGitPOAP(values))}>
                  <Header style={{ alignSelf: 'start', marginBottom: rem(20) }}>
                    {'Admin - Create new GitPOAP'}
                  </Header>
                  <Header style={{ alignSelf: 'start', fontSize: rem(24) }}>
                    {'Enter values below to automatically generate values in the form'}
                  </Header>
                  <Grid>
                    <Grid.Col span={12}>
                      <Group direction="column">
                        <FormInput
                          required
                          label={'Repo URL Seed'}
                          value={repoUrlSeed}
                          onChange={(e) => setRepoUrlSeed(e.target.value)}
                          error={getInputProps('githubRepoId').error}
                        />
                        <FormTextArea
                          required
                          label={'Project Name Seed'}
                          value={projectNameSeed}
                          onChange={(e) => setProjectNameSeed(e.target.value)}
                        />

                        <FormNumberInput
                          required
                          label={'Year'}
                          name={'year'}
                          placeholder={'2022'}
                          hideControls
                          {...getInputProps('year')}
                        />
                      </Group>
                    </Grid.Col>
                    <Divider style={{ width: '100%', marginTop: rem(20), marginBottom: rem(20) }} />

                    <Grid.Col sm={12} md={7} lg={5}>
                      <FormLeft>
                        <FormInput
                          required
                          label={'GitPOAP Name'}
                          name={'name'}
                          {...getInputProps('name')}
                        />
                        <FormTextArea
                          required
                          label={'Description'}
                          name={'description'}
                          minRows={3}
                          maxRows={5}
                          autosize
                          {...getInputProps('description')}
                        />
                        <FormNumberInput
                          required
                          label={'Requested Codes'}
                          name={'numRequestedCodes'}
                          placeholder={'10'}
                          hideControls
                          {...getInputProps('numRequestedCodes')}
                        />
                        <Checkbox
                          mt="md"
                          label="Ongoing Issuance?"
                          {...getInputProps('ongoing', { type: 'checkbox' })}
                        />
                      </FormLeft>
                    </Grid.Col>
                    <Grid.Col sm={12} md={7} lg={5}>
                      <FormRight>
                        {/* -------- Dates -------- */}
                        <FormDatePicker
                          required
                          clearable={false}
                          label={'Start Date'}
                          name={'startDate'}
                          placeholder={'1 January 2022'}
                          {...getInputProps('startDate')}
                        />

                        <FormDatePicker
                          required
                          clearable={false}
                          label={'End Date'}
                          name={'endDate'}
                          placeholder={'31 December 2022'}
                          {...getInputProps('endDate')}
                        />

                        <FormDatePicker
                          required
                          clearable={false}
                          label={'Expiration Date'}
                          name={'expiryDate'}
                          placeholder={'31 December 2025'}
                          {...getInputProps('expiryDate')}
                        />
                      </FormRight>
                    </Grid.Col>
                  </Grid>

                  <ImageDropzone
                    onDrop={(files) => {
                      setFieldValue('image', files[0]);
                    }}
                    onReject={(files) => console.error('rejected files', files)}
                    maxSize={3 * 1024 ** 2}
                  >
                    {(status) => dropzoneChildren(status, theme, values.image, errors.image)}
                  </ImageDropzone>
                </CreationForm>
              </FormContainer>

              <SubmitButtonRow
                data={values}
                clearData={clearData}
                buttonStatus={buttonStatus}
                onSubmit={onSubmit((values) => submitCreateGitPOAP(values))}
              />
              {/* Errors Section */}
              <Errors errors={errors} />
            </section>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CreateGitPOAP;
