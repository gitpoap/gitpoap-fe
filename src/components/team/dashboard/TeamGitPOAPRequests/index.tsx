import { Group, Stack, Text, ActionIcon } from '@mantine/core';
import { rem } from 'polished';
import React, { useState } from 'react';
import { MdGridView, MdList } from 'react-icons/md';

import { TextGray, White } from '../../../../colors';
import {
  StaffApprovalStatus,
  useTeamGitPoapRequestsQuery,
} from '../../../../graphql/generated-gql';
import { SelectOption } from '../../../shared/compounds/ItemList';
import { Header, Select } from '../../../shared/elements';
import { TeamGitPOAPRequestsGrid } from './Grid';
import { TeamGitPOAPRequestsList } from './List';

type StatusSortOptions = 'Pending' | 'Rejected' | 'Approved' | 'All';
const statusSelectOptions: SelectOption<StatusSortOptions>[] = [
  { value: 'All', label: 'ALL REQUESTS' },
  { value: 'Approved', label: 'APPROVED' },
  { value: 'Pending', label: 'PENDING' },
  { value: 'Rejected', label: 'REJECTED' },
];

type DateSortOptions = 'Created' | 'Modified' | 'Alphabetical';
const dateSelectOptions: SelectOption<DateSortOptions>[] = [
  { value: 'Created', label: 'LAST CREATED' },
  { value: 'Modified', label: 'LAST MODIFIED' },
  { value: 'Alphabetical', label: 'ALPHABETICAL' },
];

export const TeamGitPOAPRequests = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [dateFilter, setDateFilter] = useState<DateSortOptions>('Created');
  const [statusFilter, setStatusFilter] = useState<StatusSortOptions>('All');

  const [result] = useTeamGitPoapRequestsQuery({
    variables: {
      teamId: 1,
      approvalStatus: statusFilter === 'All' ? undefined : StaffApprovalStatus[statusFilter],
      sort: dateFilter,
    },
    pause: false,
    requestPolicy: 'network-only',
  });

  const onDateSelectChange = (filterValue: DateSortOptions) => {
    if (filterValue !== dateFilter) {
      setDateFilter(filterValue as DateSortOptions);
    }
  };

  const onStatusSelectChange = (filterValue: StatusSortOptions) => {
    if (filterValue !== statusFilter) {
      setStatusFilter(filterValue as StatusSortOptions);
    }
  };

  const gitPOAPRequests = result.data?.teamGitPOAPRequests;

  return (
    <Group position="center" p={0}>
      <Stack align="center" justify="flex-start" style={{ width: '100%' }}>
        <Group position="apart" align="center" style={{ width: '100%' }}>
          <Header style={{ alignSelf: 'start' }}>{'Team GitPOAPs'}</Header>
          <Group position="right" spacing={32}>
            <Group spacing="xs">
              <Select
                data={statusSelectOptions}
                value={statusFilter}
                onChange={onStatusSelectChange}
              />
              <Select data={dateSelectOptions} value={dateFilter} onChange={onDateSelectChange} />
            </Group>
            <Group spacing="xs">
              <ActionIcon
                onClick={() => setView('grid')}
                sx={{ color: view === 'grid' ? White : TextGray }}
              >
                <MdGridView size={rem(20)} />
              </ActionIcon>
              <ActionIcon
                onClick={() => setView('list')}
                sx={{ color: view === 'list' ? White : TextGray }}
              >
                <MdList size={rem(20)} />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
        {!result.fetching && gitPOAPRequests && gitPOAPRequests.length === 0 && (
          <Text my={rem(20)} size={18}>
            {'No GitPOAPs Found'}
          </Text>
        )}
        {gitPOAPRequests &&
          {
            grid: <TeamGitPOAPRequestsGrid gitPOAPRequests={gitPOAPRequests} />,
            list: <TeamGitPOAPRequestsList gitPOAPRequests={gitPOAPRequests} />,
          }[view]}
      </Stack>
    </Group>
  );
};
