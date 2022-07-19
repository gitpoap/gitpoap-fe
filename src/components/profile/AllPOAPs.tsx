import React, { useEffect, useState } from 'react';
import { rem } from 'polished';
import { POAP } from '../../types';
import { POAPBadge } from '../shared/elements/POAPBadge';
import { POAPList } from '../shared/compounds/POAPList';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { TextDarkGray } from '../../colors';
import { FaRegGrinStars } from 'react-icons/fa';
import { Text } from '../shared/elements/Text';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { useAllPoapsQuery } from '../../graphql/generated-gql';

type Props = {
  address: string;
};

type SortOptions = 'date' | 'alphabetical';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'date', label: 'Mint Date' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

export const AllPOAPs = ({ address }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('date');
  const [poaps, setPoaps] = useState<POAP[]>([]);
  const [total, setTotal] = useState<number>();
  const perPage = 10;
  const [result] = useAllPoapsQuery({
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
      hasShowMoreButton={!!result?.operation && !!total && poaps.length < total}
      showMoreOnClick={() => {
        if (!result.fetching) {
          setPage(page + 1);
        }
      }}
    >
      <POAPList>
        {result.fetching && !result.operation && (
          <>
            {[...Array(5)].map((_, i) => {
              return (
                <POAPBadgeSkeleton key={i} style={{ marginTop: rem(30), marginRight: rem(40) }} />
              );
            })}
          </>
        )}
        {result.operation && poaps.length === 0 && (
          <EmptyState icon={<FaRegGrinStars color={TextDarkGray} size={rem(74)} />}>
            <Text style={{ marginTop: rem(20) }}>{'Go out and get some POAPs!'}</Text>
          </EmptyState>
        )}
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
      </POAPList>
    </ItemList>
  );
};
