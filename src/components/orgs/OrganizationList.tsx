import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { OrganizationHex, OrganizationHexSkeleton } from './OrganizationHex';
import {
  OrganizationsListQuery,
  OrganizationsListQueryVariables,
  useOrganizationsListQuery,
} from '../../graphql/generated-gql';
import { useListState } from '@mantine/hooks';
import { Header, Input } from '../shared/elements';

type SortOptions = 'alphabetical' | 'date';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'date', label: 'Creation Date' },
];

const OrgList = styled.div`
  display: grid;
  column-gap: ${rem(30)};
  row-gap: ${rem(32)};
  grid-template-columns: repeat(auto-fill, ${rem(260)});
  justify-content: center;
  align-content: center;
  margin: ${rem(50)};
  align-items: flex-start;
`;

const StyledHeader = styled(Header)`
  display: block;
  margin-bottom: ${rem(40)};
`;

const Wrapper = styled.div`
  margin-top: ${rem(80)};
  text-align: center;
`;

const StyledItemList = styled(ItemList)`
  margin-bottom: ${rem(50)};
`;

export type Org = Exclude<OrganizationsListQuery['allOrganizations'], undefined | null>[number];

type QueryVars = {
  sort: SortOptions;
};

export const OrganizationList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 15;
  const [variables, setVariables] = useState<QueryVars>({
    sort: 'date',
  });
  const [orgListItems, handlers] = useListState<Org>([]);
  const [result] = useOrganizationsListQuery({ variables });
  // @TODO: Add a way to get total org count
  const allOrganizations = result.data?.allOrganizations;
  console.log(!!allOrganizations ? allOrganizations[0] : allOrganizations);
  const total = allOrganizations?.length;

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
      <StyledHeader>{`${total ?? ''} Organizations`}</StyledHeader>
      <Input
        style={{ marginBottom: rem(40), width: rem(400) }}
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
        <OrgList>
          {result.fetching && !result.operation && (
            <>
              {[...Array(10)].map((_, i) => (
                <OrganizationHexSkeleton key={i} />
              ))}
            </>
          )}

          {orgsToDisplay &&
            orgsToDisplay.map((org, i) => <OrganizationHex key={'organization-' + i} org={org} />)}
        </OrgList>
      </StyledItemList>
    </Wrapper>
  );
};
