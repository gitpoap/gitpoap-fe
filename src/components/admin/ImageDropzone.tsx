import React from 'react';
import styled from 'styled-components';
import { Group, MantineTheme } from '@mantine/core';
import { Dropzone as DropzoneUI, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { HiOutlinePhotograph, HiOutlineX, HiUpload } from 'react-icons/hi';
import { IconType } from 'react-icons';
import Image from 'next/image';
import { BackgroundPanel, BackgroundPanel2, ExtraRed } from '../../colors';
import { Text } from '../shared/elements/Text';

type Props = Omit<React.ComponentProps<typeof DropzoneUI>, 'accept'>;

export const Dropzone = styled(DropzoneUI)`
  background-color: ${BackgroundPanel};

  &:hover {
    background-color: ${BackgroundPanel2};
  }
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

const ImageUploadIcon = ({
  status,
  ...props
}: React.ComponentProps<IconType> & { status: DropzoneStatus }) => {
  if (status.accepted) {
    return <HiUpload {...props} />;
  }

  if (status.rejected) {
    return <HiOutlineX {...props} />;
  }

  return <HiOutlinePhotograph {...props} />;
};

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme,
  file?: File | null,
  error?: React.ReactNode,
) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
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

export const ImageDropzone = (props: Props) => {
  return (
    <Dropzone {...props} accept={IMAGE_MIME_TYPE}>
      {props.children}
    </Dropzone>
  );
};
