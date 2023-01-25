import { Group, Stack, ActionIcon, Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { rem } from 'polished';
import React, { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdGridView, MdList } from 'react-icons/md';

import { TextGray, White } from '../../../../colors';
import { useTeamGitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { SelectOption } from '../../../shared/compounds/ItemList';
import { Link } from '../../../shared/compounds/Link';
import { Header, Select } from '../../../shared/elements';
import { TableEmptyState, TableLoader } from '../../../shared/elements/Table';
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
  const [view, setView] = useLocalStorage<'grid' | 'list'>({
    key: 'dataView',
    defaultValue: 'grid',
  });
  const [filter, setFilter] = useState<FilterOptions>('ALL');
  const [sort, setSort] = useState<SortOptions>('createdAt');

  const [result] = useTeamGitPoapRequestsQuery({
    variables: {
      teamId,
      approvalStatus: filter === 'ALL' ? undefined : filter,
      sort: sort,
    },
    pause: false,
    requestPolicy: 'cache-and-network',
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
            <Link href="/create">
              <Button component="a" leftIcon={<HiOutlinePlus size={20} />}>
                {'Create'}
              </Button>
            </Link>
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
        {result.fetching ? (
          <TableLoader />
        ) : gitPOAPRequests && gitPOAPRequests.length > 0 ? (
          {
            grid: <TeamGitPOAPRequestsGrid gitPOAPRequests={gitPOAPRequests} />,
            list: <TeamGitPOAPRequestsList gitPOAPRequests={gitPOAPRequests} />,
          }[view]
        ) : (
          <TableEmptyState text={'No GitPOAP Requests Found'} />
        )}
      </Stack>
    </Group>
  );
};
