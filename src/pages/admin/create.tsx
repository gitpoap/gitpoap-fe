import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { z } from 'zod';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DateTime } from 'luxon';
import { useForm, zodResolver } from '@mantine/form';
import { Group, useMantineTheme, MantineTheme, Checkbox } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { DatePicker } from '@mantine/dates';
import { Input } from '../../components/shared/elements/Input';
import { Button } from '../../components/shared/elements/Button';
import { Box, Grid, NumberInput } from '@mantine/core';
import { Header } from '../../components/shared/elements/Header';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../../components/github/AuthContext';
import { Text } from '../../components/shared/elements/Text';
import { ExtraRed } from '../../colors';
import { showNotification } from '@mantine/notifications';
import { NotificationFactory } from '../../notifications';
import { TextArea } from '../../components/shared/elements/TextArea';
import { Divider } from '../../components/shared/elements/Divider';
import { isValidURL } from '../../helpers';
import Image from 'next/image';

const CreationForm = styled.form`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const FormInput = styled(Input)`
  width: ${rem(400)};
`;

const FormDatePicker = styled(DatePicker)`
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
  margin-left: ${rem(40)};
  > * {
    margin-bottom: ${rem(25)};
  }
`;

const getIconColor = (status: DropzoneStatus, theme: MantineTheme) => {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
};

const ImageUploadIcon = ({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) => {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
};

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme,
  file?: File | null,
  error?: React.ReactNode,
) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
    {!!file ? (
      <div>
        <Text color="white" size="xl" inline>
          {file.name}
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          {`${file.size / 1000} KB - ${file.type}`}
        </Text>
        <Image
          width={150}
          height={150}
          src={URL.createObjectURL(file)}
          alt="preview"
          style={{ maxWidth: '100%' }}
        />
      </div>
    ) : !!error ? (
      <div>
        <Text style={{ color: ExtraRed }} size="xl" inline>
          {'Drag image here or click to select files'}
        </Text>
        <Text size="sm" style={{ color: ExtraRed }} inline mt={7}>
          {'Attach a single image file, should not exceed 5mb'}
        </Text>
      </div>
    ) : (
      <div>
        <Text color="white" size="xl" inline>
          {'Drag image here or click to select files'}
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          {'Attach a single image file, should not exceed 5mb'}
        </Text>
      </div>
    )}
  </Group>
);

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

const CreateGitPOAP: NextPage = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const { tokens } = useAuthContext();
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
      startDate: DateTime.local(2022, 1, 1).toJSDate(),
      endDate: DateTime.local(2022, 12, 31).toJSDate(),
      expiryDate: DateTime.local(2023, 4, 1).toJSDate(),
      year: 2022,
      eventUrl: '',
      email: 'issuer@gitpoap.io',
      numRequestedCodes: 20,
      ongoing: true,
      image: null as any,
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
  }, [repoUrlSeed, setFieldValue, values.githubRepoId, values.eventUrl]);

  /* Update Name && Description */
  useEffect(() => {
    const newName = `GitPOAP: ${values.year} ${projectNameSeed} Contributor`;
    const newDescription = `You made at least one contribution to the ${projectNameSeed} project in ${values.year}. Your contributions are greatly appreciated!`;
    if (projectNameSeed && values.name !== newName) {
      setFieldValue('name', newName);
    }
    if (projectNameSeed && values.description !== newDescription) {
      setFieldValue('description', newDescription);
    }
  }, [projectNameSeed, values.year, values.name, values.description, setFieldValue]);

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
        setIsSuccessful(false);
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

  return (
    <div>
      <Head>
        <title>{'Create GitPOAP | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(40) }}>
        <Grid.Col span={10}>
          <Box>
            <CreationForm onSubmit={onSubmit((values) => submitCreateGitPOAP(values))}>
              <Header style={{ alignSelf: 'start', marginBottom: rem(20) }}>
                {'Admin - Create new GitPOAP'}
              </Header>
              <Header style={{ alignSelf: 'start', marginBottom: rem(20), fontSize: rem(24) }}>
                {'Enter values below to automatically generate values in the form'}
              </Header>
              <>
                <FormInput
                  label={'Repo URL Seed'}
                  value={repoUrlSeed}
                  onChange={(e) => setRepoUrlSeed(e.target.value)}
                  style={{ marginBottom: rem(20) }}
                />
                <FormTextArea
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
              </>
              <Divider style={{ width: '100%', marginTop: rem(40), marginBottom: rem(40) }} />
              <Group direction="row" align="flex-start">
                <FormLeft>
                  <FormNumberInput
                    required
                    label={'GitHub Repo ID'}
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
                    required
                    label={'Event URL'}
                    name={'eventUrl'}
                    disabled
                    {...getInputProps('eventUrl')}
                  />

                  <FormInput
                    required
                    label={'Email'}
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
              </Group>

              <Dropzone
                onDrop={(files) => {
                  setFieldValue('image', files[0]);
                }}
                onReject={(files) => console.error('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                {(status) => dropzoneChildren(status, theme, values.image, errors.image)}
              </Dropzone>
            </CreationForm>
          </Box>

          <Button
            onClick={onSubmit((values) => submitCreateGitPOAP(values))}
            style={{ marginTop: rem(20), marginBottom: rem(20) }}
          >
            {'Submit'}
          </Button>
          {isSuccessful && <Text>{'Successful Creation'}</Text>}
          {isSuccessful === false && (
            <Text>{'Failed to create - did you forget to select an image? '}</Text>
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CreateGitPOAP;
