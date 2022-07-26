import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { RepoList as RepoListContainer } from '../../shared/compounds/RepoList';
import { RepoHex, RepoHexSkeleton } from '../../repos/RepoHex';
import { useRepoSearchByNameQuery } from '../../../graphql/generated-gql';
import { SearchResultList } from './SearchResultList';

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  className?: string;
  searchQuery: string;
};

export const RepoResults = ({ searchQuery }: Props) => {
  const [result] = useRepoSearchByNameQuery({ variables: { search: searchQuery, take: 8 } });

  const repos = result.data?.repos;

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      <SearchResultList title={`${repos?.length ?? ''} repos`}>
        <RepoListContainer>
          {result.fetching && !result.operation && repos && repos.length === 0 && (
            <>
              {[...Array(4)].map((_, i) => (
                <RepoHexSkeleton key={i} />
              ))}
            </>
          )}
          {repos &&
            repos.map((repo, i) => {
              return <RepoHex key={'repo-' + i} repo={repo} />;
            })}
        </RepoListContainer>
      </SearchResultList>
    </Wrapper>
  );
};
