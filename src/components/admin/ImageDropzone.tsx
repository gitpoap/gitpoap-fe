import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, MantineTheme, Popover } from '@mantine/core';
import { Image } from '@mantine/core';
import { Dropzone as DropzoneUI, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { HiOutlinePhotograph, HiOutlineX, HiUpload } from 'react-icons/hi';
import { IconType } from 'react-icons';
import { BackgroundPanel, BackgroundPanel2, ExtraRed } from '../../colors';
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

type DropzoneChildrenSmallProps = {
  status: DropzoneStatus;
  theme: MantineTheme;
  file: File | null;
  error: React.ReactNode;
};

export const DropzoneChildrenSmall = ({
  status,
  theme,
  file,
  error,
}: DropzoneChildrenSmallProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  return (
    <Group
      position="center"
      spacing="md"
      style={{ minWidth: rem(340), maxWidth: rem(400), minHeight: rem(90) }}
    >
      {!!file ? (
        <Group align="start" position="center" direction="row" spacing={5}>
          <Popover
            opened={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            position="left"
            placement="center"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            transition="pop-top-left"
            styles={{
              body: {
                pointerEvents: 'none',
                backgroundColor: BackgroundPanel2,
                borderColor: BackgroundPanel2,
              },
            }}
            radius="lg"
            target={
              <Image
                width={90}
                height={90}
                src={URL.createObjectURL(file)}
                alt="preview"
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
              />
            }
          >
            <div style={{ display: 'flex' }}>
              <Image width={470} height={470} src={URL.createObjectURL(file)} alt="preview" />
            </div>
          </Popover>
          <Group
            direction="column"
            align="start"
            position="center"
            spacing={5}
            style={{ marginLeft: rem(10) }}
          >
            <SmallText color="white" size="sm" inline>
              {file.name}
            </SmallText>
            <SmallText size="sm" color="dimmed" inline mt={7}>
              {`${file.size / 1000} KB - ${file.type}`}
            </SmallText>
          </Group>
        </Group>
      ) : !!error ? (
        <>
          <ImageUploadIcon
            status={status}
            style={{ color: getIconColor(status, theme) }}
            size={24}
          />
          <div>
            <Text style={{ color: ExtraRed }} size="md" inline>
              {'Drag image or select file'}
            </Text>
          </div>
        </>
      ) : (
        <>
          <ImageUploadIcon
            status={status}
            style={{ color: getIconColor(status, theme) }}
            size={24}
          />
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
