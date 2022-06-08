import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { InfoHexBase } from '../shared/elements/InfoHexBase';
import { LeaderBoardItem } from '../home/LeaderBoardItem';
import { useRepoLeadersQuery } from '../../graphql/generated-gql';
import { Button } from '@mantine/core';
import { AllContributorsModal } from './AllContributorsModal';
import { TextGray } from '../../colors';

const Wrapper = styled(InfoHexBase)`
  display: inline-flex;
  flex-direction: column;
  width: ${rem(348)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }
`;

const Content = styled.div`
  padding: ${rem(13)} ${rem(18)};
  text-align: center;
`;

const HeaderStyled = styled(Header)`
  display: block;
  width: 100%;
  text-align: center;
  font-size: ${rem(30)};
  line-height: ${rem(48)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    font-size: ${rem(48)};
  }
`;

const List = styled.div`
  margin-top: ${rem(30)};
  width: 100%;
`;

export type ProjectLeaderBoardProps = {
  repoId: number;
};

export const ProjectLeaderBoard = ({ repoId }: ProjectLeaderBoardProps) => {
  const [result] = useRepoLeadersQuery({
    variables: {
      count: 6,
      repoId: repoId,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Content>
        <HeaderStyled>{'Top contributors'}</HeaderStyled>
        <List>
          {result.data?.repoMostHonoredContributors.map((item) => (
            <LeaderBoardItem key={item.profile.id} {...item} />
          ))}
        </List>
        <Button
          style={{
            marginTop: rem(30),
          }}
          onClick={() => setIsOpen(true)}
        >
          View All
        </Button>
      </Content>
      <AllContributorsModal repoId={repoId} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Wrapper>
  );
};
