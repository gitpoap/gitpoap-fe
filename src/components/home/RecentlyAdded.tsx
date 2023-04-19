import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaArrowRight } from 'react-icons/fa';
import { RepoList } from '../shared/compounds/RepoList';
import { Header as HeaderUI } from '../shared/elements/Header';
import { Button } from '../shared/elements/Button';
import { useRecentReposQuery } from '../../graphql/generated-gql';
import { BREAKPOINTS } from '../../constants';
import { Link } from '../shared/compounds/Link';
import { RepoBlock } from '../shared/compounds/RepoBlock';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: ${rem(10)};
  @media (max-width: ${BREAKPOINTS.md}px) {
    padding: 0;
  }
`;

const Header = styled(HeaderUI)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: auto;
  }
`;

export const RecentlyAdded = () => {
  const [result] = useRecentReposQuery({
    variables: {
      count: 12,
    },
  });

  return (
    <Container>
      <Header>{'Recently added repos'}</Header>
      <RepoList>
        {result.data?.recentlyAddedRepos.map((repo) => {
          return <RepoBlock key={repo.id} repo={repo} />;
        })}
      </RepoList>
      <StyledLink href="/repos" passHref>
        <Button variant="outline" rightIcon={<FaArrowRight />}>
          {'All Repos'}
        </Button>
      </StyledLink>
    </Container>
  );
};
