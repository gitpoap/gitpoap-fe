import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { GitPOAPGql, UserClaim } from '../../types';
import { GitPOAP as GitPOAPBadgeUI } from '../shared/compounds/GitPOAP';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { Title } from '../shared/elements/Title';
import { FaTrophy } from 'react-icons/fa';
import { TextDarkGray } from '../../colors';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';

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

const GitPOAPsQuery = gql`
  query gitPOAPs($address: String!, $sort: String, $page: Float, $perPage: Float) {
    userPOAPs(address: $address, sort: $sort, page: $page, perPage: $perPage) {
      totalGitPOAPs
      mintingGitPOAPs {
        claim {
          id
          gitPOAP {
            id
            repo {
              name
            }
          }
        }
        event {
          name
          image_url
          description
        }
      }
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
  const [mintingGitPOAPs, setMintingGitPOAPs] = useState<UserClaim[]>([]);
  const [total, setTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState('');
  const perPage = 4;

  const [result] = useQuery<{
    userPOAPs: {
      totalGitPOAPs: number;
      gitPOAPs: GitPOAPGql[];
      mintingGitPOAPs: UserClaim[];
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
    if (result.data?.userPOAPs.mintingGitPOAPs) {
      setMintingGitPOAPs(result.data.userPOAPs.mintingGitPOAPs);
    }
  }, [result.data]);

  /* Hook to set total number of GitPOAPs */
  useEffect(() => {
    let total = 0;
    if (result.data?.userPOAPs) {
      total += result.data.userPOAPs.totalGitPOAPs;
    }
    if (result.data?.userPOAPs.mintingGitPOAPs) {
      total += result.data?.userPOAPs.mintingGitPOAPs.length;
    }
    setTotal(total);
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
        {result.fetching && !result.operation && (
          <>
            {[...Array(5)].map((_, i) => {
              return (
                <POAPBadgeSkeleton key={i} style={{ marginTop: rem(30), marginRight: rem(40) }} />
              );
            })}
          </>
        )}
        {result.operation && gitPOAPItems.length === 0 && mintingGitPOAPs.length === 0 && (
          <EmptyState icon={<FaTrophy color={TextDarkGray} size={rem(74)} />}>
            <a href={'https://gitpoap.io/discord'} target="_blank" rel="noopener noreferrer">
              <Title style={{ marginTop: rem(20) }}>
                {'Get contributing! Head over to our Discord to get started.'}
              </Title>
            </a>
          </EmptyState>
        )}

        {/* Minting POAPs rendered first */}
        {mintingGitPOAPs &&
          mintingGitPOAPs
            .filter((mintingGitPOAP) => {
              if (searchValue) {
                return (
                  mintingGitPOAP.event.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  (mintingGitPOAP.claim.gitPOAP.repo.name &&
                    mintingGitPOAP.claim.gitPOAP.repo.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()))
                );
              }

              return true;
            })
            .map((mintingGitPOAP) => {
              return (
                <GitPOAPBadge
                  key={mintingGitPOAP.event.id + 'minting'}
                  gitPOAPId={mintingGitPOAP.claim.gitPOAP.id}
                  orgName={mintingGitPOAP.claim.gitPOAP.repo.name ?? ''}
                  name={mintingGitPOAP.event.name}
                  imgSrc={mintingGitPOAP.event.image_url}
                  description={mintingGitPOAP.event.description}
                />
              );
            })}

        {/* Fully Claimed GitPOAPs rendered next */}
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
