import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useMediaQuery } from '@mantine/hooks';
import { Header } from '../shared/elements/Header';
import { POAPList } from '../shared/compounds/POAPList';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useFeatures } from '../FeaturesContext';
import { BREAKPOINTS } from '../../constants';
import { TrendingProjectItem } from './TrendingProjectItem';
import { useMostClaimedGitPoapsQuery, useAllReposQuery } from '../../graphql/generated-gql';

const Container = styled.div`
  padding: ${rem(10)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    align-items: center;
    padding: 0;
    max-width: 100%;
  }
`;

const Poaps = styled(POAPList)`
  max-width: ${rem(1000)};
  margin-top: ${rem(50)};
  margin-bottom: ${rem(25)};
`;

const List = styled.div`
  margin-top: ${rem(30)};
`;

export const TrendingProject = () => {
  const { hasGitPOAPsPage } = useFeatures();
  const matchesBreakpointSm = useMediaQuery(`(min-width: ${rem(BREAKPOINTS.sm)})`, false);
  const [result] = useAllReposQuery({
    variables: {
      count: 10,
    },
  });

  const repos = result?.data?.repos;

  return (
    <Container>
      <Header>{'Trending projects'}</Header>

      <List>
        {repos && repos.map((repo) => <TrendingProjectItem key={repo.id} repoId={repo.id} />)}
      </List>

      {hasGitPOAPsPage && (
        <Button variant="outline" rightIcon={<FaArrowRight />}>
          {'More Trending Projects'}
        </Button>
      )}
    </Container>
  );
};
