import { DateTime } from 'luxon';
import { TextProps, Tooltip } from '@mantine/core';
import { Text } from './Text';

type RelativeDateProps = TextProps & {
  iosDate: string;
};

export const RelativeDate = ({ iosDate, ...props }: RelativeDateProps) => {
  return (
    <Tooltip
      label={iosDate ? DateTime.fromISO(iosDate).toFormat('dd LLL yyyy HH:mm') : '-'}
      withArrow
      transition="fade"
      position="top-start"
      sx={{ textAlign: 'center' }}
    >
      <Text {...props}>{iosDate ? DateTime.fromISO(iosDate).toRelative() : ''}</Text>
    </Tooltip>
  );
};
