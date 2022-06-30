import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { MdEmojiPeople } from 'react-icons/md';
import { Group } from '@mantine/core';
import { Header, InfoHexBase, Text as TextUI } from '../shared/elements';
import { BREAKPOINTS } from '../../constants';
import { LeaderBoardItem } from '../home/LeaderBoardItem';
import { useRepoLeadersQuery } from '../../graphql/generated-gql';
import { TextDarkGray } from '../../colors';

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

type EmptyStateProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export const EmptyState = ({ children, icon }: EmptyStateProps) => {
  return (
    <Group
      direction="column"
      position="center"
      align="center"
      grow
      style={{ padding: rem(30), flex: '1' }}
    >
      {icon && icon}
      {children}
    </Group>
  );
};

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

  const contributors = result.data?.repoMostHonoredContributors;

  return (
    <Wrapper>
      <Content>
        <HeaderStyled>{'Top contributors'}</HeaderStyled>
        <List>
          {contributors && contributors?.length > 0 ? (
            contributors.map((contributor) => {
              return <LeaderBoardItem key={contributor.profile.id} {...contributor} />;
            })
          ) : (
            <EmptyState icon={<MdEmojiPeople color={TextDarkGray} size={rem(74)} />}>
              <TextUI style={{ marginTop: rem(20) }}>{`Nobody's here yet..`}</TextUI>
            </EmptyState>
          )}
        </List>
      </Content>
    </Wrapper>
  );
};
