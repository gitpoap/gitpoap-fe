import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import styled from 'styled-components';
import { useListState } from '@mantine/hooks';
import { GitPoapHoldersQueryVariables, useGitPoapHoldersQuery } from '../../graphql/generated-gql';
import { InfoHexSummary } from './InfoHexSummary';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { Text } from '../shared/elements/Text';
import { TextDarkGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';

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
  ensAvatarUrl: string | null;
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

  @media (max-width: ${BREAKPOINTS.sm}px) {
    grid-template-columns: repeat(auto-fit, 48%);
    justify-content: center;
    column-gap: 4%;
  }
`;

const StyledInfoHexSummary = styled(InfoHexSummary)`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    min-width: unset;
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
    perPage: 20,
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
      page: 1,
      perPage: 20,
      sort: 'claim-count',
      gitPOAPId,
    });
  }, [gitPOAPId]);

  /* Hook to append new data onto existing list of holders */
  useEffect(() => {
    const resultPage = queryVariables?.page;
    if (gitPOAPHolders) {
      const newHolders = gitPOAPHolders.holders.map((h) => ({
        ...h,
        ensAvatarUrl: h.oldEnsAvatarImageUrl ?? null,
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
        <HoldersWrapper>
          {holders.map((holder: Holder) => (
            <StyledInfoHexSummary
              key={`${holder.githubHandle}-${holder.address}`}
              address={holder.address}
              bio={holder.bio}
              gitpoapId={gitPOAPId}
              twitterHandle={holder.twitterHandle}
              personalSiteUrl={holder.personalSiteUrl}
              numGitPOAPs={holder.gitPOAPCount}
              ensAvatarUrl={holder.ensAvatarUrl}
              ensName={null}
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
