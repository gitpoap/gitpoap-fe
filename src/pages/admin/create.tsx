import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { z } from 'zod';
import type { NextPage } from 'next';
import Head from 'next/head';
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
  requestedCodes: z.number(),
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
  requestedCodes: number;
  ongoing: boolean;
  image: File | null;
};

const CreateGitPOAP: NextPage = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const { tokens } = useAuthContext();
  const theme = useMantineTheme();
  const form = useForm<FormValues>({
    schema: zodResolver(schema),
    initialValues: {
      githubRepoId: undefined,
      name: '',
      description: '',
      startDate: null,
      endDate: null,
      expiryDate: null,
      year: 2022,
      eventUrl: '',
      email: '',
      requestedCodes: 10,
      ongoing: true,
      image: null as any,
    },
  });
  const submitCreateGitPOAP = useCallback(
    async (formValues: Record<string, any>) => {
      const formData = new FormData();

      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          formData.append(key, formValues[key]);
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
        setIsSuccessful(false);
      }
    },
    [tokens?.accessToken],
  );

  return (
    <div>
      <Head>
        <title>{'Create GitPOAP | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(40) }}>
        <Grid.Col span={10}>
          <Box>
            <CreationForm onSubmit={form.onSubmit((values) => submitCreateGitPOAP(values))}>
              <Header style={{ alignSelf: 'start', marginBottom: rem(20) }}>
                {'Admin - Create new GitPOAP'}
              </Header>
              <Group direction="row" align="flex-start">
                <FormLeft>
                  <FormNumberInput
                    required
                    label={'GitHub Repo ID'}
                    name={'githubRepoId'}
                    placeholder={'123456'}
                    hideControls
                    {...form.getInputProps('githubRepoId')}
                  />

                  <FormInput
                    required
                    label={'GitPOAP Name'}
                    name={'name'}
                    placeholder={'Top 2022 GitPOAP Contributor'}
                    {...form.getInputProps('name')}
                  />

                  <FormInput
                    required
                    label={'Description'}
                    name={'description'}
                    placeholder={"Killin' it w codez"}
                    {...form.getInputProps('description')}
                  />
                  {/* -------- URLs -------- */}
                  <FormInput
                    required
                    label={'Event URL'}
                    name={'eventUrl'}
                    placeholder={'https://gitpoap.io/gp/123456'}
                    {...form.getInputProps('eventUrl')}
                  />

                  <FormInput
                    required
                    label={'Email'}
                    name={'email'}
                    placeholder={'admin@gitpoap.io'}
                    {...form.getInputProps('email')}
                  />

                  <FormNumberInput
                    required
                    label={'Requested Codes'}
                    name={'requestedCodes'}
                    placeholder={'10'}
                    hideControls
                    {...form.getInputProps('requestedCodes')}
                  />

                  <Checkbox
                    mt="md"
                    label="Ongoing Issuance?"
                    {...form.getInputProps('ongoing', { type: 'checkbox' })}
                  />
                </FormLeft>
                <FormRight>
                  {/* -------- Dates -------- */}
                  <FormDatePicker
                    required
                    label={'Start Date'}
                    name={'startDate'}
                    placeholder={'1 January 2022'}
                    {...form.getInputProps('startDate')}
                  />

                  <FormDatePicker
                    required
                    label={'End Date'}
                    name={'endDate'}
                    placeholder={'31 December 2022'}
                    {...form.getInputProps('endDate')}
                  />

                  <FormDatePicker
                    required
                    label={'Expiration Date'}
                    name={'expiryDate'}
                    placeholder={'31 December 2025'}
                    {...form.getInputProps('expiryDate')}
                  />

                  <FormNumberInput
                    required
                    label={'Year'}
                    name={'year'}
                    placeholder={'2022'}
                    hideControls
                    {...form.getInputProps('year')}
                  />
                </FormRight>
              </Group>

              <Dropzone
                onDrop={(files) => {
                  form.setFieldValue('image', files[0]);
                }}
                onReject={(files) => console.error('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                {(status) => dropzoneChildren(status, theme, form.values.image, form.errors.image)}
              </Dropzone>
            </CreationForm>
          </Box>

          <Button
            onClick={form.onSubmit((values) => submitCreateGitPOAP(values))}
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
