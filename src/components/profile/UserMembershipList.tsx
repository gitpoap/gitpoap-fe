import React from 'react';
import { rem } from 'polished';
import { Group, Stack, Text, Table, Button } from '@mantine/core';
import { useUserMembershipsQuery } from '../../graphql/generated-gql';
import { Header, Divider } from '../shared/elements';
import { TableHeaderItem } from '../gitpoap/manage/TableHeaderItem';
import { UserMembershipRow } from './UserMembershipRow';
import { BackgroundPanel } from '../../colors';

const HEADERS: {
  label: string;
  key: string;
  isSortable: boolean;
}[] = [
  { label: 'Status', key: 'status', isSortable: false },
  { label: 'Team', key: 'team', isSortable: false },
  { label: 'Role', key: 'role', isSortable: false },
  { label: 'Joined On', key: 'joinedOn', isSortable: false },
  { label: 'Actions', key: 'actions', isSortable: false },
];

export const UserMembershipList = () => {
  const [result] = useUserMembershipsQuery();

  const memberships = result.data?.userMemberships?.memberships ?? null;

  if (result.error) {
    return (
      <Group position="center" py={0} px={rem(20)}>
        <Stack align="center" justify="flex-start" spacing="sm" style={{ width: '100%' }}>
          <Group position="apart" align="center" grow style={{ width: '100%' }}>
            <Header style={{ alignSelf: 'start' }}>{'My Memberships'}</Header>
          </Group>
          <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
          <Text my={rem(20)} size={18}>
            {result.error.message.replace('[GraphQL] ', '')}
          </Text>
        </Stack>
      </Group>
    );
  }

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="center" justify="flex-start" spacing="sm" style={{ width: '100%' }}>
        <Group position="apart" align="center" grow style={{ width: '100%' }}>
          <Header style={{ alignSelf: 'start' }}>{'My Memberships'}</Header>
        </Group>
        <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
        {!result.fetching && memberships && memberships.length === 0 && (
          <Button>{'+ Create Team'}</Button>
        )}
        {!result.fetching && memberships && memberships.length > 0 && (
          <Stack
            align="center"
            justify="flex-start"
            spacing="sm"
            py={0}
            sx={{
              background: BackgroundPanel,
              borderRadius: `${rem(6)} ${rem(6)} 0 0`,
              width: '100%',
            }}
          >
            <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs" fontSize="sm">
              <thead>
                <tr>
                  {HEADERS.map((header, i) => (
                    <TableHeaderItem
                      key={`header-${i}`}
                      isSortable={header.isSortable}
                      isSorted={false}
                      isReversed={false}
                    >
                      {header.label}
                    </TableHeaderItem>
                  ))}
                </tr>
              </thead>
              <tbody>
                {memberships &&
                  memberships.length > 0 &&
                  memberships.map((membership) => {
                    return <UserMembershipRow key={membership.id} membership={membership} />;
                  })}
              </tbody>
            </Table>
          </Stack>
        )}
      </Stack>
    </Group>
  );
};