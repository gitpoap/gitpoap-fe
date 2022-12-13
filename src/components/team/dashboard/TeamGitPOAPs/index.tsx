import { Group, Stack, Text, ActionIcon } from '@mantine/core';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import React, { useState, useEffect } from 'react';
import { MdGridView, MdList } from 'react-icons/md';

import { TextGray, White } from '../../../../colors';
import {
  StaffApprovalStatus,
  useUserGitPoapRequestsQuery,
} from '../../../../graphql/generated-gql';
import { useUser } from '../../../../hooks/useUser';
import { gitPOAPRequests as sampleGitPOAPRequests } from '../../../../stories/data';
import { SelectOption } from '../../../shared/compounds/ItemList';
import { Header, Select } from '../../../shared/elements';
import { TeamGitPOAPsGrid } from './Grid';
import { TeamGitPOAPsList } from './List';

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

export const TeamGitPOAPs = () => {
  const user = useUser();
  const address = user?.address;
  const router = useRouter();
  const isRouterReady = router.isReady;
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [dateFilter, setDateFilter] = useState<DateSortOptions>('Created');
  const [statusFilter, setStatusFilter] = useState<StatusSortOptions>('All');

  const [result, refetch] = useUserGitPoapRequestsQuery({
    variables: {
      take: 100,
      skip: 0,
      approvalStatus: statusFilter === 'All' ? undefined : StaffApprovalStatus[statusFilter],
      address: address ?? '',
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

  useEffect(() => {
    if (isRouterReady && statusFilter) {
      refetch();
    }
  }, [dateFilter, statusFilter, refetch, isRouterReady, address]);

  const gitPOAPRequests = [
    ...sampleGitPOAPRequests,
    ...sampleGitPOAPRequests,
    ...sampleGitPOAPRequests,
    ...sampleGitPOAPRequests,
    ...sampleGitPOAPRequests,
  ];

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
        {
          {
            grid: <TeamGitPOAPsGrid gitPOAPRequests={gitPOAPRequests} />,
            list: <TeamGitPOAPsList gitPOAPRequests={gitPOAPRequests} />,
          }[view]
        }
      </Stack>
    </Group>
  );
};
