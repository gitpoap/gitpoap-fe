import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { InfoHexBase } from '../shared/elements/InfoHexBase';
import { LeaderBoardItem } from '../home/LeaderBoardItem';
import { useRepoLeadersQuery } from '../../graphql/generated-gql';

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

  return (
    <Wrapper>
      <Content>
        <HeaderStyled>{'Top contributors'}</HeaderStyled>
        <List>
          {result.data?.repoMostHonoredContributors.map((item) => (
            <LeaderBoardItem key={item.profile.id} {...item} />
          ))}
        </List>
      </Content>
    </Wrapper>
  );
};
