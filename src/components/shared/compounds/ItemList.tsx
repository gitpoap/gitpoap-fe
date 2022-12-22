import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Box, BoxProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FaPlus } from 'react-icons/fa';
import { Header, Button, Select, Text, Input } from '../elements';
import { TextGray } from '../../../colors';
import { BREAKPOINTS } from '../../../constants';
import { trackItemListChangeFilter, trackItemListShowMore } from '../../../lib/tracking/events';

type Props = BoxProps & {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  selectOptions: SelectOption[];
  selectValue: string;
  onSelectChange: (value: string | null) => void;
  isLoading: boolean;
  hasShowMoreButton: boolean;
  showMoreOnClick: () => void;
  searchInputPlaceholder?: string;
  searchInputValue?: string;
  onSearchInputChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export type SelectOption<T = string> = { value: T; label: string };

const Container = styled(Box)<BoxProps>`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const Heading = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem(30)};
`;

const ListTitle = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(42)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: ${rem(26)};
    line-height: ${rem(32)};
  }
`;

const Sorting = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

const ShowMore = styled(Button)`
  align-self: center;
`;

const SortBy = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${rem(12)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(2)};
  text-transform: uppercase;
  color: ${TextGray};
  margin-right: ${rem(10)};
`;

const SearchInput = styled(Input)`
  margin-right: ${rem(50)};
`;

export const ItemList = ({
  children,
  className,
  title,
  selectOptions,
  selectValue,
  onSelectChange,
  isLoading,
  hasShowMoreButton,
  showMoreOnClick,
  searchInputPlaceholder,
  searchInputValue,
  onSearchInputChange,
  ...boxProps
}: Props) => {
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  return (
    <Container className={className} {...boxProps}>
      <Heading>
        <ListTitle>{title}</ListTitle>
        <Sorting>
          {!matchesBreakpointSmall && searchInputValue !== undefined && onSearchInputChange && (
            <SearchInput
              placeholder={searchInputPlaceholder}
              value={searchInputValue}
              onChange={onSearchInputChange}
            />
          )}
          {!matchesBreakpointSmall && <SortBy>{'Sort By: '}</SortBy>}
          <Select
            data={selectOptions}
            value={selectValue}
            onChange={(value) => {
              trackItemListChangeFilter(value);
              onSelectChange(value);
            }}
          />
        </Sorting>
      </Heading>
      {children}
      {hasShowMoreButton && (
        <ShowMore
          onClick={() => {
            trackItemListShowMore();
            showMoreOnClick();
          }}
          leftIcon={<FaPlus />}
          variant="outline"
          loading={isLoading}
        >
          {'Show more'}
        </ShowMore>
      )}
    </Container>
  );
};
