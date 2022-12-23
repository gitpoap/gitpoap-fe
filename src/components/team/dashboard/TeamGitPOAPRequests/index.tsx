import { Group, Stack, Text, ActionIcon } from '@mantine/core';
import { rem } from 'polished';
import React, { useState } from 'react';
import { MdGridView, MdList } from 'react-icons/md';

import { TextGray, White } from '../../../../colors';
import { useTeamGitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { SelectOption } from '../../../shared/compounds/ItemList';
import { Header, Select } from '../../../shared/elements';
import { TeamGitPOAPRequestsGrid } from './Grid';
import { TeamGitPOAPRequestsList } from './List';

type FilterOptions = 'ALL' | 'PENDING' | 'REJECTED';
const filterOptions: SelectOption<FilterOptions>[] = [
  { value: 'ALL', label: 'ALL REQUESTS' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'REJECTED', label: 'REJECTED' },
];

type SortOptions = 'createdAt' | 'alphabetical';
const sortOptions: SelectOption<SortOptions>[] = [
  { value: 'createdAt', label: 'LAST CREATED' },
  { value: 'alphabetical', label: 'ALPHABETICAL' },
];

type Props = {
  teamId: number;
};

export const TeamGitPOAPRequests = ({ teamId }: Props) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<FilterOptions>('ALL');
  const [sort, setSort] = useState<SortOptions>('createdAt');

  const [result] = useTeamGitPoapRequestsQuery({
    variables: {
      teamId,
      approvalStatus: filter === 'ALL' ? undefined : filter,
      sort: sort,
    },
    pause: false,
    requestPolicy: 'network-only',
  });

  const onFilterChange = (filterValue: FilterOptions) => {
    if (filterValue !== filter) {
      setFilter(filterValue as FilterOptions);
    }
  };

  const onSortChange = (filterValue: SortOptions) => {
    if (filterValue !== sort) {
      setSort(filterValue as SortOptions);
    }
  };

  const gitPOAPRequests = result.data?.teamGitPOAPRequests;

  return (
    <Group position="center" p={0}>
      <Stack align="center" justify="flex-start" style={{ width: '100%' }}>
        <Group position="apart" align="center" style={{ width: '100%' }}>
          <Header style={{ alignSelf: 'start' }}>{'Requests'}</Header>
          <Group position="right" spacing={32}>
            <Group spacing="xs">
              <Select data={filterOptions} value={filter} onChange={onFilterChange} />
              <Select data={sortOptions} value={sort} onChange={onSortChange} />
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
            {'No GitPOAP Requests Found'}
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
