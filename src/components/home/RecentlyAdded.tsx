import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaArrowRight } from 'react-icons/fa';
import { FaQuestion } from 'react-icons/fa';
import { RepoHexSmall as RepoHexSmallUI } from '../shared/compounds/RepoHexSmall';
import { Header as HeaderUI } from '../shared/elements/Header';
import { Button } from '../shared/elements/Button';
import { TextGray, TextLight } from '../../colors';
import { RecentlyAddedPopover } from './RecentlyAddedPopover';
import { useRecentReposQuery } from '../../graphql/generated-gql';
import { Link } from '../Link';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${rem(10)};
`;

const Repos = styled.div`
  display: inline-flex;
  flex-direction: row;
  max-width: ${rem(1200)};
  flex-wrap: wrap;
  margin-top: ${rem(50)};
  margin-bottom: ${rem(20)};
`;

const RepoHexSmall = styled(RepoHexSmallUI)`
  margin-right: ${rem(40)};
  margin-bottom: ${rem(35)};
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

export const RecentlyAdded = () => {
  const [result] = useRecentReposQuery({
    variables: {
      count: 15,
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
      <Repos>
        {result.data?.recentlyAddedProjects.map((repo) => {
          return (
            <RepoHexSmall
              key={repo.id}
              category={repo.organization.name}
              name={repo.name}
              repoId={repo.id}
            />
          );
        })}
      </Repos>
      <Link href="/repos" passHref>
        <Button variant="outline" rightIcon={<FaArrowRight />}>
          {'All Repos'}
        </Button>
      </Link>
    </Container>
  );
};
