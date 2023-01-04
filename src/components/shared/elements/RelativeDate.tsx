import { DateTime } from 'luxon';
import { TextProps, Tooltip } from '@mantine/core';
import { Text } from './Text';

type RelativeDateProps = TextProps & {
  isoDate: string;
};

export const RelativeDate = ({ isoDate, ...props }: RelativeDateProps) => {
  return (
    <Tooltip
      label={isoDate ? DateTime.fromISO(isoDate).toFormat('dd LLL yyyy HH:mm') : '-'}
      withArrow
      transition="fade"
      position="top-start"
      sx={{ textAlign: 'center' }}
    >
      <Text {...props}>{isoDate ? DateTime.fromISO(isoDate).toRelative() : ''}</Text>
    </Tooltip>
  );
};
