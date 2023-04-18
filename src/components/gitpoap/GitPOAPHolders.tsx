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
import { Group } from '@mantine/core';

type Props = {
  gitPOAPId: number;
};

export type Holder = {
  address: string;
  githubHandle?: string | null;
  gitPOAPCount: number;
  profileId: number;
  bio?: string | null;
  personalSiteUrl?: string | null;
  twitterHandle?: string | null;
  ensName: string | null;
  ensAvatarUrl: string | null;
};

const StyledItemList = styled(ItemList)`
  margin-bottom: ${rem(50)};
`;

const HoldersWrapper = styled.div`
  display: grid;

  grid-template-columns: repeat(8, 1fr);
  column-gap: ${rem(40)};
  row-gap: ${rem(40)};

  @media (max-width: ${rem(2050)}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: ${rem(1550)}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${rem(1130)}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${rem(850)}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${rem(550)}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

type SortOptions = 'claim-date' | 'claim-count';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'claim-date', label: 'Mint Date' },
  { value: 'claim-count', label: 'Total GitPoaps' },
];

type QueryVars = {
  page: number;
  perPage: number;
  sort: SortOptions;
  gitPOAPId: number;
};

export const GitPOAPHolders = ({ gitPOAPId }: Props) => {
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 24,
    sort: 'claim-count',
    gitPOAPId,
  });
  const [holders, handlers] = useListState<Holder>([]);
  const [result] = useGitPoapHoldersQuery({ variables });

  const gitPOAPHolders = result?.data?.gitPOAPHolders;
  const total = gitPOAPHolders?.totalHolders;
  const queryVariables = result.operation?.variables;

  /* Hook to clear list of holders when the gitPOAPId changes */
  useEffect(() => {
    handlers.setState([]);
    setVariables({
      page: 1,
      perPage: 24,
      sort: 'claim-count',
      gitPOAPId,
    });
  }, [gitPOAPId]);

  /* Hook to append new data onto existing list of holders */
  useEffect(() => {
    const resultPage = queryVariables?.page;
    if (gitPOAPHolders) {
      const newHolders: Holder[] = gitPOAPHolders.holders.map((h) => ({
        ...h,
        ensName: h.ensName ?? null,
        ensAvatarUrl: h.ensAvatarImageUrl ?? null,
      }));

      if (resultPage === 1) {
        handlers.setState(newHolders);
      } else {
        handlers.append(...newHolders);
      }
    }
  }, [gitPOAPHolders, queryVariables]);

  if (result.error) {
    return null;
  }

  return (
    <StyledItemList
      title={`${total ?? ''} holders`}
      selectOptions={selectOptions}
      selectValue={variables.sort}
      onSelectChange={(sortValue) => {
        if (sortValue !== variables.sort) {
          setVariables({
            ...variables,
            sort: sortValue as SortOptions,
            page: 1,
          });
        }
      }}
      isLoading={result.fetching}
      hasShowMoreButton={!!total && holders.length < total}
      showMoreOnClick={() => {
        if (!result.fetching) {
          setVariables({
            ...variables,
            page: variables.page + 1,
          });
        }
      }}
    >
      {total ? (
        <Group mb={rem(50)} mt={rem(40)} spacing={0} position="center">
          <HoldersWrapper>
            {holders.map((holder: Holder) => (
              <Group key={`${holder.githubHandle}-${holder.address}`}>
                <InfoHexSummary
                  address={holder.address}
                  bio={holder.bio}
                  gitpoapId={gitPOAPId}
                  twitterHandle={holder.twitterHandle}
                  personalSiteUrl={holder.personalSiteUrl}
                  numGitPOAPs={holder.gitPOAPCount}
                  ensAvatarUrl={holder.ensAvatarUrl}
                  ensName={holder.ensName}
                />
              </Group>
            ))}
          </HoldersWrapper>
        </Group>
      ) : (
        <EmptyState icon={<FaUsers color={TextDarkGray} size={rem(74)} />}>
          <Text style={{ marginTop: rem(20) }}>{'No one has minted this GitPOAP'}</Text>
        </EmptyState>
      )}
    </StyledItemList>
  );
};
