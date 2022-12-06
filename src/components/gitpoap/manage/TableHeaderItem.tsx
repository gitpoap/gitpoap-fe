import { Group, Text, Center, UnstyledButton } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { HiSelector } from 'react-icons/hi';

const TableHeaderStyled = styled.th``;

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
    <TableHeaderStyled>
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
    </TableHeaderStyled>
  );
};
