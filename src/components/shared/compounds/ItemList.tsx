import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../elements/Header';
import { Button } from '../elements/Button';
import { FaPlus } from 'react-icons/fa';
import { Select } from '../elements/Select';
import { Text } from '../elements/Text';
import { TextGray } from '../../../colors';
import { Input } from '../elements/Input';

type Props = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  selectOptions: SelectOption[];
  selectValue: string;
  onSelectChange: (value: string) => void;
  isLoading: boolean;
  hasShowMoreButton: boolean;
  showMoreOnClick: () => void;
  searchInputPlaceholder?: string;
  searchInputValue?: string;
  onSearchInputChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export type SelectOption<T = string> = { value: T; label: string };

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const Heading = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(42)};
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
}: Props) => {
  return (
    <Container className={className}>
      <Heading>
        <ListTitle>{title}</ListTitle>
        <Sorting>
          {searchInputValue !== undefined && onSearchInputChange && (
            <SearchInput
              placeholder={searchInputPlaceholder}
              value={searchInputValue}
              onChange={onSearchInputChange}
            />
          )}
          <SortBy>{'Sort By: '}</SortBy>
          <Select data={selectOptions} value={selectValue} onChange={onSelectChange} />
        </Sorting>
      </Heading>
      {children}
      {hasShowMoreButton && (
        <ShowMore
          onClick={showMoreOnClick}
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
