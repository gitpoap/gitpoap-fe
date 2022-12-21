import React, { useState, useCallback } from 'react';
import { Group, Stack, Table, ScrollArea, Pagination } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { rem } from 'polished';

import { Select } from '../../../shared/elements/Select';
import { Header } from '../../../shared/elements/Header';
import { TableHeaderItem } from '../../../gitpoap/manage/TableHeaderItem';
import { BackgroundPanel, TextGray } from '../../../../colors';
import { BREAKPOINTS } from '../../../../constants';
import { Divider, Button, Text } from '../../../shared/elements';
import { MembershipRow } from './MembershipRow';
import { AddMemberModal } from './AddMemberModal';

import { useTeamMembershipsQuery } from '../../../../graphql/generated-gql';

const HEADERS: {
  label: string;
  key: string;
  isSortable: boolean;
}[] = [
  { label: 'Status', key: 'status', isSortable: false },
  { label: 'Address', key: 'address', isSortable: false },
  { label: 'Role', key: 'role', isSortable: false },
  { label: 'Joined On', key: 'joinedOn', isSortable: false },
  { label: 'Creation Date', key: 'createdAt', isSortable: false },
];

type QueryVars = {
  page: number;
  perPage: number;
};

type SelectOption<T = string> = { value: T; label: string };
type SortOptions = 'acceptance_status' | 'date' | 'role';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'acceptance_status', label: 'STATUS' },
  { value: 'date', label: 'DATE' },
  { value: 'role', label: 'ROLE' },
];

type Props = {
  teamId: number;
};

export const MembersList = ({ teamId }: Props) => {
  const [isAddModalOpen, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [sortBy, setSortBy] = useState<SortOptions>('date');

  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
  });

  const [result] = useTeamMembershipsQuery({
    variables: {
      teamId,
      page: variables.page,
      perPage: variables.perPage,
      sort: sortBy,
    },
  });

  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.lg)})`, false);

  const teamMemberships = result.data ? result.data.teamMemberships : null;
  const memberships = teamMemberships ? teamMemberships.memberships : null;
  const totalCount = teamMemberships ? teamMemberships.total : 0;
  const totalPages = Math.floor(totalCount / variables.perPage + 1);

  const handlePageChange = useCallback(
    (page: number) =>
      setVariables((variables) => ({
        ...variables,
        page,
      })),
    [],
  );

  const onSelectChange = (sortValue: SortOptions) => {
    if (sortValue !== sortBy) {
      setSortBy(sortValue as SortOptions);
    }
  };

  if (result.error) {
    return (
      <Stack align="center" justify="flex-start" spacing="sm" mt={rem(50)}>
        <Text size="lg">{result.error.message}</Text>
      </Stack>
    );
  }

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="center" justify="flex-start" spacing="sm" style={{ width: '100%' }}>
        <Group position="apart" align="center" grow style={{ width: '100%' }}>
          <Header style={{ alignSelf: 'start' }}>{'[Team name] Members'}</Header>
          <Group position="right" spacing="lg">
            {!matchesBreakpointSmall && (
              <Text color={TextGray} transform="uppercase">
                {'Sort By: '}
              </Text>
            )}
            <Select data={selectOptions} value={sortBy} onChange={onSelectChange} />
            <Button onClick={openAddModal}>{'Add new member'}</Button>
          </Group>
        </Group>
        <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
        {totalCount === 0 ? (
          <Stack align="center" justify="flex-start" spacing="sm" mt={rem(50)}>
            <Text size="lg">{'No members in this team'}</Text>
          </Stack>
        ) : (
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
            <ScrollArea style={{ width: '100%' }}>
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
                      return <MembershipRow key={membership.id} membership={membership} />;
                    })}
                </tbody>
              </Table>
            </ScrollArea>
            {totalCount > variables.perPage && (
              <Pagination
                page={variables.page}
                onChange={handlePageChange}
                total={totalPages}
                mt={rem(20)}
              />
            )}
          </Stack>
        )}
      </Stack>
      <AddMemberModal teamId={teamId} isOpen={isAddModalOpen} onClose={closeAddModal} />
    </Group>
  );
};
