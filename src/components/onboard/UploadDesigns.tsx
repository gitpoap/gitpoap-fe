import { Container, CloseButton, Image, Radio, SimpleGrid } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import styled from 'styled-components';

import { BackgroundPanel, BackgroundPanel2, ExtraRed, PrimaryBlue } from '../../colors';
import { RadioGroup, Text, TextArea } from '../shared/elements';
import { StyledLink } from './Completed';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './schema';
import { FormReturnTypes } from './types';

const StyledDropzone = styled(Dropzone)`
  background: inherit;
  border-color: ${BackgroundPanel2};
  &:hover {
    background: inherit;
    border-color: ${PrimaryBlue};
  }
  transition: 150ms border ease;
`;

const RemoveImageButton = styled(CloseButton)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  color: ${ExtraRed};
  display: none;
  background-color: ${BackgroundPanel};
  &:hover:not(:active) {
    background-color: ${BackgroundPanel2};
  }
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

export const UploadDesigns = ({ errors, getInputProps, setFieldValue, values }: Props) => (
  <>
    <Container mt="xl" mb="xl">
      <RadioGroup orientation="vertical" required {...getInputProps('shouldGitPOAPDesign')}>
        <Radio
          value="true"
          label={<Text>{'Have GitPOAP’s design team create POAP designs'}</Text>}
        />
        <Radio
          value="false"
          label={
            <Text>
              {'Bring your own designs ('}
              <StyledLink
                href="https://www.notion.so/gitpoap/GitPOAP-Design-Guide-Requirements-9a843acfe1c7490bbfcdab2d1a47e8af"
                target="_blank"
                rel="noopener noreferrer"
              >
                Design Guide
              </StyledLink>
              {')'}
            </Text>
          }
        />
      </RadioGroup>
    </Container>

    <Container mt="xl">
      <RadioGroup orientation="vertical" required {...getInputProps('isOneGitPOAPPerRepo')}>
        <Radio value="true" label={<Text>{'Separate GitPOAPS for each Repo'}</Text>} />
        <Radio value="false" label={<Text>{'Shared GitPOAP across Repos'}</Text>} />
      </RadioGroup>
    </Container>

    <StyledDropzone
      mt="xl"
      accept={ACCEPTED_IMAGE_TYPES}
      maxSize={MAX_FILE_SIZE}
      onDrop={(files) => setFieldValue(`images`, [...values.images, ...files])}
    >
      {(status) => (
        <>
          <Text align="center">Drop your inspiration or branding here to help us get started</Text>
          {values.images.length > 0 && (
            <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} mt={16}>
              {values.images.map((file, index) => {
                const imageUrl = URL.createObjectURL(file);
                return (
                  <ImageContainer key={'image-' + index}>
                    <RemoveImageButton
                      iconSize={20}
                      size="md"
                      onClick={(e) => {
                        setFieldValue(
                          `images`,
                          values.images.filter((f, i) => i !== index),
                        );
                        e.stopPropagation();
                      }}
                      variant="filled"
                    />
                    <Image
                      alt={file.name}
                      src={imageUrl}
                      imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                    />
                  </ImageContainer>
                );
              })}
            </SimpleGrid>
          )}
        </>
      )}
    </StyledDropzone>

    {Object.keys(errors).find((error) => /^images/.test(error)) && (
      <Text style={{ color: ExtraRed, width: '100%' }} size="xl" mt="xl" inline>
        {Object.keys(errors)
          .filter((error) => /^images/.test(error))
          .map((key) => errors[key])}
      </Text>
    )}

    <Text mt="xl">{"Anything else you'd like to share?"}</Text>
    <TextArea style={{ width: '100%' }} mt="md" placeholder="Notes" {...getInputProps('notes')} />
  </>
);
