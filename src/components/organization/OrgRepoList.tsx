import React, { useState, useEffect } from 'react';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { RepoList } from '../shared/compounds/RepoList';
import { RepoHexSkeleton } from '../repos/RepoHex';
import { OrgRepoHex } from './OrgRepoHex';
import {
  OrganizationReposQuery,
  OrganizationReposQueryVariables,
  useOrganizationReposQuery,
} from '../../graphql/generated-gql';
import { useListState } from '@mantine/hooks';

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

type QueryVars = {
  page: number;
  perPage: number;
  sort: SortOptions;
};

type Props = {
  orgId: number;
};

export const OrgRepoList = ({ orgId }: Props) => {
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
    sort: 'alphabetical',
  });
  const [repoItems, handlers] = useListState<OrgRepo>([]);
  const [searchValue, setSearchValue] = useState('');

  const [result] = useOrganizationReposQuery({
    variables: {
      orgId,
      ...variables,
    },
  });

  const [resultForCount] = useOrganizationReposQuery({
    variables: {
      orgId,
    },
  });

  const allRepoItems = result?.data?.organizationRepos;
  const repoCount = resultForCount.data?.organizationRepos?.length;

  // Assert type until following issue is resolved:
  // https://github.com/dotansimha/graphql-code-generator/issues/7976
  const queryVariables = result.operation?.variables as OrganizationReposQueryVariables | undefined;

  /* Hook to append new data onto existing list of repos */
  useEffect(() => {
    const resultPage = queryVariables?.page;
    if (allRepoItems) {
      if (resultPage === 1) {
        handlers.setState(allRepoItems);
      } else {
        handlers.append(...allRepoItems);
      }
    }
    /* Do not include handlers below */
  }, [allRepoItems, queryVariables]);

  return (
    <ItemList
      title={`Repos: ` + repoCount}
      selectOptions={selectOptions}
      selectValue={variables.sort}
      onSelectChange={(sortValue) => {
        if (sortValue !== variables.sort) {
          setVariables({
            ...variables,
            page: 1,
            sort: sortValue as SortOptions,
          });
        }
      }}
      isLoading={result.fetching}
      hasShowMoreButton={
        !!repoCount && repoItems.length < repoCount && repoItems.length > 0 && searchValue === ''
      }
      showMoreOnClick={() => {
        if (!result.fetching) {
          setVariables({
            ...variables,
            page: variables.page + 1,
          });
        }
      }}
      searchInputPlaceholder={'QUICK SEARCH...'}
      searchInputValue={searchValue}
      onSearchInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchValue(e.target.value)
      }
    >
      <RepoList>
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
      </RepoList>
    </ItemList>
  );
};
