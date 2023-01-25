import { useState } from 'react';
import { Center, Text, FileButton, Button, Stack } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { rem } from 'polished';
import { stringToColor } from '../../../helpers';
import { ExtraRed } from '../../../colors';

type Props = {
  name: string;
  size: number;
  color?: string;
  imageUrl?: string | null;
  onLogoUpload?: (file: File) => Promise<void>;
  error?: React.ReactNode;
};

export const TeamLogo = ({ name, size, color, imageUrl, error, onLogoUpload }: Props) => {
  const { hovered, ref } = useHover();
  const [randomColor] = useState<string>(stringToColor(name, undefined, 25));

  return (
    <Stack>
      <Center
        ref={ref}
        sx={{
          width: rem(size),
          height: rem(size),
          background: imageUrl ? `url(${imageUrl})` : color ?? randomColor,
          backgroundPosition: 'center',
          borderRadius: rem(6),
          backgroundSize: 'cover',
          flex: 'none',
        }}
      >
        {!imageUrl && (
          <Text
            size={size / 2}
            sx={{ userSelect: 'none', position: 'absolute' }}
            transform="uppercase"
          >
            {name.charAt(0)}
          </Text>
        )}
        {onLogoUpload && (
          <Stack justify="flex-end" sx={{ height: '100%' }} pb={30}>
            <FileButton onChange={onLogoUpload} accept="image/png,image/jpeg">
              {(props) =>
                hovered ? <Button {...props}>{!imageUrl ? 'Upload' : 'Replace'}</Button> : null
              }
            </FileButton>
          </Stack>
        )}
      </Center>
      {error && (
        <Text color={ExtraRed} size={12}>
          {error}
        </Text>
      )}
    </Stack>
  );
};
