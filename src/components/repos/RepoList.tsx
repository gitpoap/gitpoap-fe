import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaSearch } from 'react-icons/fa';
import { useDebouncedValue, useListState } from '@mantine/hooks';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { RepoList as RepoListContainer } from '../shared/compounds/RepoList';
import { Header } from '../shared/elements/Header';
import { RepoHex, RepoHexSkeleton } from './RepoHex';
import { Input, Loader, TextSkeleton } from '../shared/elements';
import {
  AllReposOnRepoPageQuery,
  useAllReposOnRepoPageQuery,
  useTotalRepoCountQuery,
  useRepoSearchOnRepoPageQuery,
} from '../../graphql/generated-gql';
import { trackSearchForRepos } from '../../lib/tracking/events';

type SortOptions = 'alphabetical' | 'date' | 'gitpoap-count' | 'organization';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'date', label: 'Creation Date' },
  { value: 'gitpoap-count', label: 'GitPOAP Count' },
  { value: 'organization', label: 'Organization' },
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

export type Repo = Exclude<AllReposOnRepoPageQuery['allRepos'], undefined | null>[number];

type QueryVars = {
  page: number;
  perPage: number;
  sort: SortOptions;
};

export const RepoList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
    sort: 'gitpoap-count',
  });
  const [repoListItems, handlers] = useListState<Repo>([]);
  const [result] = useAllReposOnRepoPageQuery({ variables });
  const [searchResult] = useRepoSearchOnRepoPageQuery({
    variables: { search: debouncedSearch, take: 20 },
  });
  const [totalResult] = useTotalRepoCountQuery({});
  const total = totalResult.data?.aggregateRepo._count?.id;
  const allRepos = result.data?.allRepos;
  const queryVariables = result.operation?.variables;

  /* Hook to append new data onto existing list of repos */
  useEffect(() => {
    const resultPage = queryVariables?.page;
    if (allRepos) {
      const newRepoListItems = allRepos;
      if (resultPage === 1) {
        handlers.setState(newRepoListItems);
      } else {
        handlers.append(...newRepoListItems);
      }
    }
    /* Do not include handlers below */
  }, [allRepos, queryVariables]);

  /* Hook only for tracking purposes */
  useEffect(() => {
    if (debouncedSearch.length > 0) {
      trackSearchForRepos(debouncedSearch);
    }
  }, [debouncedSearch]);

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      {total ? (
        <StyledHeader>{`${total} Repos`}</StyledHeader>
      ) : (
        <HeaderSkeleton height={rem(48)} />
      )}
      <StyledSearch
        style={{ marginBottom: rem(40), width: rem(400) }}
        placeholder={'SEARCH FOR A REPO...'}
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        icon={searchResult.fetching ? <Loader size={18} /> : <FaSearch />}
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
        hasShowMoreButton={
          !!total &&
          repoListItems.length < total &&
          repoListItems.length > 0 &&
          searchValue.length === 0
        }
        showMoreOnClick={() => {
          if (!result.fetching) {
            setVariables({
              ...variables,
              page: variables.page + 1,
            });
          }
        }}
      >
        <RepoListContainer>
          {result.fetching && !result.operation && repoListItems.length === 0 && (
            <>
              {[...Array(15)].map((_, i) => (
                <RepoHexSkeleton key={i} />
              ))}
            </>
          )}
          {searchResult.data?.repos && searchValue
            ? searchResult.data.repos.map((repo, i) => {
                return <RepoHex key={'repo-' + i} repo={repo} />;
              })
            : repoListItems?.map((repo, i) => <RepoHex key={'repo-' + i} repo={repo} />)}
        </RepoListContainer>
      </StyledItemList>
    </Wrapper>
  );
};
