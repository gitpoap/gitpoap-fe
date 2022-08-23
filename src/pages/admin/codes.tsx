import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { z } from 'zod';
import type { NextPage } from 'next';
import Head from 'next/head';
import { HiDocumentText } from 'react-icons/hi';
import { useForm, zodResolver } from '@mantine/form';
import { Group, Grid } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Dropzone as DropzoneUI } from '@mantine/dropzone';
import { useGitpoapByPoapEventIdQuery } from '../../graphql/generated-gql';
import { NumberInput, Text, Header } from '../../components/shared/elements';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../../components/github/AuthContext';
import { BackgroundPanel, BackgroundPanel2, ExtraRed, TextLight } from '../../colors';
import { NotificationFactory } from '../../notifications';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';
import { ButtonStatus, SubmitButtonRow } from '../../components/admin/SubmitButtonRow';
import { Errors } from '../../components/admin/ErrorText';

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

type DropzoneChildrenProps = {
  file: File | null;
  error: React.ReactNode;
};

export const DropzoneChildren = ({ file, error }: DropzoneChildrenProps) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <HiDocumentText style={{ color: !!error ? ExtraRed : TextLight }} size={80} />
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

type FormValues = z.infer<typeof schema>;

const AddCodesPage: NextPage = () => {
  const { tokens, canSeeAdmin } = useAuthContext();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const { setFieldValue, values, errors, onSubmit, getInputProps, setErrors, setValues } =
    useForm<FormValues>({
      validate: zodResolver(schema),
      initialValues: {
        id: undefined!,
        poapEventId: undefined!,
        codes: null,
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
      setFieldValue('id', undefined!);
    }
  }, [setFieldValue, result.data?.gitPOAP, values.id]);

  const clearData = useCallback(() => {
    setValues({
      id: undefined!,
      poapEventId: undefined!,
      codes: null,
    });
    setButtonStatus(ButtonStatus.INITIAL);
    setErrors({});
    /* do not include setValues or setErrors below */
  }, []);

  const submitCodes = useCallback(
    async (formValues: FormValues) => {
      setButtonStatus(ButtonStatus.LOADING);
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
        setButtonStatus(ButtonStatus.SUCCESS);
        showNotification(NotificationFactory.createSuccess('✨ Success - Codes Added '));
        clearData();
      } catch (err) {
        console.error(err);
        showNotification(NotificationFactory.createError('🚫 Error - Request Failed'));
        setButtonStatus(ButtonStatus.ERROR);
      }
    },
    [tokens?.accessToken, clearData],
  );

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
        setFieldValue('poapEventId', undefined!);
      }
    }
  }, [values.codes, values.poapEventId]);

  return (
    <div>
      <Head>
        <title>{'Add Codes | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(40) }}>
        <Grid.Col span={10}>
          {canSeeAdmin ? (
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
                  <DropzoneChildren file={values.codes} error={errors.codes} />
                </Dropzone>
              </AddCodesForm>

              {/* Buttons Section */}
              <SubmitButtonRow<FormValues>
                data={values}
                clearData={clearData}
                buttonStatus={buttonStatus}
                onSubmit={onSubmit((values) => submitCodes(values))}
              />
              {/* Errors Section */}
              <Errors errors={errors} />
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
