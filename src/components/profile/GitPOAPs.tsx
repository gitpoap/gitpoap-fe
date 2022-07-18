import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { GitPOAP as GitPOAPBadgeUI } from '../shared/compounds/GitPOAP';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { Title } from '../shared/elements/Title';
import { FaTrophy } from 'react-icons/fa';
import { TextDarkGray } from '../../colors';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { useGitPoapsQuery, GitPoapsQuery } from '../../graphql/generated-gql';

type Props = {
  address: string;
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

type GitPOAPItems = Exclude<GitPoapsQuery['userPOAPs'], undefined | null>['gitPOAPs'];

export const GitPOAPs = ({ address }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('date');
  const [gitPOAPItems, setGitPOAPItems] = useState<GitPOAPItems>([]);
  const [total, setTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState('');
  const perPage = 10;

  const [result] = useGitPoapsQuery({
    variables: {
      address,
      page,
      perPage,
      sort,
    },
  });

  /* If the address of the profile being looked at changes, clear the data we've saved */
  useEffect(() => {
    setGitPOAPItems([]);
  }, [address]);

  /* Hook to append new data onto existing list of gitPOAPs */
  useEffect(() => {
    setGitPOAPItems((prev: GitPOAPItems) => {
      if (result.data?.userPOAPs) {
        return [...prev, ...result.data.userPOAPs.gitPOAPs];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to set total number of GitPOAPs */
  useEffect(() => {
    if (result.data?.userPOAPs) {
      setTotal(result.data.userPOAPs.totalGitPOAPs);
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
                  gitPOAPItem.claim.pullRequestEarned?.repo.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                );
              }

              return true;
            })
            .map((gitPOAPItem) => {
              return (
                <GitPOAPBadge
                  key={gitPOAPItem.claim.poapTokenId ?? `${gitPOAPItem.claim.gitPOAP.id}-minting`}
                  gitPOAPId={gitPOAPItem.claim.gitPOAP.id}
                  repoName={gitPOAPItem.claim.pullRequestEarned?.repo.name}
                  orgName={gitPOAPItem.claim.pullRequestEarned?.repo.organization.name}
                  name={gitPOAPItem.event.name}
                  imgSrc={gitPOAPItem.event.image_url}
                  poapTokenId={gitPOAPItem.claim.poapTokenId}
                />
              );
            })}
      </GitPOAPList>
    </ItemList>
  );
};
