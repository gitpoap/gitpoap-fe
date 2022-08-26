import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useMediaQuery } from '@mantine/hooks';
import { Header } from '../shared/elements/Header';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useFeatures } from '../FeaturesContext';
import { BREAKPOINTS } from '../../constants';
import { TrendingProjectItem } from './TrendingProjectItem';
import { useTrendingReposQuery } from '../../graphql/generated-gql';

const NUM_DAYS = 30;

const Container = styled.div`
  padding: ${rem(10)};

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

export const TrendingProject = () => {
  const { hasTrendingReposPage } = useFeatures();
  const [result] = useTrendingReposQuery({
    variables: {
      count: 5,
      numDays: NUM_DAYS,
    },
  });

  const trendingRepos = result?.data?.trendingRepos;

  return (
    <Container>
      <Header>{'Trending projects'}</Header>

      <List>
        {trendingRepos &&
          trendingRepos.map((repo, index) => (
            <TrendingProjectItem
              key={repo.id}
              repoId={repo.id}
              index={index + 1}
              claimedCount={repo.mintedGitPOAPCount}
              numDays={NUM_DAYS}
            />
          ))}
      </List>

      {hasTrendingReposPage && (
        <Button variant="outline" rightIcon={<FaArrowRight />}>
          {'More Trending Projects'}
        </Button>
      )}
    </Container>
  );
};
