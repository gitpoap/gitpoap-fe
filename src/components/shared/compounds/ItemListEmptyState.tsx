import React from 'react';
import { rem } from 'polished';
import { Group } from '@mantine/core';

type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export const EmptyState = ({ children, icon }: Props) => {
  return (
    <Group
      direction="column"
      position="center"
      align="center"
      grow
      style={{ padding: rem(60), flex: '1', gridColumnEnd: 1, gridRowEnd: 2 }}
    >
      {icon && icon}
      {children}
    </Group>
  );
};
