import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import styled from 'styled-components';
import { useGitPoapHoldersQuery } from '../../graphql/generated-gql';
import { InfoHexSummary } from './InfoHexSummary';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { Text } from '../shared/elements/Text';
import { TextDarkGray } from '../../colors';

type Props = {
  gitPOAPId: number;
  variant?: number;
  highNumberTest?: boolean;
  showBorder?: boolean;
};

export type Holder = {
  address: string;
  githubHandle: string;
  gitPOAPCount: number;
  profileId: number;
  bio?: string | null;
  personalSiteUrl?: string | null;
  twitterHandle?: string | null;
};

const HoldersWrapper = styled.div<{ showBorder?: boolean; variant?: number }>`
  display: grid;
  margin-bottom: ${rem(50)};
  margin-top: ${rem(40)};
  column-gap: ${rem(24)};
  row-gap: ${rem(40)};

  > div {
    ${({ showBorder }) => showBorder && `border: 1px solid #000;`}
  }

  ${({ variant }) => {
    switch (variant) {
      case 1:
        return `grid-template-columns: repeat(auto-fill, minmax(${rem(215)}, 1fr));`;
      case 2:
        return `grid-template-columns: repeat(auto-fill, minmax(${rem(
          215,
        )}, 1fr)); justify-items: center;`;
      case 3:
        return `grid-template-columns: repeat(auto-fill, ${rem(215)});`;
      case 4:
        return `grid-template-columns: repeat(auto-fill, ${rem(
          215,
        )});justify-content: center;align-content: center;`;
      case 5:
        return `grid-template-columns: repeat(auto-fit, ${rem(
          215,
        )});justify-content: center;align-content: center;`;
      case 6:
        return `grid-template-columns: repeat(auto-fit, minmax(${rem(
          215,
        )}, 1fr));justify-items: center;`;
      default:
        return `grid-template-columns: repeat(auto-fill, minmax(${rem(
          215,
        )}, 1fr));justify-content: center;align-content: center;`;
    }
  }}
`;

type SortOptions = 'claim-date' | 'claim-count';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'claim-date', label: 'Mint Date' },
  { value: 'claim-count', label: 'Total Poaps' },
];

export const GitPOAPHolders = ({ gitPOAPId, variant, highNumberTest, showBorder }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('claim-count');
  const [holders, setHolders] = useState<Holder[]>([]);
  const [total, setTotal] = useState<number>();
  const perPage = 12;

  const [result] = useGitPoapHoldersQuery({
    variables: {
      gitPOAPId,
      page,
      perPage,
      sort,
    },
  });

  /* Hook to clear list of holders when the gitPOAPId changes */
  useEffect(() => {
    setHolders([]);
  }, [gitPOAPId]);

  /* Hook to append new data onto existing list of holders */
  useEffect(() => {
    setHolders((prev: Holder[]) => {
      if (result.data?.gitPOAPHolders) {
        return [...prev, ...result.data.gitPOAPHolders.holders];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to set total number of poaps */
  useEffect(() => {
    if (result.data?.gitPOAPHolders) {
      setTotal(result.data.gitPOAPHolders.totalHolders);
    }
  }, [result.data]);

  if (result.error || result.fetching) {
    return null;
  }

  return (
    <ItemList
      title={`Variant ${variant ?? 0}`}
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
      {total ? (
        <HoldersWrapper showBorder={showBorder} variant={variant}>
          {[...Array(highNumberTest ? 2 : 1)].map(() =>
            holders.map((holder: Holder) =>
              variant && variant === 1 ? (
                <div>
                  <InfoHexSummary
                    key={holder.githubHandle}
                    address={holder.address}
                    bio={holder.bio}
                    gitpoapId={gitPOAPId}
                    twitterHandle={holder.twitterHandle}
                    personalSiteUrl={holder.personalSiteUrl}
                    numGitPOAPs={holder.gitPOAPCount}
                  />
                </div>
              ) : (
                <InfoHexSummary
                  key={holder.githubHandle}
                  address={holder.address}
                  bio={holder.bio}
                  gitpoapId={gitPOAPId}
                  twitterHandle={holder.twitterHandle}
                  personalSiteUrl={holder.personalSiteUrl}
                  numGitPOAPs={holder.gitPOAPCount}
                />
              ),
            ),
          )}
        </HoldersWrapper>
      ) : (
        <EmptyState icon={<FaUsers color={TextDarkGray} size={rem(74)} />}>
          <Text style={{ marginTop: rem(20) }}>{'No one has minted this GitPOAP'}</Text>
        </EmptyState>
      )}
    </ItemList>
  );
};
