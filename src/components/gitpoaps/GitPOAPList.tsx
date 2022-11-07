import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaSearch } from 'react-icons/fa';
import { useDebouncedValue, useListState, useMediaQuery } from '@mantine/hooks';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { Header } from '../shared/elements/Header';
import { Input, Loader, TextSkeleton } from '../shared/elements';
import {
  useGitPoaPsWithClaimCountQuery,
  useTotalGitPoapCountQuery,
  GitPoaPsWithClaimCountQuery,
  useGitPoapSearchByNameQuery,
  SortOrder,
  GitPoapOrderByWithRelationInput,
} from '../../graphql/generated-gql';
import { GitPOAP, GitPOAPSkeleton } from '../shared/compounds/GitPOAP';

type SortOptions = 'count' | 'year';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'count', label: 'Popularity' },
  { value: 'year', label: 'Year' },
];

const operationMap: Record<SortOptions, GitPoapOrderByWithRelationInput> = {
  count: { claims: { _count: SortOrder.Desc } },
  year: { year: SortOrder.Asc },
};

const StyledHeader = styled(Header)`
  display: block;
  margin-bottom: ${rem(40)};
  max-width: 100%;
`;

const HeaderSkeleton = styled(TextSkeleton)`
  display: block;
  margin-bottom: ${rem(40)};
  width: ${rem(280)};
  max-width: 100%;
`;

const Wrapper = styled.div`
  margin-top: ${rem(80)};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledItemList = styled(ItemList)`
  margin-bottom: ${rem(50)};
`;

const StyledSearch = styled(Input)`
  margin-bottom: ${rem(40)};
  width: ${rem(400)};
  max-width: 100%;
`;

export const GitPOAPListContainer = styled.div`
  display: grid;
  width: 100%;
  margin-top: ${rem(50)};
  margin-bottom: ${rem(55)};

  justify-content: center;
  align-content: center;
  align-items: flex-start;

  grid-template-columns: repeat(6, 1fr);
  column-gap: ${rem(20)};
  row-gap: ${rem(32)};

  @media (max-width: ${rem(1500)}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${rem(1000)}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${rem(750)}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${rem(500)}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export type GitPOAP = Exclude<GitPoaPsWithClaimCountQuery['gitPOAPS'], undefined | null>[number];

type QueryVars = {
  page: number;
  perPage: number;
  sort: SortOptions;
};

export const GitPOAPList = () => {
  const matchesBreakpointSm = useMediaQuery(`(max-width: ${rem(1000)})`, true);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 36,
    sort: 'count',
  });
  const [gitPOAPListItems, handlers] = useListState<GitPOAP>([]);
  const [result] = useGitPoaPsWithClaimCountQuery({
    variables: {
      take: variables.perPage,
      skip: (variables.page - 1) * variables.perPage,
      orderBy: operationMap[variables.sort],
    },
  });
  const [searchResult] = useGitPoapSearchByNameQuery({
    variables: { search: debouncedSearch, take: 20 },
  });
  const [totalResult] = useTotalGitPoapCountQuery({});
  const total = totalResult.data?.aggregateGitPOAP._count?.id;
  const allGitPOAPs = result.data?.gitPOAPS;
  const queryVariables = result.operation?.variables;
  const size = matchesBreakpointSm ? 'sm' : 'md';

  /* Hook to append new data onto existing list of GitPOAPs */
  useEffect(() => {
    const resultsSkip = queryVariables?.skip;
    if (allGitPOAPs) {
      const newGitPOAPListItems = allGitPOAPs;
      if (resultsSkip === 0) {
        handlers.setState(newGitPOAPListItems);
      } else {
        handlers.append(...newGitPOAPListItems);
      }
    }
    /* Do not include handlers below */
  }, [allGitPOAPs, queryVariables]);

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      {total ? (
        <StyledHeader>{`${total} GitPOAPs`}</StyledHeader>
      ) : (
        <HeaderSkeleton height={rem(48)} />
      )}
      <StyledSearch
        style={{ marginBottom: rem(40), width: rem(400) }}
        placeholder={'SEARCH FOR A GITPOAP...'}
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        icon={searchResult.fetching ? <Loader size={18} /> : <FaSearch />}
      />
      <StyledItemList
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
        hasShowMoreButton={
          !!total &&
          gitPOAPListItems.length < total &&
          gitPOAPListItems.length > 0 &&
          searchValue.length === 0
        }
        showMoreOnClick={() => {
          if (!result.fetching) {
            setVariables({
              ...variables,
              page: variables.page + 1,
            });
          }
        }}
      >
        <GitPOAPListContainer>
          <>
            {result.fetching && !result.operation && gitPOAPListItems.length === 0 && (
              <>
                {[...Array(variables.perPage)].map((_, i) => (
                  <GitPOAPSkeleton key={i} />
                ))}
              </>
            )}
            {searchResult.data?.gitPOAPS && searchValue
              ? searchResult.data.gitPOAPS.map((gitPOAP, i) => {
                  return (
                    <GitPOAP
                      key={i}
                      gitPOAPId={gitPOAP.id}
                      name={gitPOAP.name}
                      imgSrc={gitPOAP.imageUrl}
                      size={size}
                      repoName={gitPOAP.project?.repos[0]?.name}
                      orgName={gitPOAP.project?.repos[0]?.organization.name}
                    />
                  );
                })
              : gitPOAPListItems?.map((gitPOAP, i) => {
                  return (
                    <GitPOAP
                      key={i}
                      gitPOAPId={gitPOAP.id}
                      name={gitPOAP.name}
                      imgSrc={gitPOAP.imageUrl}
                      size={size}
                      repoName={gitPOAP.project?.repos[0]?.name}
                      orgName={gitPOAP.project?.repos[0]?.organization.name}
                    />
                  );
                })}
          </>
        </GitPOAPListContainer>
      </StyledItemList>
    </Wrapper>
  );
};
