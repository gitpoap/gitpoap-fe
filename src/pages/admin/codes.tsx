import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { z } from 'zod';
import type { NextPage } from 'next';
import Head from 'next/head';
import { IconType } from 'react-icons';
import { HiDocumentText, HiOutlineX, HiUpload } from 'react-icons/hi';
import { useForm, zodResolver } from '@mantine/form';
import { Group, useMantineTheme, MantineTheme, Grid } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DropzoneStatus, Dropzone as DropzoneUI } from '@mantine/dropzone';
import { useGitpoapByPoapEventIdQuery } from '../../graphql/generated-gql';
import { NumberInput, Text, Header, Button } from '../../components/shared/elements';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../../components/github/AuthContext';
import { BackgroundPanel, BackgroundPanel2, ExtraRed } from '../../colors';
import { NotificationFactory } from '../../notifications';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';

export const Dropzone = styled(DropzoneUI)`
  background-color: ${BackgroundPanel};

  &:hover {
    background-color: ${BackgroundPanel2};
  }
`;

const AddCodesForm = styled.form`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > * {
    margin-bottom: ${rem(25)};
  }
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const FormNumberInput = styled(NumberInput)`
  width: ${rem(400)};
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

const TextFileUploadIcon = ({
  status,
  ...props
}: React.ComponentProps<IconType> & { status: DropzoneStatus }) => {
  if (status.accepted) {
    return <HiUpload {...props} />;
  }

  if (status.rejected) {
    return <HiOutlineX {...props} />;
  }

  return <HiDocumentText {...props} />;
};

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme,
  file?: File | null,
  error?: React.ReactNode,
) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <TextFileUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
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
          {'Drag or attach a single text file here or click to select file'}
        </Text>
        <Text size="sm" style={{ color: ExtraRed }} inline mt={7}>
          {'File name should be in the format of "#<poapEventId>_<name>.txt"'}
        </Text>
      </div>
    ) : (
      <div>
        <Text color="white" size="xl" inline>
          {'Drag or attach a single text file here or click to select file'}
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          {'File name should be in the format of "#<poapEventId>_<name>.txt"'}
        </Text>
      </div>
    )}
  </Group>
);

const schema = z.object({
  id: z.number(),
  poapEventId: z.number(),
  codes: typeof window === 'undefined' ? z.any() : z.instanceof(File),
});

type FormValues = {
  id?: number;
  poapEventId?: number;
  codes: File | null;
};

const AddCodesPage: NextPage = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const { tokens, isLoggedIntoGitHub } = useAuthContext();
  const theme = useMantineTheme();
  const { setFieldValue, values, errors, onSubmit, getInputProps } = useForm<FormValues>({
    schema: zodResolver(schema),
    initialValues: {
      id: undefined,
      poapEventId: undefined,
      codes: null as any,
    },
  });

  const [result] = useGitpoapByPoapEventIdQuery({
    variables: {
      poapEventId: values.poapEventId ?? 0,
    },
  });

  useEffect(() => {
    if (result.data?.gitPOAP) {
      if (result.data.gitPOAP.id !== values.id) {
        setFieldValue('id', result.data?.gitPOAP?.id);
      }
    }
  }, [setFieldValue, values.id, result.data]);

  useEffect(() => {
    if (result.data?.gitPOAP === null && values.id !== undefined) {
      setFieldValue('id', undefined);
    }
  }, [setFieldValue, result.data?.gitPOAP, values.id]);

  const submitCodes = useCallback(
    async (formValues: FormValues) => {
      setIsLoading(true);
      const formData = new FormData();

      let k: keyof FormValues;
      for (k in formValues) {
        if (formValues.hasOwnProperty(k)) {
          formData.append(k, formValues[k] as any);
        }
      }

      try {
        const res = await fetch(`${GITPOAP_API_URL}/gitpoaps/codes`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: formData,
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setIsLoading(false);
        setIsSuccessful(true);
      } catch (err) {
        console.error(err);
        showNotification(
          NotificationFactory.createError(
            'Error - Request Failed',
            'Oops, something went wrong! 🤥',
          ),
        );
        setIsLoading(false);
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

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [isError]);

  /* Get poapEventID from the uploaded file name */
  useEffect(() => {
    if (values.codes) {
      const codeFileNameRegex = new RegExp(/\#[0-9].*\_.*\.txt/);
      const isFileNameValid = values.codes.name.match(codeFileNameRegex) !== null;
      if (isFileNameValid) {
        const parsedEventID = parseInt(values.codes.name.split('_')[0].substring(1));
        if (values.poapEventId != parsedEventID) {
          setFieldValue('poapEventId', parsedEventID);
        }
      } else if (values.poapEventId !== undefined) {
        setFieldValue('poapEventId', undefined);
      }
    }
  }, [values.codes, setFieldValue, values.poapEventId]);

  return (
    <div>
      <Head>
        <title>{'Add Codes | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(40) }}>
        <Grid.Col span={10}>
          {isLoggedIntoGitHub ? (
            <FormContainer>
              <AddCodesForm onSubmit={onSubmit((values) => submitCodes(values))}>
                <Header style={{ alignSelf: 'start' }}>{'Admin - Add Codes'}</Header>
                <Header style={{ alignSelf: 'start', marginBottom: rem(20), fontSize: rem(24) }}>
                  {
                    'Enter a POAP EventID OR upload a claim link file to automagically fill out the form'
                  }
                </Header>
                <FormNumberInput
                  required
                  label={'POAP EVENT ID'}
                  name={'poapEventId'}
                  hideControls
                  {...getInputProps('poapEventId')}
                />

                <FormNumberInput
                  required
                  label={'GitPOAP ID'}
                  name={'id'}
                  hideControls
                  disabled
                  {...getInputProps('id')}
                />

                <Dropzone
                  onDrop={(files) => {
                    setFieldValue('codes', files[0]);
                  }}
                  onReject={(files) => console.error('rejected files', files)}
                  maxSize={3 * 1024 ** 2}
                  accept={['text/*']}
                >
                  {(status) => dropzoneChildren(status, theme, values.codes, errors.codes)}
                </Dropzone>
              </AddCodesForm>

              <Button
                onClick={onSubmit((values) => submitCodes(values))}
                loading={isLoading}
                disabled={values.id === undefined}
              >
                {'Submit'}
              </Button>
              {isSuccessful && <Text>{'Successful Creation'}</Text>}
              {isError && (
                <Text>{'Failed to add codes - did you forget to attach the text file? '}</Text>
              )}
            </FormContainer>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AddCodesPage;
