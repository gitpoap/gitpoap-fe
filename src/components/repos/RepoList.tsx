import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { Header } from '../shared/elements/Header';
import { RepoHex, RepoHexSkeleton } from './RepoHex';
import { Input } from '../shared/elements';
import {
  AllReposOnRepoPageQuery,
  useAllReposOnRepoPageQuery,
  useTotalRepoCountQuery,
  AllReposOnRepoPageQueryVariables,
} from '../../graphql/generated-gql';
import { useListState } from '@mantine/hooks';

type SortOptions = 'alphabetical' | 'date' | 'gitpoap-count' | 'organization';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'date', label: 'Creation Date' },
  { value: 'gitpoap-count', label: 'GitPOAP Count' },
  { value: 'organization', label: 'Organization' },
];

const RepoListContainer = styled.div`
  display: grid;
  column-gap: ${rem(30)};
  row-gap: ${rem(32)};
  grid-template-columns: repeat(auto-fill, ${rem(280)});
  justify-content: center;
  align-content: center;
  margin: ${rem(50)} 0;
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

export type Repo = Exclude<AllReposOnRepoPageQuery['allRepos'], undefined | null>[number];

export const RepoList = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('gitpoap-count');
  const [searchValue, setSearchValue] = useState('');
  const perPage = 15;
  const [repoListItems, handlers] = useListState<Repo>([]);
  const [result] = useAllReposOnRepoPageQuery({
    variables: {
      page,
      perPage,
      sort,
    },
  });
  const [totalResult] = useTotalRepoCountQuery({});

  const total = totalResult.data?.totalRepos;

  // Assert type until following issue is resolved:
  // https://github.com/dotansimha/graphql-code-generator/issues/7976
  const queryVariables = result.operation?.variables as
    | AllReposOnRepoPageQueryVariables
    | undefined;

  /* Ensure the list of repos is empty on page load */
  useEffect(() => {
    handlers.setState([]);
  }, []);

  /* Hook to append new data onto existing list of repos */
  useEffect(() => {
    const resultPage = queryVariables?.page;
    if (result?.data?.allRepos) {
      const newRepoListItems = result.data.allRepos;
      if (resultPage === 1) {
        handlers.setState(newRepoListItems);
      } else {
        handlers.append(...newRepoListItems);
      }
    }
    /* Do not include handlers below */
  }, [result?.data?.allRepos, queryVariables]);

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      <StyledHeader>{`${total ?? ''} repos`}</StyledHeader>
      <Input
        style={{ marginBottom: rem(40), width: rem(400) }}
        placeholder={'SEARCH FOR A REPO...'}
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
      />
      <StyledItemList
        selectOptions={selectOptions}
        selectValue={sort}
        onSelectChange={(sortValue) => {
          if (sortValue !== sort) {
            setSort(sortValue as SortOptions);
            setPage(1);
          }
        }}
        isLoading={result.fetching}
        hasShowMoreButton={!!total && repoListItems.length < total && repoListItems.length > 0}
        showMoreOnClick={() => {
          if (!result.fetching) {
            setPage(page + 1);
          }
        }}
      >
        <RepoListContainer>
          {result.fetching && !result.operation && repoListItems.length === 0 && (
            <>
              {[...Array(5)].map((_, i) => (
                <RepoHexSkeleton key={i} />
              ))}
            </>
          )}

          {repoListItems &&
            repoListItems
              .filter((repo) => {
                if (searchValue) {
                  return repo.name.toLowerCase().includes(searchValue.toLowerCase());
                }
                return true;
              })
              .map((repo, i) => {
                return <RepoHex key={'repo-' + i} repo={repo} />;
              })}
        </RepoListContainer>
      </StyledItemList>
    </Wrapper>
  );
};
