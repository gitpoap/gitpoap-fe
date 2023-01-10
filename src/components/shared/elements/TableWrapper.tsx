import { ScrollArea, Stack } from '@mantine/core';
import { rem } from 'polished';
import { BackgroundPanel } from '../../../colors';

type Props = {
  children: React.ReactNode;
  border?: boolean;
  headerControls?: React.ReactNode;
};

export const TableWrapper = ({ children, border = true, headerControls }: Props) => (
  <Stack
    align="center"
    justify="flex-start"
    spacing="sm"
    py={0}
    sx={{
      border: border ? `${rem(1)} solid ${BackgroundPanel}` : 'none',
      borderRadius: `${rem(6)} ${rem(6)} 0 0`,
      width: '100%',
    }}
  >
    {headerControls}
    <ScrollArea style={{ width: '100%' }}>{children}</ScrollArea>
  </Stack>
);
