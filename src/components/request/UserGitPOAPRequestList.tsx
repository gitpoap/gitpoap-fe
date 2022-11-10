import React, { useState, useCallback, useEffect } from 'react';
import { rem } from 'polished';
import { Group, Stack, Text, Pagination, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  useUserGitPoapRequestsQuery,
  useTotalUserGitPoapRequestsCountQuery,
  AdminApprovalStatus,
} from '../../graphql/generated-gql';
import { UserGitPOAPRequest } from './UserRequestItem/UserGitPOAPRequest';
import { Select, Header, Divider, Input } from '../shared/elements';
import { TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { SelectOption } from '../shared/compounds/ItemList';
import { useUrlState } from '../../hooks/useUrlState';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { AddZone } from '../gitpoap/manage/AddZone';

type QueryVars = {
  page: number;
  perPage: number;
};

type SortOptions = 'Pending' | 'Rejected' | 'Approved' | 'All';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'All', label: 'ALL' },
  { value: 'Approved', label: 'APPROVED' },
  { value: 'Pending', label: 'PENDING' },
  { value: 'Rejected', label: 'REJECTED' },
];

export const UserGitPOAPRequestList = () => {
  const user = useUser();
  const address = user?.address;
  const router = useRouter();
  const isRouterReady = router.isReady;
  const { value, setValue, debouncedValue } = useUrlState('search');
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
  });
  const [filter, setFilter] = useState<SortOptions>('All');
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  const [totalCountResult] = useTotalUserGitPoapRequestsCountQuery({
    variables: {
      approvalStatus: filter === 'All' ? undefined : AdminApprovalStatus[filter],
      address: address ?? '',
    },
  });
  const [result, refetch] = useUserGitPoapRequestsQuery({
    variables: {
      take: variables.perPage,
      skip: (variables.page - 1) * variables.perPage,
      approvalStatus: filter === 'All' ? undefined : AdminApprovalStatus[filter],
      address: address ?? '',
      search: debouncedValue ?? '',
    },
    pause: false,
    requestPolicy: 'network-only',
  });

  const handlePageChange = useCallback(
    (page: number) =>
      setVariables((variables) => ({
        ...variables,
        page,
      })),
    [],
  );

  const onSelectChange = (filterValue: SortOptions) => {
    if (filterValue !== filter) {
      setFilter(filterValue as SortOptions);
    }
  };

  useEffect(() => {
    if (isRouterReady && filter) {
      refetch();
    }
  }, [filter, refetch, isRouterReady, address]);

  const totalCount = totalCountResult.data?.aggregateGitPOAPRequest._count?.id ?? 0;
  const totalPages = Math.floor(totalCount / variables.perPage + 1);
  const gitPOAPRequests = result.data?.gitPOAPRequests;

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="center" justify="flex-start" spacing="sm" style={{ width: '100%' }}>
        <Group position="apart" align="center" grow style={{ width: '100%' }}>
          <Header style={{ alignSelf: 'start' }}>{'My GitPOAPs'}</Header>
          <Group position="right" spacing="lg">
            <Input
              placeholder={'Search for request'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {!matchesBreakpointSmall && (
              <Text color={TextGray} transform="uppercase">
                {'Filter By: '}
              </Text>
            )}
            <Select data={selectOptions} value={filter} onChange={onSelectChange} />
          </Group>
        </Group>
        <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
        {!result.fetching && gitPOAPRequests && gitPOAPRequests.length === 0 && (
          <Text my={rem(20)} size={18}>
            {'No GitPOAPs Found'}
          </Text>
        )}
        <Stack style={{ width: '100%' }}>
          {gitPOAPRequests &&
            gitPOAPRequests.length > 0 &&
            gitPOAPRequests.map((gitPOAPRequest) => (
              <UserGitPOAPRequest key={gitPOAPRequest.id} gitPOAPRequest={gitPOAPRequest} />
            ))}
          <Box my={rem(10)}>
            <AddZone onClick={() => router.push('/create')} text="+ CREATE GITPOAP" />
          </Box>
        </Stack>
        {totalCount > variables.perPage && (
          <Pagination
            page={variables.page}
            onChange={handlePageChange}
            total={totalPages}
            mt={rem(20)}
          />
        )}
      </Stack>
    </Group>
  );
};
