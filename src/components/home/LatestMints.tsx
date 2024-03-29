import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useAdminClaimsQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { LatestMintItem } from './LatestMintItem';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    align-items: center;
  }
`;

const List = styled.div`
  margin-top: ${rem(30)};
`;

export const LatestMint = () => {
  const [result] = useAdminClaimsQuery({
    variables: {
      count: 8,
    },
  });

  return (
    <Wrapper>
      <Header>{'Latest mints'}</Header>
      <List>
        {result.data?.claims.map((item) => (
          <LatestMintItem key={item.id} {...item} />
        ))}
      </List>
    </Wrapper>
  );
};
