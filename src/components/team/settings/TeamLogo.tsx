import { Center, Text } from '@mantine/core';
import { rem } from 'polished';

type Props = {
  name: string;
  size: number;
  imageUrl?: string;
};

export const TeamLogo = ({ name, size, imageUrl }: Props) => (
  <Center
    sx={{
      width: rem(size),
      height: rem(size),
      background: imageUrl
        ? `url(${imageUrl})`
        : `rgb(${Math.floor((Math.random() * 256) / 2)}, ${Math.floor(
            (Math.random() * 256) / 2,
          )}, ${Math.floor((Math.random() * 256) / 2)})`,
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
