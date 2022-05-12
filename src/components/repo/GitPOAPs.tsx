import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { POAPEvent } from '../../types';
import { GitPOAP as GitPOAPBadgeUI } from '../shared/compounds/GitPOAP';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { Title } from '../shared/elements/Title';
import { FaTrophy } from 'react-icons/fa';
import { TextDarkGray } from '../../colors';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';

type Props = {
  repoId: number;
};

type SortOptions = 'date' | 'alphabetical';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'date', label: 'Mint Date' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

const GitPOAPList = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${rem(50)};
  align-items: flex-start;
`;

const GitPOAPBadge = styled(GitPOAPBadgeUI)`
  margin: ${rem(30)} ${rem(20)} 0;
`;

export type GitPOAPGql = {
  gitPOAP: {
    id: number;
    repo: {
      name: string;
    };
  };
  event: POAPEvent;
};

const RepoGitPOAPsQuery = gql`
  query repoGitPOAPs($repoId: Float!, $sort: String, $page: Float, $perPage: Float) {
    repoGitPOAPs(repoId: $repoId, sort: $sort, page: $page, perPage: $perPage) {
      totalGitPOAPs
      gitPOAPs {
        gitPOAP {
          id
          repo {
            name
          }
        }
        event {
          name
          image_url
          description
        }
      }
    }
  }
`;

export const GitPOAPs = ({ repoId }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('date');
  const [gitPOAPItems, setGitPOAPItems] = useState<GitPOAPGql[]>([]);
  const [total, setTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState('');
  const perPage = 10;

  const [result] = useQuery<{
    repoGitPOAPs: {
      totalGitPOAPs: number;
      gitPOAPs: GitPOAPGql[];
    };
  }>({
    query: RepoGitPOAPsQuery,
    variables: {
      repoId,
      page,
      perPage,
      sort,
    },
  });

  /* If the repoId of the repo being looked at changes, clear the data we've saved */
  useEffect(() => {
    setGitPOAPItems([]);
  }, [repoId]);

  /* Hook to append new data onto existing list of gitPOAPs */
  useEffect(() => {
    setGitPOAPItems((prev: GitPOAPGql[]) => {
      if (result.data?.repoGitPOAPs) {
        return [...prev, ...result.data.repoGitPOAPs.gitPOAPs];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to set total number of GitPOAPs */
  useEffect(() => {
    if (result.data?.repoGitPOAPs) {
      setTotal(result.data.repoGitPOAPs.totalGitPOAPs);
    }
  }, [result.data]);

  if (result.error) {
    return null;
  }

  return (
    <ItemList
      title={`GitPOAPs: ${total ?? ''}`}
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
        {result.operation && gitPOAPItems.length === 0 && (
          <EmptyState icon={<FaTrophy color={TextDarkGray} size={rem(74)} />}>
            <a href={'https://gitpoap.io/discord'} target="_blank" rel="noopener noreferrer">
              <Title style={{ marginTop: rem(20) }}>
                {'Get contributing! Head over to our Discord to get started.'}
              </Title>
            </a>
          </EmptyState>
        )}

        {/* Fully Claimed GitPOAPs rendered next */}
        {gitPOAPItems &&
          gitPOAPItems
            .filter((gitPOAPItem) => {
              if (searchValue) {
                return (
                  gitPOAPItem.event.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  gitPOAPItem.gitPOAP.repo.name.toLowerCase().includes(searchValue.toLowerCase())
                );
              }

              return true;
            })
            .map((gitPOAPItem) => {
              return (
                <GitPOAPBadge
                  key={`${gitPOAPItem.gitPOAP.id}-minting`}
                  gitPOAPId={gitPOAPItem.gitPOAP.id}
                  orgName={gitPOAPItem.gitPOAP.repo.name}
                  name={gitPOAPItem.event.name}
                  imgSrc={gitPOAPItem.event.image_url}
                  description={gitPOAPItem.event.description}
                />
              );
            })}
      </GitPOAPList>
    </ItemList>
  );
};
