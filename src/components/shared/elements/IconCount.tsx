import { rem } from 'polished';
import { TextGray } from '../../../colors';
import { Group, Text } from '@mantine/core';

type Props = {
  icon: React.ReactNode;
  count: number;
};

export const IconCount = ({ icon, count }: Props) => {
  return (
    <Group
      align="center"
      position="center"
      spacing={0}
      sx={{
        display: 'inline-flex',
        path: {
          transition: '200ms fill ease',
          fill: TextGray,
        },
      }}
    >
      {icon}
      <Text
        size={14}
        ml={rem(6)}
        transform="uppercase"
        span
        weight="bold"
        sx={{
          cursor: 'default',
          lineHeight: rem(17),
          letterSpacing: rem(0.5),
        }}
      >
        {count}
      </Text>
    </Group>
  );
};
