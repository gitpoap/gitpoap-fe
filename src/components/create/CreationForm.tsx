import { Center, Container, Group, Stack } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';

import { ExtraHover, PrimaryBlue } from '../../colors';
import { Link } from '../shared/compounds/Link';
import { Button, HexagonPath, HexagonStyles, Input, Text, TextArea } from '../shared/elements';
import { useCreationForm } from './useCreationForm';
import { ACCEPTED_IMAGE_TYPES, defaultInitialValues, MAX_FILE_SIZE } from './schema';
import { Dropzone } from '@mantine/dropzone';
import { DatePicker } from '@mantine/dates';
import { SelectContributors } from './SelectContributors';

export const StyledLink = styled(Link)`
  color: ${PrimaryBlue};
  &:hover {
    text-decoration: underline;
    &:not(:active) {
      color: ${ExtraHover};
    }
  }
`;

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

export const CreationForm = () => {
  const { errors, values, getInputProps, reset, setFieldError, setFieldValue, validate } =
    useCreationForm(defaultInitialValues);

  return (
    <Container my="xl" p={0} style={{ zIndex: 1 }}>
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
                {'Artwork Upload'}
              </StyledDropzone>
            </DropzoneBorder>
          </Center>
          <Input
            style={{ width: '100%' }}
            label="POAP Name"
            placeholder="Contributor 2022"
            {...getInputProps('name')}
          />
          <TextArea
            style={{ width: '100%' }}
            label="Description"
            placeholder="For all our valuable contributors in 2022"
            {...getInputProps('description')}
          />
          <Text>{'Accomplishment Period'}</Text>
          <Group>
            <DatePicker placeholder="Start Date" {...getInputProps('startDate')} />
            <DatePicker placeholder="End Date" {...getInputProps('endDate')} />
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
