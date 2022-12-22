import { ActionIcon, Card, Center, Container, Menu, Overlay, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { BackgroundPanel, BackgroundPanel2 } from '../../../colors';
import { StaffApprovalStatus } from '../../../graphql/generated-gql';
import { RequestStatusBadge } from '../../request/RequestItem/RequestStatusBadge';
import { GitPOAPBadge } from '../../shared/elements';

type Props = {
  imageUrl: string;
  name: string;
  staffApprovalStatus: StaffApprovalStatus;
  href?: string;
};

export const GitPOAPCard = ({ imageUrl, name, staffApprovalStatus, href }: Props) => {
  const router = useRouter();
  return (
    <Card
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
      onClick={() => href && router.push(href)}
    >
      <Center p={16} sx={{ position: 'relative' }}>
        <Overlay
          color={BackgroundPanel2}
          p={4}
          sx={{ opacity: 0, transition: '150ms opacity ease' }}
        />
        <Menu position="right" withinPortal width={rem(100)}>
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
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <MdMoreHoriz size={rem(20)} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
          >
            {href && <Menu.Item onClick={() => router.push(href)}>View</Menu.Item>}
            {href && <Menu.Item onClick={() => href && router.push(href)}>Edit</Menu.Item>}
          </Menu.Dropdown>
        </Menu>
        <GitPOAPBadge imgUrl={imageUrl} altText={name} size="md" onClick={() => {}} />
      </Center>
      <Container p={16}>
        <Text lineClamp={3}>{name}</Text>
        <RequestStatusBadge status={staffApprovalStatus} />
      </Container>
    </Card>
  );
};
