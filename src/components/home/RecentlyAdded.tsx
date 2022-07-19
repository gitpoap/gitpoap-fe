import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaArrowRight } from 'react-icons/fa';
import { FaQuestion } from 'react-icons/fa';
import { RepoHexSmall as RepoHexSmallUI } from '../shared/compounds/RepoHexSmall';
import { RepoListSmall } from '../shared/compounds/RepoList';
import { Header as HeaderUI } from '../shared/elements/Header';
import { Button } from '../shared/elements/Button';
import { TextGray, TextLight } from '../../colors';
import { RecentlyAddedPopover } from './RecentlyAddedPopover';
import { useRecentReposQuery } from '../../graphql/generated-gql';
import { BREAKPOINTS } from '../../constants';
import { Link } from '../Link';

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

const Question = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: ${rem(25)};
  width: ${rem(25)};
  color: ${TextLight};
  padding: ${rem(6)};
  border: ${rem(2)} solid ${TextGray};
  margin-left: ${rem(10)};
  cursor: pointer;
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
  const [isOpen, setIsOpen] = useState(false);
  const displayPopover = false;

  return (
    <Container>
      <Header>
        {'Recently added repos'}
        {displayPopover && (
          <RecentlyAddedPopover
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            target={
              <Question onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <FaQuestion />
              </Question>
            }
          />
        )}
      </Header>
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
