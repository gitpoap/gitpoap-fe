import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { OrgList as OrgListContainer } from '../shared/compounds/OrgList';
import { OrganizationHex, OrganizationHexSkeleton } from './OrgHex';
import {
  OrganizationsListQuery,
  useOrganizationsListQuery,
  useTotalOrganizationCountQuery,
} from '../../graphql/generated-gql';
import { useDebouncedValue } from '@mantine/hooks';
import { Header, Input, TextSkeleton } from '../shared/elements';

type SortOptions = 'alphabetical' | 'date';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'date', label: 'Creation Date' },
];

const StyledHeader = styled(Header)`
  display: block;
  margin-bottom: ${rem(40)};
  max-width: 100%;
`;

const HeaderSkeleton = styled(TextSkeleton)`
  display: block;
  margin-bottom: ${rem(40)};
  width: ${rem(280)};
  max-width: 100%;
`;

const Wrapper = styled.div`
  margin-top: ${rem(80)};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledItemList = styled(ItemList)`
  margin-bottom: ${rem(50)};
`;

const StyledSearch = styled(Input)`
  margin-bottom: ${rem(40)};
  width: ${rem(400)};
  max-width: 100%;
`;

export type Org = Exclude<OrganizationsListQuery['allOrganizations'], undefined | null>[number];

type QueryVars = {
  sort: SortOptions;
  search: string;
  perPage: number;
  page: number;
};

export const OrgList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);

  const [variables, setVariables] = useState<QueryVars>({
    sort: 'date',
    search: '',
    perPage: 15,
    page: 1,
  });
  const [orgListItems, setOrgListItems] = useState<Org[]>([]);
  const [result] = useOrganizationsListQuery({ variables });
  const [totalResult] = useTotalOrganizationCountQuery({
    variables: {
      search: variables.search,
    },
  });
  const allOrganizations = result.data?.allOrganizations;
  const total = totalResult.data?.aggregateOrganization._count?.id;
  const queryVariables = result.operation?.variables;
  const hasMore = !!total && variables.page * variables.perPage < total;

  /* Hook to append new data onto existing list of orgs */
  useEffect(() => {
    const newOrgListItems = allOrganizations ?? [];
    if (queryVariables?.page === 1) {
      setOrgListItems(newOrgListItems);
    } else {
      setOrgListItems((prevOrgListItems) => [...prevOrgListItems, ...newOrgListItems]);
    }
  }, [allOrganizations, queryVariables?.page]);

  useEffect(() => {
    const search = debouncedSearch.length >= 2 ? debouncedSearch : '';
    setVariables((prevVariables) => ({
      ...prevVariables,
      page: 1,
      search,
    }));
  }, [debouncedSearch]);

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      {total !== undefined ? (
        <StyledHeader>{`${total} Organizations`}</StyledHeader>
      ) : (
        <HeaderSkeleton height={rem(48)} />
      )}
      <StyledSearch
        placeholder={'SEARCH FOR AN ORGANIZATION...'}
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
      />
      <StyledItemList
        selectOptions={selectOptions}
        selectValue={variables.sort}
        onSelectChange={(sortValue) => {
          if (sortValue !== variables.sort) {
            setVariables({
              ...variables,
              sort: sortValue as SortOptions,
              page: 1,
            });
          }
        }}
        isLoading={result.fetching}
        hasShowMoreButton={hasMore}
        showMoreOnClick={() => {
          if (!result.fetching) {
            setVariables({
              ...variables,
              page: variables.page + 1,
            });
          }
        }}
      >
        <OrgListContainer>
          {result.fetching && !result.operation && (
            <>
              {[...Array(10)].map((_, i) => (
                <OrganizationHexSkeleton key={i} />
              ))}
            </>
          )}

          {orgListItems?.map((org, i) => (
            <OrganizationHex key={'organization-' + i} org={org} />
          ))}
        </OrgListContainer>
      </StyledItemList>
    </Wrapper>
  );
};
