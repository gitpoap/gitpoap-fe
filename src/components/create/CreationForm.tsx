import { Center, Container, Group, Stack, Input as InputUI } from '@mantine/core';
import { rem } from 'polished';
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
import { ACCEPTED_IMAGE_TYPES, defaultInitialValues, MAX_FILE_SIZE } from './schema';
import { Dropzone } from '@mantine/dropzone';
import { SelectContributors } from './SelectContributors';
import Image from 'next/image';

const StyledDropzone = styled(Dropzone)`
  ${HexagonStyles}

  top: 4px;
  left: 4px;

  height: ${rem(372)};
  width: ${rem(372)};
`;

const DropzoneBorder = styled.div`
  ${HexagonStyles}

  background-image: repeating-conic-gradient(#373A40 0 3deg, #25262b 3deg 6deg);

  height: ${rem(380)};
  width: ${rem(380)};
`;

const Label = styled(InputUI.Label)`
  ${TextInputLabelStyles};
  margin-bottom: ${rem(11)};
`;

export const CreationForm = () => {
  const { errors, values, getInputProps, reset, setFieldError, setFieldValue, validate } =
    useCreationForm(defaultInitialValues);

  const imageUrl = values.image ? URL.createObjectURL(values.image) : null;

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
        <Button>{'Create & Submit For Review'}</Button>
      </Stack>
      <HexagonPath />
    </Container>
  );
};
