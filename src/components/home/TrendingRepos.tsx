import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { useTrendingReposQuery } from '../../graphql/generated-gql';
import { TrendingRepoBlock } from './TrendingRepoBlock';
import { Stack } from '@mantine/core';

const NUM_DAYS = 7;

const Container = styled.div`
  padding: 0 ${rem(10)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    align-items: center;
    padding: 0;
    max-width: 100%;
  }
`;

const List = styled(Stack)`
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
        {trendingRepos?.map((repo, i) => (
          <TrendingRepoBlock
            index={i + 1}
            key={repo.id}
            repoId={repo.id}
            claimedCount={repo.mintedGitPOAPCount}
            numDays={NUM_DAYS}
          />
        ))}
      </List>
    </Container>
  );
};
