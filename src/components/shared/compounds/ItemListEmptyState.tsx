import React from 'react';
import { rem } from 'polished';
import { Stack } from '@mantine/core';

type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export const EmptyState = ({ children, icon }: Props) => {
  return (
    <Stack
      justify="center"
      align="center"
      style={{ padding: rem(60), flex: '1', gridColumnEnd: 1, gridRowEnd: 2 }}
    >
      {icon && icon}
      {children}
    </Stack>
  );
};
