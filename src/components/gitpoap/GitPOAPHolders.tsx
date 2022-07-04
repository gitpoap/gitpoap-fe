import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import styled from 'styled-components';
import { useListState } from '@mantine/hooks';
import { useGitPoapHoldersQuery } from '../../graphql/generated-gql';
import { InfoHexSummary } from './InfoHexSummary';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { Text } from '../shared/elements/Text';
import { TextDarkGray } from '../../colors';

type Props = {
  gitPOAPId: number;
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

const StyledItemList = styled(ItemList)`
  margin-bottom: ${rem(50)};
`;

const HoldersWrapper = styled.div`
  display: grid;
  margin-bottom: ${rem(50)};
  margin-top: ${rem(40)};
  column-gap: ${rem(24)};
  row-gap: ${rem(40)};
  grid-template-columns: repeat(auto-fit, ${rem(215)});
  justify-content: center;
`;

type SortOptions = 'claim-date' | 'claim-count';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'claim-date', label: 'Mint Date' },
  { value: 'claim-count', label: 'Total Poaps' },
];

export const GitPOAPHolders = ({ gitPOAPId }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('claim-count');
  const [holders, handlers] = useListState<Holder>([]);
  const perPage = 12;

  const [result] = useGitPoapHoldersQuery({
    variables: {
      gitPOAPId,
      page,
      perPage,
      sort,
    },
  });

  const gitPOAPHolders = result?.data?.gitPOAPHolders;
  const total = gitPOAPHolders?.totalHolders;

  /* Hook to clear list of holders when the gitPOAPId changes */
  useEffect(() => {
    handlers.setState([]);
  }, [gitPOAPId]);

  /* Hook to append new data onto existing list of holders */
  useEffect(() => {
    if (gitPOAPHolders) {
      const newHolders = gitPOAPHolders.holders;
      handlers.append(...newHolders);
    }
  }, [gitPOAPHolders]);

  if (result.error) {
    return null;
  }

  return (
    <StyledItemList
      title={`${total ?? ''} holders`}
      selectOptions={selectOptions}
      selectValue={sort}
      onSelectChange={(sortValue) => {
        if (sortValue !== sort) {
          setSort(sortValue as SortOptions);
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
        <HoldersWrapper>
          {holders.map((holder: Holder) => (
            <InfoHexSummary
              key={`${holder.githubHandle}-${holder.address}`}
              address={holder.address}
              bio={holder.bio}
              gitpoapId={gitPOAPId}
              twitterHandle={holder.twitterHandle}
              personalSiteUrl={holder.personalSiteUrl}
              numGitPOAPs={holder.gitPOAPCount}
            />
          ))}
        </HoldersWrapper>
      ) : (
        <EmptyState icon={<FaUsers color={TextDarkGray} size={rem(74)} />}>
          <Text style={{ marginTop: rem(20) }}>{'No one has minted this GitPOAP'}</Text>
        </EmptyState>
      )}
    </StyledItemList>
  );
};
