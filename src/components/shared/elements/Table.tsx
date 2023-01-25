import {
  Center,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { rem } from 'polished';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { HiSelector } from 'react-icons/hi';
import styled from 'styled-components';
import { BackgroundPanel } from '../../../colors';

export const TableRow = styled.tr<{ active?: boolean }>`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel} !important;
  }
  ${({ active }) => active && `background-color: ${BackgroundPanel}`}
`;

type TableWrapperProps = {
  children: React.ReactNode;
  border?: boolean;
  headerControls?: React.ReactNode;
};

export const TableWrapper = ({ children, border = false, headerControls }: TableWrapperProps) => (
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

export type HeaderItem = {
  label: string;
  key: string;
  isSortable: boolean;
};

interface TableHeaderItemProps {
  children: React.ReactNode;
  isSortable: boolean;
  isReversed: boolean;
  isSorted: boolean;
  onSort?: () => void;
}

export const TableHeaderItem = ({
  children,
  isSortable,
  isReversed,
  isSorted,
  onSort,
}: TableHeaderItemProps) => {
  const Icon =
    isSortable === false
      ? null
      : isSorted
      ? isReversed
        ? FaChevronUp
        : FaChevronDown
      : HiSelector;
  return (
    <th>
      <UnstyledButton onClick={onSort}>
        <Group position="apart" noWrap={true}>
          <Text
            weight={500}
            size="sm"
            transform="uppercase"
            sx={{ letterSpacing: rem(1), whiteSpace: 'nowrap' }}
          >
            {children}
          </Text>
          {Icon && (
            <Center>
              <Icon size={14} />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </th>
  );
};

export const TableLoader = () => (
  <Center sx={{ height: rem(320) }}>
    <Loader />
  </Center>
);

export const TableEmptyState = ({ text }: { text: string }) => (
  <Center sx={{ height: rem(320) }}>
    <Title>{text}</Title>
  </Center>
);
