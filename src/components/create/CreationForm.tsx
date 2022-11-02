import { Center, Container, Group, Stack, Input as InputUI } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import Image from 'next/image';
import { rem } from 'polished';
import { useCallback, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import styled from 'styled-components';

import {
  Button,
  DateInput,
  HexagonPath,
  HexagonStyles,
  Input,
  TextArea,
  TextInputLabelStyles,
} from '../shared/elements';
import { useCreationForm } from './useCreationForm';
import { SelectContributors } from './SelectContributors';
import { BackgroundPanel, BackgroundPanel2, BackgroundPanel3 } from '../../colors';
import { useTokens } from '../../hooks/useTokens';
import { useApi } from '../../hooks/useApi';
import {
  ACCEPTED_IMAGE_TYPES,
  GitPOAPRequestCreateValues,
  MAX_FILE_SIZE,
} from '../../lib/api/gitpoapRequest';

const StyledDropzone = styled(Dropzone)`
  ${HexagonStyles}

  top: 4px;
  left: 4px;

  height: ${rem(372)};
  width: ${rem(372)};

  background: ${BackgroundPanel};
  &:hover {
    background: ${BackgroundPanel2};
  }
`;

const DropzoneBorder = styled.div`
  ${HexagonStyles}

  background-image: repeating-conic-gradient(${BackgroundPanel} 0 3deg, ${BackgroundPanel3} 3deg 6deg);

  height: ${rem(380)};
  width: ${rem(380)};
`;

const Label = styled(InputUI.Label)`
  ${TextInputLabelStyles};
  margin-bottom: ${rem(11)};
`;

export enum ButtonStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

type Props = {
  gitPOAPId?: string;
};

export const CreationForm = ({ gitPOAPId }: Props) => {
  const api = useApi();
  const { tokens } = useTokens();
  const { errors, values, getInputProps, setFieldError, setFieldValue, setValues, validate } =
    useCreationForm();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);

  const imageUrl = values.image ? URL.createObjectURL(values.image) : null;

  const loadInitialValues = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/gitpoaps`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.status >= 400) {
        throw new Error(JSON.stringify(data));
      }
      setValues(data);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (gitPOAPId) {
      loadInitialValues();
    }
  }, [gitPOAPId]);

  const submitCreateCustomGitPOAP = useCallback(
    async (formValues: GitPOAPRequestCreateValues) => {
      setButtonStatus(ButtonStatus.LOADING);
      if (formValues['image'] === null) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      const data = await api.gitPOAPRequest.create(formValues);

      if (data === null) {
        setButtonStatus(ButtonStatus.ERROR);
        return;
      }

      setButtonStatus(ButtonStatus.SUCCESS);
    },
    [api.gitPOAPRequest],
  );

  return (
    <Container mt={24} mb={72} p={0} style={{ zIndex: 1 }}>
      <Stack align="center" spacing={64}>
        <Container>
          <Center mt={44}>
            <DropzoneBorder>
              <StyledDropzone
                accept={ACCEPTED_IMAGE_TYPES}
                maxSize={MAX_FILE_SIZE}
                onDrop={(files) => setFieldValue(`image`, files[0])}
                onReject={(fileRejects) => {
                  const { code, message } = fileRejects[0].errors[0];
                  setFieldError(
                    'image',
                    code === 'file-too-large' ? 'Max file size is 5MB.' : message,
                  );
                }}
                styles={() => ({
                  inner: {
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                  },
                })}
              >
                {imageUrl ? (
                  <Image alt={values.name} src={imageUrl} layout="fill" />
                ) : (
                  <>{'Artwork Upload'}</>
                )}
              </StyledDropzone>
            </DropzoneBorder>
          </Center>
          <Input
            style={{ width: '100%' }}
            label="GitPOAP Name"
            placeholder="Contributor 2022"
            {...getInputProps('name')}
          />
          <TextArea
            style={{ width: '100%' }}
            label="Description"
            placeholder="For all our valuable contributors in 2022"
            {...getInputProps('description')}
          />
          <Label>{'Accomplishment Period'}</Label>
          <Group>
            <DateInput placeholder="Start Date" {...getInputProps('startDate')} />
            <DateInput placeholder="End Date" {...getInputProps('endDate')} />
          </Group>
        </Container>
        <SelectContributors
          contributors={values.contributors}
          errors={errors}
          setFieldValue={setFieldValue}
        />
        <Button
          onClick={() => {
            if (!validate().hasErrors) {
              submitCreateCustomGitPOAP(values);
            }
          }}
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
          {'Create & Submit For Review'}
        </Button>
      </Stack>
      <HexagonPath />
    </Container>
  );
};
