import { Group, Text, Card, ActionIcon, Center, Overlay, Container, Menu } from '@mantine/core';
import { rem } from 'polished';
import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { BackgroundPanel, BackgroundPanel2 } from '../../../../colors';

import { UserGitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { GitPOAPBadge } from '../../../shared/elements';

type Props = {
  gitPOAPRequests: Exclude<UserGitPoapRequestsQuery['gitPOAPRequests'], null | undefined>;
};

export const TeamGitPOAPsGrid = ({ gitPOAPRequests }: Props) => {
  return (
    <Group position="left">
      {gitPOAPRequests &&
        gitPOAPRequests.length > 0 &&
        gitPOAPRequests.map((gitPOAPRequest) => (
          <Card
            key={gitPOAPRequest.id}
            sx={{
              cursor: 'pointer',
              width: rem(250),
              '&:hover .mantine-ActionIcon-root': {
                opacity: 1,
              },
              '&:hover .mantine-Overlay-root': {
                opacity: 0.6,
              },
            }}
            p={0}
          >
            <Center p={16} sx={{ position: 'relative' }}>
              <Overlay
                color={BackgroundPanel2}
                p={4}
                sx={{ opacity: 0, transition: '150ms opacity ease' }}
              />
              <Menu position="right" withinPortal>
                <Menu.Target>
                  <ActionIcon
                    sx={{
                      position: 'absolute',
                      right: rem(4),
                      top: rem(4),
                      '&:hover': { background: BackgroundPanel },
                      zIndex: 1000,
                      opacity: 0,
                      transition: '150ms opacity ease',
                    }}
                  >
                    <MdMoreHoriz size={rem(20)} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Share</Menu.Item>
                  <Menu.Item>Edit</Menu.Item>
                  <Menu.Item>Details</Menu.Item>
                  <Menu.Item>Contributors</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <GitPOAPBadge
                imgUrl={gitPOAPRequest.imageUrl}
                altText={gitPOAPRequest.name}
                size="md"
                onClick={() => {}}
              />
            </Center>
            <Container p={16}>
              <Text>{gitPOAPRequest.name}</Text>
              <RequestStatusBadge status={gitPOAPRequest.staffApprovalStatus} />
            </Container>
          </Card>
        ))}
    </Group>
  );
};
