import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, Popover } from '@mantine/core';
import { Image, Stack } from '@mantine/core';
import { Dropzone as DropzoneUI, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { BackgroundPanel, BackgroundPanel2, ExtraRed, TextLight } from '../../colors';
import { Text } from '../shared/elements/Text';
import { LineClamp } from '../shared/compounds/GitPOAP';

type Props = Omit<React.ComponentProps<typeof DropzoneUI>, 'accept'>;

export const Dropzone = styled(DropzoneUI)`
  background-color: ${BackgroundPanel};

  &:hover {
    background-color: ${BackgroundPanel2};
  }
`;

const SmallText = styled(Text)`
  font-size: ${rem(11)};
  wordwrap: wrap;
  overflow: hidden;
  max-width: ${rem(180)};
  ${LineClamp(3)}
`;

export const DropzoneChildren = ({ file, error }: DropzoneChildrenProps) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <HiOutlinePhotograph style={{ color: !!error ? ExtraRed : TextLight }} size={80} />
    {!!file ? (
      <div>
        <Text color="white" size="xl" inline>
          {file.name}
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          {`${file.size / 1000} KB - ${file.type}`}
        </Text>
        <Image
          width={150}
          height={150}
          src={URL.createObjectURL(file)}
          alt="preview"
          style={{ maxWidth: '100%' }}
        />
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

type DropzoneChildrenProps = {
  file: File | null;
  error: React.ReactNode;
};

export const DropzoneChildrenSmall = ({ file, error }: DropzoneChildrenProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  return (
    <Group
      position="center"
      spacing="md"
      style={{ minWidth: rem(340), maxWidth: rem(400), minHeight: rem(90) }}
    >
      {!!file ? (
        <Group align="start" position="center" spacing={5}>
          <Popover
            opened={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            position="left"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            transition="pop-top-left"
            styles={{
              dropdown: {
                backgroundColor: BackgroundPanel2,
                borderColor: BackgroundPanel2,
              },
            }}
            radius="lg"
          >
            <Popover.Target>
              <Image
                style={{ pointerEvents: 'auto' }}
                width={90}
                height={90}
                src={URL.createObjectURL(file)}
                alt="preview"
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <div style={{ display: 'flex' }}>
                <Image width={470} height={470} src={URL.createObjectURL(file)} alt="preview" />
              </div>
            </Popover.Dropdown>
          </Popover>
          <Stack align="start" justify="center" spacing={5} style={{ marginLeft: rem(10) }}>
            <SmallText color="white" size="sm" inline>
              {file.name}
            </SmallText>
            <SmallText size="sm" color="dimmed" inline mt={7}>
              {`${file.size / 1000} KB - ${file.type}`}
            </SmallText>
          </Stack>
        </Group>
      ) : !!error ? (
        <>
          <HiOutlinePhotograph style={{ color: ExtraRed }} size={24} />
          <div>
            <Text style={{ color: ExtraRed }} size="md" inline>
              {'Drag image or select file'}
            </Text>
          </div>
        </>
      ) : (
        <>
          <HiOutlinePhotograph style={{ color: TextLight }} size={24} />
          <div>
            <Text color="white" size="md" inline>
              {'Drag image or select file'}
            </Text>
          </div>
        </>
      )}
    </Group>
  );
};

export const ImageDropzone = (props: Props) => {
  return (
    <Dropzone {...props} accept={IMAGE_MIME_TYPE}>
      {props.children}
    </Dropzone>
  );
};
