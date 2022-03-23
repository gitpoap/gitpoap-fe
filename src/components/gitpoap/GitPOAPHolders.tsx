import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, gql } from 'urql';

import { InfoHexSummary } from './InfoHexSummary';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';

type Props = {
  gitPOAPId: number;
};

type Holder = {
  address: string;
  githubHandle: string;
  gitPOAPCount: number;
  profileId: number;
  bio?: string;
  personalSiteUrl?: string;
  profileImageUrl?: string;
  twitterHandle?: string;
};

type GitPOAPHoldersQueryProps = {
  holders: Holder[];
  totalHolders: number;
};

const HoldersWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${rem(50)};
`;

const Holder = styled(InfoHexSummary)`
  margin-right: ${rem(24)};
  margin-top: ${rem(40)};
`;

const GitPOAPHoldersQuery = gql`
  query gitPOAPHolders($gitPOAPId: Float!, $page: Float, $perPage: Float, $sort: String) {
    gitPOAPHolders(gitPOAPId: $gitPOAPId, page: $page, perPage: $perPage, sort: $sort) {
      totalHolders
      holders {
        address
        githubHandle
        gitPOAPCount
        profileId
        bio
        personalSiteUrl
        profileImageUrl
        twitterHandle
      }
    }
  }
`;

type SortOptions = 'claim-date' | 'claim-count';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'claim-date', label: 'Claim Date' },
  { value: 'claim-count', label: 'Total Poaps' },
];

export const GitPOAPHolders = ({ gitPOAPId }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('claim-count');
  const [holders, setHolders] = useState<Holder[]>([]);
  const [total, setTotal] = useState<number>();
  const perPage = 12;

  const [result] = useQuery<{
    gitPOAPHolders: GitPOAPHoldersQueryProps;
  }>({
    query: GitPOAPHoldersQuery,
    variables: {
      gitPOAPId,
      page,
      perPage,
      sort,
    },
  });

  /* Hook to append new data onto existing list of holders */
  useEffect(() => {
    setHolders((prev: Holder[]) => {
      if (result.data?.gitPOAPHolders) {
        return [...prev, ...result.data.gitPOAPHolders.holders];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to clear list of holders when the gitPOAPId changes */
  useEffect(() => {
    setHolders([]);
  }, [gitPOAPId]);

  /* Hook to set total number of poaps */
  useEffect(() => {
    if (result.data?.gitPOAPHolders) {
      setTotal(result.data.gitPOAPHolders.totalHolders);
    }
  }, [result.data]);

  if (result.error) {
    return null;
  }

  return (
    <ItemList
      title={total ? `${total} holders` : ''}
      selectOptions={selectOptions}
      selectValue={sort}
      onSelectChange={(sortValue) => {
        if (sortValue !== sort) {
          setSort(sortValue as SortOptions);
          setHolders([]);
          setPage(1);
        }
      }}
      isLoading={result.fetching}
      hasShowMoreButton={!!total && holders.length < total}
      showMoreOnClick={() => {
        if (!result.fetching) {
          setPage(page + 1);
        }
      }}
    >
      <HoldersWrapper>
        {holders.map((holder: Holder) => (
          <Holder
            key={holder.githubHandle}
            imgSrc={holder.profileImageUrl}
            name={holder.githubHandle}
            address={holder.address}
            blurb={holder.bio}
            gitpoapId={gitPOAPId}
            twitterHref={`https://twitter.com/${holder.twitterHandle}`}
            githubHref={`https://github.com/${holder.githubHandle}`}
            numGitPOAPs={holder.gitPOAPCount}
          />
        ))}
      </HoldersWrapper>
    </ItemList>
  );
};
