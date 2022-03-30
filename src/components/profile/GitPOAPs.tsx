import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { GitPOAPGql } from '../../types';
import { GitPOAP as GitPOAPBadgeUI } from '../shared/compounds/GitPOAP';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';

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
  &:not(:last-child) {
    margin-right: ${rem(40)};
  }
  margin-top: ${rem(30)};
`;

const GitPOAPsQuery = gql`
  query gitPOAPs($address: String!, $sort: String, $page: Float, $perPage: Float) {
    userPOAPs(address: $address, sort: $sort, page: $page, perPage: $perPage) {
      totalGitPOAPs
      gitPOAPs {
        claim {
          gitPOAP {
            id
            repo {
              name
            }
          }
        }
        poap {
          event {
            name
            image_url
            description
          }
          tokenId
        }
      }
    }
  }
`;

export const GitPOAPs = ({ address }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('date');
  const [gitPOAPItems, setGitPOAPItems] = useState<GitPOAPGql[]>([]);
  const [total, setTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState('');
  const perPage = 4;

  const [result] = useQuery<{
    userPOAPs: {
      totalGitPOAPs: number;
      gitPOAPs: GitPOAPGql[];
    };
  }>({
    query: GitPOAPsQuery,
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
    setGitPOAPItems((prev: GitPOAPGql[]) => {
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
      hasShowMoreButton={!!total && gitPOAPItems.length < total}
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
        {gitPOAPItems &&
          gitPOAPItems
            .filter((gitPOAPItem) => {
              if (searchValue) {
                return (
                  gitPOAPItem.poap.event.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  gitPOAPItem.claim.gitPOAP.repo.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                );
              }

              return true;
            })
            .map((gitPOAPItem) => {
              return (
                <GitPOAPBadge
                  key={gitPOAPItem.poap.tokenId}
                  gitPOAPId={gitPOAPItem.claim.gitPOAP.id}
                  orgName={gitPOAPItem.claim.gitPOAP.repo.name}
                  name={gitPOAPItem.poap.event.name}
                  imgSrc={gitPOAPItem.poap.event.image_url}
                  poapTokenId={gitPOAPItem.poap.tokenId}
                  description={gitPOAPItem.poap.event.description}
                />
              );
            })}
      </GitPOAPList>
    </ItemList>
  );
};
