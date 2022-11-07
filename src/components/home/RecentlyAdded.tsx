import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaArrowRight } from 'react-icons/fa';
import { RepoHexSmall as RepoHexSmallUI } from '../shared/compounds/RepoHexSmall';
import { RepoListSmall } from '../shared/compounds/RepoList';
import { Header as HeaderUI } from '../shared/elements/Header';
import { Button } from '../shared/elements/Button';
import { useRecentReposQuery } from '../../graphql/generated-gql';
import { BREAKPOINTS } from '../../constants';
import { Link } from '../shared/compounds/Link';

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

const RepoHexSmall = styled(RepoHexSmallUI)`
  min-width: unset;
  width: unset;
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
      count: 14,
    },
  });

  return (
    <Container>
      <Header>{'Recently added repos'}</Header>
      <RepoListSmall>
        {result.data?.recentlyAddedRepos.map((repo) => {
          return <RepoHexSmall key={repo.id} orgName={repo.organization.name} name={repo.name} />;
        })}
      </RepoListSmall>
      <StyledLink href="/repos" passHref>
        <Button variant="outline" rightIcon={<FaArrowRight />}>
          {'All Repos'}
        </Button>
      </StyledLink>
    </Container>
  );
};
