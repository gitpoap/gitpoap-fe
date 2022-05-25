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
import { Input, Button, NumberInput, Text, Header } from '../../../components/shared/elements';
import { TextArea, Divider, Checkbox } from '../../../components/shared/elements';
import { useAuthContext } from '../../../components/github/AuthContext';
import { NotificationFactory } from '../../../notifications';
import { isValidURL } from '../../../helpers';
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
    margin-bottom: ${rem(25)};
  }
`;

const FormRight = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: ${rem(25)};
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

const CreateGitPOAP: NextPage = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const { tokens, isLoggedIntoGitHub } = useAuthContext();
  const theme = useMantineTheme();
  /* Form Seed Values */
  const [repoUrlSeed, setRepoUrlSeed] = useState<string>('');
  const [projectNameSeed, setProjectNameSeed] = useState<string>('');

  const { values, setFieldValue, getInputProps, onSubmit, errors } = useForm<FormValues>({
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
  });

  /* GitHub API Request to get repo ID */
  useEffect(() => {
    const fetchGitHubRepoId = async (orgName: string, repoName: string) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${orgName}/${repoName}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const repoData = (await res.json()) as {
          id: number;
          name: string;
          full_name: string;
          private: boolean;
        };

        if (repoData.id) {
          setFieldValue('githubRepoId', repoData.id);
          setFieldValue('eventUrl', `https://github.com/${orgName}/${repoName}`);
        }
      } catch (err) {
        console.warn(err);
        showNotification(
          NotificationFactory.createError(
            'Error - Request Failed',
            'Oops, something went wrong! 🤥',
          ),
        );
      }
    };
    if (isValidURL(repoUrlSeed) && values.eventUrl !== repoUrlSeed) {
      const url = new URL(repoUrlSeed);
      const pathStrs = url.pathname.split('/');
      if (
        pathStrs.length === 3 &&
        !!pathStrs[1] &&
        !!pathStrs[2] &&
        url.origin === 'https://github.com'
      ) {
        fetchGitHubRepoId(pathStrs[1], pathStrs[2]);
      }
    }
    /* do not include setFieldValue below */
  }, [repoUrlSeed, values.githubRepoId, values.eventUrl]);

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

  useEffect(() => {
    if (isSuccessful) {
      setTimeout(() => {
        setIsSuccessful(false);
      }, 3000);
    }
  }, [isSuccessful]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [isError]);

  return (
    <div>
      <Head>
        <title>{'Create GitPOAP | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
        <Grid.Col span={10}>
          {isLoggedIntoGitHub ? (
            <>
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
                          style={{ marginBottom: rem(20) }}
                        />
                        <FormTextArea
                          required
                          label={'Project Name Seed'}
                          value={projectNameSeed}
                          onChange={(e) => setProjectNameSeed(e.target.value)}
                          style={{ marginBottom: rem(20) }}
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
                        <FormNumberInput
                          label={'GitHub Repo ID (automatically set)'}
                          name={'githubRepoId'}
                          hideControls
                          disabled
                          {...getInputProps('githubRepoId')}
                        />

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

                        {/* -------- URLs -------- */}
                        <FormInput
                          label={'Event URL (automatically set)'}
                          name={'eventUrl'}
                          disabled
                          {...getInputProps('eventUrl')}
                        />

                        <FormInput
                          required
                          label={'Email (automatically set)'}
                          name={'email'}
                          disabled
                          placeholder={'issuer@gitpoap.io'}
                          {...getInputProps('email')}
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
                          label={'Start Date'}
                          name={'startDate'}
                          placeholder={'1 January 2022'}
                          {...getInputProps('startDate')}
                        />

                        <FormDatePicker
                          required
                          label={'End Date'}
                          name={'endDate'}
                          placeholder={'31 December 2022'}
                          {...getInputProps('endDate')}
                        />

                        <FormDatePicker
                          required
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

              {/* Prevent SSR for the button due to disabled styling issue */}
              {typeof window !== 'undefined' && (
                <Button
                  disabled={!isLoggedIntoGitHub}
                  onClick={onSubmit((values) => submitCreateGitPOAP(values))}
                  style={{ marginTop: rem(20), marginBottom: rem(20) }}
                >
                  {'Submit'}
                </Button>
              )}
              {isSuccessful && <Text>{'Successful Creation'}</Text>}
              {isError && <Text>{'Failed to create - did you forget to select an image? '}</Text>}
              {!isLoggedIntoGitHub && <Text>{'Please connect your GitHub account'}</Text>}
            </>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CreateGitPOAP;
