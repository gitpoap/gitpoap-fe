import { Group, Stack, Text, ActionIcon } from '@mantine/core';
import { rem } from 'polished';
import React, { useState } from 'react';
import { MdGridView, MdList } from 'react-icons/md';

import { TextGray, White } from '../../../../colors';
import { useTeamGitPoaPsQuery } from '../../../../graphql/generated-gql';
import { SelectOption } from '../../../shared/compounds/ItemList';
import { Header, Select } from '../../../shared/elements';
import { TeamGitPOAPsGrid } from './Grid';
import { TeamGitPOAPsList } from './List';

type FilterOptions = 'ALL' | 'LIVE' | 'PENDING' | 'DEPRECATED';
const filterOptions: SelectOption<FilterOptions>[] = [
  { value: 'ALL', label: 'ALL GITPOAPS' },
  { value: 'LIVE', label: 'LIVE' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'DEPRECATED', label: 'DEPRECATED' },
];

type SortOptions = 'createdAt' | 'updatedAt' | 'alphabetical';
const sortOptions: SelectOption<SortOptions>[] = [
  { value: 'createdAt', label: 'LAST CREATED' },
  { value: 'updatedAt', label: 'LAST MODIFIED' },
  { value: 'alphabetical', label: 'ALPHABETICAL' },
];

export const TeamGitPOAPs = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<FilterOptions>('ALL');
  const [sort, setSort] = useState<SortOptions>('createdAt');

  const [result] = useTeamGitPoaPsQuery({
    variables: {
      teamId: 1,
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

  const gitPOAPs = result.data?.teamGitPOAPs;

  return (
    <Group position="center" p={0}>
      <Stack align="center" justify="flex-start" style={{ width: '100%' }}>
        <Group position="apart" align="center" style={{ width: '100%' }}>
          <Header style={{ alignSelf: 'start' }}>{'Team GitPOAPs'}</Header>
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
        {!result.fetching && gitPOAPs && gitPOAPs.length === 0 && (
          <Text my={rem(20)} size={18}>
            {'No GitPOAPs Found'}
          </Text>
        )}
        {gitPOAPs &&
          {
            grid: <TeamGitPOAPsGrid gitPOAPs={gitPOAPs} />,
            list: <TeamGitPOAPsList gitPOAPs={gitPOAPs} />,
          }[view]}
      </Stack>
    </Group>
  );
};
