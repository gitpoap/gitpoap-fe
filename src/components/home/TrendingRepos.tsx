import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { TrendingRepoItem } from './TrendingRepoItem';
import { useTrendingReposQuery } from '../../graphql/generated-gql';

const NUM_DAYS = 30;

const Container = styled.div`
  padding: 0 ${rem(10)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    align-items: center;
    padding: 0;
    max-width: 100%;
  }
`;

const List = styled.div`
  margin-top: ${rem(30)};
  margin-bottom: ${rem(30)};
`;

export const TrendingRepos = () => {
  const [result] = useTrendingReposQuery({
    variables: {
      count: 4,
      numDays: NUM_DAYS,
    },
  });

  const trendingRepos = result?.data?.trendingRepos;

  return (
    <Container>
      <Header>{'Trending repos'}</Header>

      <List>
        {trendingRepos &&
          trendingRepos.map((repo, index) => (
            <TrendingRepoItem
              key={repo.id}
              repoId={repo.id}
              index={index + 1}
              claimedCount={repo.mintedGitPOAPCount}
              numDays={NUM_DAYS}
            />
          ))}
      </List>
    </Container>
  );
};
