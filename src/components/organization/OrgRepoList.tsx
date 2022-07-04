import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { RepoHexSkeleton } from '../repos/RepoHex';
import { OrgRepoHex } from './OrgRepoHex';
import { OrganizationReposQuery, useOrganizationReposQuery } from '../../graphql/generated-gql';

type SortOptions = 'alphabetical' | 'date' | 'contributor-count' | 'minted-count';
export type OrgRepo = Exclude<
  OrganizationReposQuery['organizationRepos'],
  null | undefined
>[number];

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'date', label: 'Creation Date' },
  { value: 'contributor-count', label: 'Contributors' },
  { value: 'minted-count', label: 'Minted Count' },
];

const List = styled.div`
  display: grid;
  column-gap: ${rem(30)};
  row-gap: ${rem(32)};
  grid-template-columns: repeat(auto-fill, ${rem(280)});
  justify-content: center;
  align-content: center;

  margin: ${rem(50)} 0;
  align-items: flex-start;
`;

type Props = {
  orgId: number;
};

export const OrgRepoList = ({ orgId }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('alphabetical');
  const [repoItems, setRepoItems] = useState<OrgRepo[]>([]);
  const [total, setTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState('');
  const perPage = 10;

  const [result] = useOrganizationReposQuery({
    variables: {
      orgId,
      page,
      perPage,
      sort,
    },
  });

  /* If the id of the organization being looked at changes, clear the data we've saved */
  useEffect(() => {
    setRepoItems([]);
  }, [orgId]);

  /* Hook to append new data onto existing list of projects */
  useEffect(() => {
    setRepoItems((prev: OrgRepo[]) => {
      if (result.data?.organizationRepos) {
        return [...prev, ...result.data.organizationRepos];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to set total number of repos */
  useEffect(() => {
    if (result.data?.organizationRepos) {
      setTotal(result.data.organizationRepos.length);
    }
  }, [result.data]);

  if (result.error) {
    return null;
  }

  return (
    <ItemList
      title={`Repos: ` + total}
      selectOptions={selectOptions}
      selectValue={sort}
      onSelectChange={(sortValue) => {
        if (sortValue !== sort) {
          setSort(sortValue as SortOptions);
          setRepoItems([]);
          setPage(1);
        }
      }}
      isLoading={result.fetching}
      hasShowMoreButton={!!total && repoItems.length < total && repoItems.length > 0}
      showMoreOnClick={() => {
        if (!result.fetching) {
          setPage(page + 1);
        }
      }}
      searchInputPlaceholder={'QUICK SEARCH...'}
      searchInputValue={searchValue}
      onSearchInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchValue(e.target.value)
      }
    >
      <List>
        {result.fetching && !result.operation && (
          <>
            {[...Array(3)].map((_, i) => (
              <RepoHexSkeleton key={i} />
            ))}
          </>
        )}
        {repoItems &&
          repoItems
            .filter((repo) =>
              searchValue ? repo.name.toLowerCase().includes(searchValue.toLowerCase()) : true,
            )
            .map((repo, i) => <OrgRepoHex key={'org-repo-' + i} repo={repo} />)}
      </List>
    </ItemList>
  );
};
