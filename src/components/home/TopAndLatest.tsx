import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useAdminClaimsQuery, useMostClaimedGitPoapsQuery } from '../../graphql/generated-gql';
import { Header } from '../shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { Button, Group, ScrollArea, Tabs } from '@mantine/core';
import { TopMintItem } from './TopMintItem';
import { LatestMintItem } from './LatestMintItem';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }
`;

const List = styled.div`
  // margin-top: ${rem(30)};
`;

export const TopAndLatestMints = () => {
  const [resultMost] = useMostClaimedGitPoapsQuery({
    variables: {
      count: 10,
    },
  });
  const [resultLatest] = useAdminClaimsQuery({
    variables: {
      count: 10,
    },
  });

  return (
    <Wrapper>
      <Tabs defaultValue="latest">
        <Tabs.List sx={{ alignItems: 'center' }}>
          <Tabs.Tab value="latest">
            <Header>Latest Mints</Header>
          </Tabs.Tab>
          <Tabs.Tab ml="xl" value="top">
            <Header>Top GitPOAPs</Header>
          </Tabs.Tab>
          <Button variant="outline" sx={{ marginLeft: 'auto', marginRight: rem(16) }}>
            View More
          </Button>
        </Tabs.List>
        <Tabs.Panel value="top">
          {resultMost.data?.mostClaimedGitPOAPs && (
            <ScrollArea type="auto">
              <Group spacing={48} noWrap>
                <List>
                  {resultMost.data?.mostClaimedGitPOAPs.slice(0, 5).map((item, i) => (
                    <TopMintItem key={item.gitPOAP.id} index={i + 1} {...item} />
                  ))}
                </List>
                <List>
                  {resultMost.data?.mostClaimedGitPOAPs.slice(5).map((item, i) => (
                    <TopMintItem key={item.gitPOAP.id} index={i + 6} {...item} />
                  ))}
                </List>
              </Group>
            </ScrollArea>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="latest">
          <ScrollArea type="auto">
            <Group spacing={48} noWrap>
              <List>
                {resultLatest.data?.claims.slice(0, 5).map((item, i) => (
                  <LatestMintItem key={item.id} index={i + 1} {...item} />
                ))}
              </List>
              <List>
                {resultLatest.data?.claims.slice(5).map((item, i) => (
                  <LatestMintItem key={item.id} index={i + 6} {...item} />
                ))}
              </List>
            </Group>
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Wrapper>
  );
};
