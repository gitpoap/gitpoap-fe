import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { Header } from '../shared/elements/Header';
import { RepoHex } from './RepoHex';

type SortOptions = 'alphabetical' | 'date' | 'gitpoap-count' | 'organization';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'date', label: 'Creation Date' },
  { value: 'gitpoap-count', label: 'GitPOAP Count' },
  { value: 'organization', label: 'Organization' },
];

const GitPOAPList = styled.div`
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
  margin-bottom: ${rem(80)};
`;

const Wrapper = styled.div`
  margin-top: ${rem(80)};
  text-align: center;
`;

export type Repo = {
  id: number;
  name: string;
  githubRepoId: number;
  gitPOAPs: {
    id: number;
  }[];
};

const GitPOAPsQuery = gql`
  query gitPOAPs($sort: String, $page: Float, $perPage: Float) {
    allRepos(sort: $sort, page: $page, perPage: $perPage) {
      id
      name
      githubRepoId
      gitPOAPs {
        id
      }
    }
  }
`;

export const RepoList = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('alphabetical');
  const [gitPOAPItems, setGitPOAPItems] = useState<Repo[]>([]);
  const [total, setTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState('');
  const perPage = 10;

  const [result] = useQuery<{
    allRepos: Repo[];
  }>({
    query: GitPOAPsQuery,
    variables: {
      page,
      perPage,
      sort,
    },
  });

  /* If the address of the profile being looked at changes, clear the data we've saved */
  useEffect(() => {
    setGitPOAPItems([]);
  }, []);

  /* Hook to append new data onto existing list of gitPOAPs */
  useEffect(() => {
    setGitPOAPItems((prev: Repo[]) => {
      if (result.data?.allRepos) {
        return [...prev, ...result.data.allRepos];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to set total number of GitPOAPs */
  useEffect(() => {
    if (result.data?.allRepos) {
      setTotal(result.data.allRepos.length);
    }
  }, [result.data]);

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      <StyledHeader>{`${total} repos`}</StyledHeader>
      <ItemList
        title={``}
        selectOptions={selectOptions}
        selectValue={sort}
        onSelectChange={(sortValue) => {
          if (sortValue !== sort) {
            setSort(sortValue as SortOptions);
            setGitPOAPItems([]);
            setPage(1);
          }
        }}
        isLoading={result.fetching}
        hasShowMoreButton={!!total && gitPOAPItems.length < total && gitPOAPItems.length > 0}
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
        <GitPOAPList>
          {result.fetching && !result.operation && (
            <>
              {[...Array(5)].map((_, i) => {
                return (
                  <POAPBadgeSkeleton key={i} style={{ marginTop: rem(30), marginRight: rem(40) }} />
                );
              })}
            </>
          )}
          {/* {result.operation && gitPOAPItems.length === 0 && (
            <EmptyState icon={<FaTrophy color={TextDarkGray} size={rem(74)} />}>
              <a href={'https://gitpoap.io/discord'} target="_blank" rel="noopener noreferrer">
                <Title style={{ marginTop: rem(20) }}>
                  {'Get contributing! Head over to our Discord to get started.'}
                </Title>
              </a>
            </EmptyState>
          )} */}

          {/* Fully Claimed GitPOAPs rendered next */}
          {gitPOAPItems &&
            gitPOAPItems
              .filter((gitPOAPItem) => {
                if (searchValue) {
                  return gitPOAPItem.name.toLowerCase().includes(searchValue.toLowerCase());
                }
                return true;
              })
              .map((gitPOAPItem, i) => {
                return <RepoHex key={'repo-' + i} repo={gitPOAPItem} />;
              })}
        </GitPOAPList>
      </ItemList>
    </Wrapper>
  );
};
