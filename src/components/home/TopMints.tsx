import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useMostClaimedGitPoapsQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { Group } from '@mantine/core';
import { TopMintItem } from './TopMintItem';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }
`;

const List = styled.div`
  margin-top: ${rem(30)};
`;

export const TopMints = () => {
  const [result] = useMostClaimedGitPoapsQuery({
    variables: {
      count: 10,
    },
  });

  return (
    <Wrapper>
      <Header>{'Top mints'}</Header>
      {result.data?.mostClaimedGitPOAPs && (
        <Group spacing={48}>
          <List>
            {result.data?.mostClaimedGitPOAPs.slice(0, 5).map((item, i) => (
              <TopMintItem key={item.gitPOAP.id} index={i + 1} {...item} />
            ))}
          </List>
          <List>
            {result.data?.mostClaimedGitPOAPs.slice(5).map((item, i) => (
              <TopMintItem key={item.gitPOAP.id} index={i + 6} {...item} />
            ))}
          </List>
        </Group>
      )}
    </Wrapper>
  );
};
