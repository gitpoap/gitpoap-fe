import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { z } from 'zod';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useForm, zodResolver } from '@mantine/form';
import { Group, useMantineTheme, MantineTheme } from '@mantine/core';
import { FileText, Upload, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { Button } from '../../components/shared/elements/Button';
import { Box, Grid, NumberInput } from '@mantine/core';
import { Header } from '../../components/shared/elements/Header';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../../components/github/AuthContext';
import { Text } from '../../components/shared/elements/Text';
import { ExtraRed } from '../../colors';

const AddCodesForm = styled.form`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > * {
    margin-bottom: ${rem(25)};
  }
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
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) => {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <FileText {...props} />;
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
          {'Drag text file here or click to select file'}
        </Text>
        <Text size="sm" style={{ color: ExtraRed }} inline mt={7}>
          {'Attach a single text file, should not exceed 5mb'}
        </Text>
      </div>
    ) : (
      <div>
        <Text color="white" size="xl" inline>
          {'Drag text file here or click to select file'}
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          {'Attach a single text file, should not exceed 5mb'}
        </Text>
      </div>
    )}
  </Group>
);

const schema = z.object({
  gitPOAPId: z.number(),
  codes: typeof window === 'undefined' ? z.any() : z.instanceof(File),
});

type FormValues = {
  gitPOAPId?: number;
  codes: File | null;
};

const AddCodesPage: NextPage = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { tokens } = useAuthContext();
  const theme = useMantineTheme();
  const form = useForm<FormValues>({
    schema: zodResolver(schema),
    initialValues: {
      gitPOAPId: undefined,
      codes: null as any,
    },
  });

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
        setIsLoading(false);
        setIsSuccessful(false);
      }
    },
    [tokens?.accessToken],
  );

  return (
    <div>
      <Head>
        <title>{'Add Codes | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(40) }}>
        <Grid.Col span={10}>
          <Box>
            <AddCodesForm onSubmit={form.onSubmit((values) => submitCodes(values))}>
              <Header style={{ alignSelf: 'start' }}>{'Admin - Add Codes'}</Header>
              <FormNumberInput
                required
                label={'GitPOAP ID'}
                name={'gitPOAPId'}
                hideControls
                {...form.getInputProps('gitPOAPId')}
              />

              <Dropzone
                onDrop={(files) => {
                  form.setFieldValue('codes', files[0]);
                }}
                onReject={(files) => console.error('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={['text/*']}
              >
                {(status) => dropzoneChildren(status, theme, form.values.codes, form.errors.codes)}
              </Dropzone>
            </AddCodesForm>
          </Box>

          <Button onClick={form.onSubmit((values) => submitCodes(values))} loading={isLoading}>
            {'Submit'}
          </Button>
          {isSuccessful && <Text>{'Successful Creation'}</Text>}
          {isSuccessful === false && (
            <Text>{'Failed to add codes - did you forget to attach the text file? '}</Text>
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AddCodesPage;
