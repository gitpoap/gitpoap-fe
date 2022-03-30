import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { POAP } from '../../types';
import { POAPBadge as POAPBadgeUI } from '../shared/elements/POAPBadge';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';

type Props = {
  address: string;
};

type SortOptions = 'date' | 'alphabetical';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'date', label: 'Mint Date' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

const AllPOAPsQuery = gql`
  query allPOAPs($address: String!, $sort: String, $page: Float, $perPage: Float) {
    userPOAPs(address: $address, sort: $sort, page: $page, perPage: $perPage) {
      totalPOAPs
      poaps {
        event {
          id
          name
          image_url
        }
        tokenId
      }
    }
  }
`;

export type UserPOAPsQueryRes = {
  userPOAPs: {
    totalPOAPs: number;
    poaps: POAP[];
  } | null;
};

const POAPs = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${rem(50)};
`;

const POAPBadge = styled(POAPBadgeUI)`
  &:not(:last-child) {
    margin-right: ${rem(40)};
  }
  margin-top: ${rem(30)};
`;

export const AllPOAPs = ({ address }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('date');
  const [poaps, setPoaps] = useState<POAP[]>([]);
  const [total, setTotal] = useState<number>();
  const perPage = 12;
  const [result] = useQuery<UserPOAPsQueryRes>({
    query: AllPOAPsQuery,
    variables: {
      address,
      page,
      perPage,
      sort,
    },
  });

  /* If the address of the profile being looked at changes, clear the data we've saved */
  useEffect(() => {
    setPoaps([]);
  }, [address]);

  /* Hook to append new data onto existing list of poaps */
  useEffect(() => {
    setPoaps((prev: POAP[]) => {
      if (result.data?.userPOAPs) {
        return [...prev, ...result.data.userPOAPs.poaps];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to set total number of poaps */
  useEffect(() => {
    if (result.data?.userPOAPs) {
      setTotal(result.data.userPOAPs.totalPOAPs);
    }
  }, [result.data]);

  if (result.error) {
    return null;
  }

  return (
    <ItemList
      title={`All POAPs: ${total ?? ''}`}
      selectOptions={selectOptions}
      selectValue={sort}
      onSelectChange={(sortValue) => {
        if (sortValue !== sort) {
          setSort(sortValue as SortOptions);
          setPoaps([]);
          setPage(1);
        }
      }}
      isLoading={result.fetching}
      hasShowMoreButton={!!total && poaps.length < total}
      showMoreOnClick={() => {
        if (!result.fetching) {
          setPage(page + 1);
        }
      }}
    >
      <POAPs>
        {poaps &&
          poaps.map((poap) => {
            return (
              <POAPBadge
                key={poap.tokenId}
                name={poap.event.name}
                imgSrc={poap.event.image_url}
                poapTokenId={poap.tokenId}
                href={`https://poap.gallery/event/${poap.event.id}`}
              />
            );
          })}
      </POAPs>
    </ItemList>
  );
};
