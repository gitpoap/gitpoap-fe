import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { InfoHexBase } from '../shared/elements/InfoHexBase';
import { LeaderBoardItem } from '../home/LeaderBoardItem';

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

export type RepoLeaderBoardProps = {
  repoId: number;
};

export type LeaderBoardItemProps = {
  claimsCount: number;
  profile: {
    address: string;
    id: number;
  };
};

const RepoLeaderBoardQuery = gql`
  query RepoLeaderBoard($repoId: Float!) {
    repoMostHonoredContributors(count: 6, repoId: $repoId) {
      profile {
        address
        id
      }
      claimsCount
    }
  }
`;

export const RepoLeaderBoard = ({ repoId }: RepoLeaderBoardProps) => {
  const [result] = useQuery<{
    repoMostHonoredContributors: LeaderBoardItemProps[];
  }>({
    query: RepoLeaderBoardQuery,
    variables: {
      repoId,
    },
  });

  return (
    <Wrapper>
      <Content>
        <HeaderStyled>{'Top contributors'}</HeaderStyled>
        <List>
          {result.data?.repoMostHonoredContributors.map((item: LeaderBoardItemProps) => (
            <LeaderBoardItem key={item.profile.id} {...item} />
          ))}
        </List>
      </Content>
    </Wrapper>
  );
};
