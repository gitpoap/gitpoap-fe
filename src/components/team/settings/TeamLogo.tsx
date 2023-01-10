import { Center, Text } from '@mantine/core';
import { rem } from 'polished';
import { generateRandomColorRGB } from '../../../helpers';

type Props = {
  name: string;
  size: number;
  color?: string;
  imageUrl?: string;
};

export const TeamLogo = ({ name, size, color, imageUrl }: Props) => (
  <Center
    sx={{
      width: rem(size),
      height: rem(size),
      background: imageUrl ? `url(${imageUrl})` : color ?? generateRandomColorRGB(true),
      backgroundPosition: 'center',
      borderRadius: rem(6),
      backgroundSize: 'cover',
      flex: 'none',
    }}
  >
    {!imageUrl && (
      <Text size={size / 2} sx={{ userSelect: 'none' }} transform="uppercase">
        {name.charAt(0)}
      </Text>
    )}
  </Center>
);
