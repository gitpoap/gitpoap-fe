import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { ProjectHex } from './ProjectHex';
import { OrganizationReposQuery, useOrganizationReposQuery } from '../../graphql/generated-gql';

type SortOptions = 'alphabetical' | 'date' | 'contributor-count' | 'minted-count';
export type ProjectResponse = Exclude<
  OrganizationReposQuery['organizationRepos'],
  null | undefined
>[number];

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'date', label: 'Creation Date' },
  { value: 'contributor-count', label: 'Contributor Count' },
  { value: 'minted-count', label: 'Minted Count' },
];

const GitPOAPList = styled.div`
  display: grid;
  column-gap: ${rem(30)};
  row-gap: ${rem(32)};
  grid-template-columns: repeat(auto-fill, ${rem(280)});
  justify-content: center;
  align-content: center;

  margin: ${rem(50)} 0;
  align-items: flex-start;
`;

type Props = {
  orgId: number;
};

export const ProjectList = ({ orgId }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('alphabetical');
  const [repoItems, setRepoItems] = useState<ProjectResponse[]>([]);
  const [total, setTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState('');
  const perPage = 10;

  const [result] = useOrganizationReposQuery({
    variables: {
      orgId,
      page,
      perPage,
      sort,
    },
  });

  /* If the address of the profile being looked at changes, clear the data we've saved */
  useEffect(() => {
    setRepoItems([]);
  }, []);

  /* Hook to append new data onto existing list of gitPOAPs */
  useEffect(() => {
    setRepoItems((prev: ProjectResponse[]) => {
      if (result.data?.organizationRepos) {
        return [...prev, ...result.data.organizationRepos];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to set total number of GitPOAPs */
  useEffect(() => {
    if (result.data?.organizationRepos) {
      setTotal(result.data.organizationRepos.length);
    }
  }, [result.data]);

  if (result.error) {
    return null;
  }

  return (
    <ItemList
      title={`Projects: ` + total}
      selectOptions={selectOptions}
      selectValue={sort}
      onSelectChange={(sortValue) => {
        if (sortValue !== sort) {
          setSort(sortValue as SortOptions);
          setRepoItems([]);
          setPage(1);
        }
      }}
      isLoading={result.fetching}
      hasShowMoreButton={!!total && repoItems.length < total && repoItems.length > 0}
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
        {/* {result.operation && repoItems.length === 0 && (
            <EmptyState icon={<FaTrophy color={TextDarkGray} size={rem(74)} />}>
              <a href={'https://gitpoap.io/discord'} target="_blank" rel="noopener noreferrer">
                <Title style={{ marginTop: rem(20) }}>
                  {'Get contributing! Head over to our Discord to get started.'}
                </Title>
              </a>
            </EmptyState>
          )} */}

        {/* Fully Claimed GitPOAPs rendered next */}
        {repoItems &&
          repoItems
            .filter((repoItem) => {
              if (searchValue) {
                return repoItem.name.toLowerCase().includes(searchValue.toLowerCase());
              }
              return true;
            })
            .map((repoItem, i) => {
              return <ProjectHex key={'repo-' + i} project={repoItem} />;
            })}
      </GitPOAPList>
    </ItemList>
  );
};
