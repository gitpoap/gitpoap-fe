import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useAdminClaimsQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { LatestMintItem } from './LatestMintItem';
import { Group } from '@mantine/core';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }
`;

const List = styled.div`
  // margin-top: ${rem(30)};
`;

export const LatestMint = () => {
  const [result] = useAdminClaimsQuery({
    variables: {
      count: 10,
    },
  });

  return (
    <Wrapper>
      <Header>{'Latest mints'}</Header>
      <Group spacing={48}>
        <List>
          {result.data?.claims.slice(0, 5).map((item, i) => (
            <LatestMintItem key={item.id} index={i + 1} {...item} />
          ))}
        </List>
        <List>
          {result.data?.claims.slice(5).map((item, i) => (
            <LatestMintItem key={item.id} index={i + 6} {...item} />
          ))}
        </List>
      </Group>
    </Wrapper>
  );
};
