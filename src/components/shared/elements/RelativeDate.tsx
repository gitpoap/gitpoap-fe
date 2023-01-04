import { DateTime } from 'luxon';
import { TextProps } from '@mantine/core';
import { Text } from './Text';

export const RelativeDate = ({ children, ...props }: TextProps) => {
  return (
    <Text {...props}>
      {children && typeof children === 'string' ? DateTime.fromISO(children).toRelative() : ''}
    </Text>
  );
};
