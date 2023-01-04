import { DateTime } from 'luxon';
import { TextProps, Tooltip } from '@mantine/core';
import { Text } from './Text';

type RelativeDateProps = TextProps & {
  date: DateTime;
};

export const RelativeDate = ({ date, ...props }: RelativeDateProps) => {
  return (
    <Tooltip
      label={date.toFormat('dd LLL yyyy HH:mm')}
      withArrow
      transition="fade"
      position="top-start"
      sx={{ textAlign: 'center' }}
    >
      <Text {...props}>{date.toRelative()}</Text>
    </Tooltip>
  );
};
