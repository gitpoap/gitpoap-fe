import { Container, CloseButton, Image, Radio, SimpleGrid } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import styled from 'styled-components';

import { ExtraRed } from '../../colors';
import { RadioGroup, Text } from '../shared/elements';
import { ACCEPTED_IMAGE_TYPES } from './schema';
import { FormReturnTypes } from './types';

const RemoveImageButton = styled(CloseButton)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  color: ${ExtraRed};
  display: none;
  svg {
    vertical-align: middle;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  &:hover ${RemoveImageButton} {
    display: block;
  }
`;

type Props = {
  errors: FormReturnTypes['errors'];
  getInputProps: FormReturnTypes['getInputProps'];
  setFieldValue: FormReturnTypes['setFieldValue'];
  values: FormReturnTypes['values'];
};

export const UploadDesigns = ({ errors, getInputProps, setFieldValue, values }: Props) => {
  const previews = values.images.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <ImageContainer key={'image-' + index}>
        <RemoveImageButton
          iconSize={20}
          size="md"
          onClick={() =>
            setFieldValue(
              `images`,
              values.images.filter((f, i) => i !== index),
            )
          }
          variant="filled"
        />
        <Image
          alt={file.name}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      </ImageContainer>
    );
  });

  return (
    <Container mt="xl">
      <Container mt="xl" mb="xl">
        <RadioGroup orientation="vertical" required {...getInputProps('shouldGitPOAPDesign')}>
          <Radio value="true" label={<Text>{'Have our designers create your GitPOAPs'}</Text>} />
          <Radio value="false" label={<Text>{'Submit your own designs'}</Text>} />
        </RadioGroup>
      </Container>

      {values.shouldGitPOAPDesign === 'false' && (
        <>
          <Container mt="xl">
            <RadioGroup orientation="vertical" required {...getInputProps('isOneGitPOAPPerRepo')}>
              <Radio value="true" label={<Text>{'Separate GitPOAPS for each Repo'}</Text>} />
              <Radio value="false" label={<Text>{'Shared GitPOAP across Repos'}</Text>} />
            </RadioGroup>
          </Container>

          <Dropzone
            mt="xl"
            accept={ACCEPTED_IMAGE_TYPES}
            onDrop={(files) => setFieldValue(`images`, [...values.images, ...files])}
          >
            {(status) => <Text align="center">Drop images here</Text>}
          </Dropzone>

          <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
            mt={previews.length > 0 ? 'xl' : 0}
          >
            {previews}
          </SimpleGrid>

          {Object.keys(errors).find((error) => /^images/.test(error)) && (
            <Text style={{ color: ExtraRed, width: '100%' }} size="xl" mt="xl" inline>
              {Object.keys(errors)
                .filter((error) => /^images/.test(error))
                .map((key) => errors[key])}
            </Text>
          )}
        </>
      )}
    </Container>
  );
};
