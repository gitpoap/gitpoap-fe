import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { OrgList as OrgListContainer } from '../shared/compounds/OrgList';
import { OrganizationHex, OrganizationHexSkeleton } from './OrgHex';
import {
  OrganizationsListQuery,
  OrganizationsListQueryVariables,
  useOrganizationsListQuery,
  useTotalOrganizationCountQuery,
} from '../../graphql/generated-gql';
import { useListState } from '@mantine/hooks';
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
};

export const OrgList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 15;
  const [variables, setVariables] = useState<QueryVars>({
    sort: 'date',
  });
  const [orgListItems, handlers] = useListState<Org>([]);
  const [result] = useOrganizationsListQuery({ variables });
  const allOrganizations = result.data?.allOrganizations;
  const [totalResult] = useTotalOrganizationCountQuery({});
  const total = totalResult.data?.aggregateOrganization._count?.id;

  // Assert type until following issue is resolved:
  // https://github.com/dotansimha/graphql-code-generator/issues/7976
  const queryVariables = result.operation?.variables as OrganizationsListQueryVariables | undefined;

  /* Hook to append new data onto existing list of orgs */
  useEffect(() => {
    if (allOrganizations) {
      const newOrgListItems = allOrganizations;
      handlers.setState(newOrgListItems);
    }
    /* Do not include handlers below */
  }, [allOrganizations, queryVariables?.sort]);

  if (result.error) {
    return null;
  }

  const orgsToDisplay = orgListItems
    .filter((org) => {
      if (searchValue) {
        return org.name.toLowerCase().includes(searchValue.toLowerCase());
      }
      return true;
    })
    .slice(0, page * perPage);

  return (
    <Wrapper>
      {total ? (
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
            });
            setPage(1);
          }
        }}
        isLoading={result.fetching}
        hasShowMoreButton={!!total && page * perPage < total && searchValue.length === 0}
        showMoreOnClick={() => {
          if (!result.fetching) {
            setPage(page + 1);
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

          {orgsToDisplay &&
            orgsToDisplay.map((org, i) => <OrganizationHex key={'organization-' + i} org={org} />)}
        </OrgListContainer>
      </StyledItemList>
    </Wrapper>
  );
};
