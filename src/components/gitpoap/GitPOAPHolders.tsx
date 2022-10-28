import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import styled from 'styled-components';
import { Grid, Group } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { GitPoapHoldersQueryVariables, useGitPoapHoldersQuery } from '../../graphql/generated-gql';
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
  ensName: string | null;
  ensAvatarUrl: string | null;
};

const StyledItemList = styled(ItemList)`
  margin-bottom: ${rem(50)};
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

  // Assert type until following issue is resolved:
  // https://github.com/dotansimha/graphql-code-generator/issues/7976
  const queryVariables = result.operation?.variables as GitPoapHoldersQueryVariables | undefined;

  /* Hook to clear list of holders when the gitPOAPId changes */
  useEffect(() => {
    handlers.setState([]);
    setVariables({
      ...variables,
      page: 1,
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
        <Grid align="center">
          {holders.map((holder: Holder) => (
            <Grid.Col key={`${holder.githubHandle}-${holder.address}`} sm={6} md={4} lg={3} xl={2}>
              <Group position="center">
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
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <EmptyState icon={<FaUsers color={TextDarkGray} size={rem(74)} />}>
          <Text style={{ marginTop: rem(20) }}>{'No one has minted this GitPOAP'}</Text>
        </EmptyState>
      )}
    </StyledItemList>
  );
};
