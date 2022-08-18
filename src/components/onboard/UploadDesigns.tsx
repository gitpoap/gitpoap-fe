import { CloseButton, Image, Radio, SimpleGrid, Divider, Stack } from '@mantine/core';
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
  &.mantine-Dropzone-reject {
    background: inherit;
    border-color: ${ExtraRed};
  }
  &.mantine-Dropzone-active,
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
  setFieldError: FormReturnTypes['setFieldError'];
  setFieldValue: FormReturnTypes['setFieldValue'];
  values: FormReturnTypes['values'];
};

export const UploadDesigns = ({
  errors,
  getInputProps,
  setFieldError,
  setFieldValue,
  values,
}: Props) => (
  <Stack spacing="xl">
    <RadioGroup orientation="vertical" required {...getInputProps('isOneGitPOAPPerRepo')}>
      <Radio value="true" label={<Text>{'Separate GitPOAPS for each Repo'}</Text>} />
      <Radio value="false" label={<Text>{'One GitPOAP across all Repos'}</Text>} />
    </RadioGroup>

    <Divider size="xs" style={{ color: BackgroundPanel2 }} />

    <RadioGroup orientation="vertical" required {...getInputProps('shouldGitPOAPDesign')}>
      <Radio value="true" label={<Text>{'Have us design your GitPOAPs'}</Text>} />
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

    {values.shouldGitPOAPDesign === 'true' && (
      <>
        <StyledDropzone
          accept={ACCEPTED_IMAGE_TYPES}
          maxSize={MAX_FILE_SIZE}
          onDrop={(files) => setFieldValue(`images`, [...values.images, ...files])}
          onReject={(fileRejects) => {
            const { code, message } = fileRejects[0].errors[0];
            setFieldError('images', code === 'file-too-large' ? 'Max file size is 5MB.' : message);
          }}
        >
          {(status) => (
            <>
              <Text align="center" style={{ pointerEvents: 'none' }}>
                {'Drop your inspiration or branding here to help us get started'}
              </Text>
              {values.images.length > 0 && (
                <SimpleGrid
                  cols={4}
                  breakpoints={[
                    { maxWidth: 'sm', cols: 2 },
                    { maxWidth: 'xs', cols: 1 },
                  ]}
                  mt={16}
                >
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
          <Text style={{ color: ExtraRed, width: '100%' }} size="xl" inline>
            {Object.keys(errors)
              .filter((error) => /^images/.test(error))
              .map((key) => errors[key])}
          </Text>
        )}
      </>
    )}

    <Divider size="xs" style={{ color: BackgroundPanel2 }} />

    <Text>{"Anything else you'd like to share?"}</Text>
    <TextArea style={{ width: '100%' }} placeholder="Notes" {...getInputProps('notes')} />
  </Stack>
);
