import React, { useState, useCallback } from 'react';
import { Group, Stack, Table, Pagination } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { rem } from 'polished';
import { openConfirmModal } from '@mantine/modals';
import { Select } from '../../../shared/elements/Select';
import { Header } from '../../../shared/elements/Header';
import { TextGray } from '../../../../colors';
import { BREAKPOINTS } from '../../../../constants';
import { Divider, Button, Text } from '../../../shared/elements';
import { MembershipRow, Address } from './MembershipRow';
import { AddMemberModal } from './AddMemberModal';
import {
  useTeamMembershipsQuery,
  useRemoveMembershipMutation,
} from '../../../../graphql/generated-gql';
import { shortenAddress } from '../../../../helpers';
import { HeaderItem, TableHeaderItem, TableWrapper } from '../../../shared/elements/Table';

const HEADERS: HeaderItem[] = [
  { label: 'Status', key: 'status', isSortable: false },
  { label: 'Address', key: 'address', isSortable: false },
  { label: 'Role', key: 'role', isSortable: false },
  { label: 'Joined On', key: 'joinedOn', isSortable: false },
  { label: 'Actions', key: 'actions', isSortable: false },
];

type QueryVars = {
  page: number;
  perPage: number;
};

type SelectOption<T = string> = { value: T; label: string };
type SortOptions = 'acceptance_status' | 'joinedOn' | 'role';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'acceptance_status', label: 'STATUS' },
  { value: 'joinedOn', label: 'JOINED ON' },
  { value: 'role', label: 'ROLE' },
];

type Props = {
  teamId: number;
};

export const MembershipList = ({ teamId }: Props) => {
  const [isAddModalOpen, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [sortBy, setSortBy] = useState<SortOptions>('joinedOn');

  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
  });

  const [result, refetch] = useTeamMembershipsQuery({
    variables: {
      teamId,
      page: variables.page,
      perPage: variables.perPage,
      sort: sortBy,
    },
    pause: false,
    requestPolicy: 'network-only',
  });

  const [, removeMember] = useRemoveMembershipMutation();

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

  const openRemoveModal = (membershipId: number, address: Address) =>
    openConfirmModal({
      title: 'Remove member?',
      centered: true,
      children: (
        <Text size="sm">
          {`Are you sure you want to remove `}
          <b>{address.ensName ?? shortenAddress(address.ethAddress)}</b>
          {` from the team?`}
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await removeMember({
          membershipId,
        });
      },
    });

  if (result.error) {
    return (
      <Stack align="center" justify="flex-start" spacing="sm" mt={rem(50)}>
        <Text size="lg">{'Something went wrong!'}</Text>
      </Stack>
    );
  }

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="stretch" justify="flex-start" spacing="sm" style={{ width: '100%' }}>
        <Group position="apart" align="center" grow>
          <Header style={{ alignSelf: 'start' }}>{'Members'}</Header>
          <Group position="right" spacing="lg">
            {!matchesBreakpointSmall && (
              <Text color={TextGray} transform="uppercase">
                {'Sort By: '}
              </Text>
            )}
            <Select data={selectOptions} value={sortBy} onChange={onSelectChange} />
            <Button onClick={openAddModal}>{'+ Add members'}</Button>
          </Group>
        </Group>
        <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />

        <TableWrapper>
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
                  return (
                    <MembershipRow
                      key={membership.id}
                      teamId={teamId}
                      membership={membership}
                      openRemoveModal={openRemoveModal}
                    />
                  );
                })}
            </tbody>
          </Table>
        </TableWrapper>
        {totalCount > variables.perPage && (
          <Pagination
            page={variables.page}
            onChange={handlePageChange}
            total={totalPages}
            mt={rem(20)}
          />
        )}
      </Stack>
      <AddMemberModal
        teamId={teamId}
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        refetchMemberships={refetch}
      />
    </Group>
  );
};
