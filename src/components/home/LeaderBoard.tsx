import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useLeadersQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { LeaderBoardItem } from './LeaderBoardItem';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }
`;

const HeaderStyled = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(48)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    font-size: ${rem(48)};
    margin: auto;
  }
`;

const List = styled.div`
  margin-top: ${rem(30)};
`;

export const LeaderBoard = () => {
  const [result] = useLeadersQuery({
    variables: {
      count: 6,
    },
  });

  return (
    <Wrapper>
      <HeaderStyled>{'Most honored contributors'}</HeaderStyled>
      <List>
        {result.data?.mostHonoredContributors.map((item) => (
          <LeaderBoardItem key={item.profile.id} {...item} />
        ))}
      </List>
    </Wrapper>
  );
};
