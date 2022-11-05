import React, { useState, useCallback, useEffect } from 'react';
import { rem } from 'polished';
import { Group, Loader, Stack, Text, Pagination } from '@mantine/core';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import {
  useGitPoapRequestsQuery,
  useTotalGitPoapRequestsCountQuery,
  AdminApprovalStatus,
} from '../../graphql/generated-gql';
import { GitPOAPRequest } from './GitPOAPRequest';
import { Select } from '../../components/shared/elements/Select';
import { Header } from '../../components/shared/elements/Header';
import { TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { SelectOption } from '../shared/compounds/ItemList';
import { Divider, Input } from '../shared/elements';
import { useRouter } from 'next/router';

type QueryVars = {
  page: number;
  perPage: number;
};

type SortOptions = 'Pending' | 'Rejected';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'Pending', label: 'PENDING' },
  { value: 'Rejected', label: 'REJECTED' },
];

export const GitPOAPRequestList = () => {
  const router = useRouter();
  const isRouterReady = router.isReady;
  const urlSearchQuery = router.query.search as string | undefined;
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);

  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
  });
  const [filter, setFilter] = useState<SortOptions>('Pending');
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.lg)})`, false);

  const [totalCountResult] = useTotalGitPoapRequestsCountQuery({
    variables: {
      approvalStatus: AdminApprovalStatus[filter],
    },
  });
  const [result, refetch] = useGitPoapRequestsQuery({
    variables: {
      take: variables.perPage,
      skip: (variables.page - 1) * variables.perPage,
      approvalStatus: AdminApprovalStatus[filter],
      search: debouncedSearch ? parseInt(debouncedSearch, 10) : undefined,
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
  }, [filter, refetch, isRouterReady]);

  useEffect(() => {
    if (isRouterReady && urlSearchQuery && searchValue === undefined) {
      setSearchValue(urlSearchQuery ?? '');
    } else if (debouncedSearch === '') {
      router.replace(router.pathname, undefined, { shallow: true });
    } else if (debouncedSearch && debouncedSearch.length > 0) {
      router.replace(
        `${router.pathname}?search=${encodeURIComponent(debouncedSearch ?? '')}`,
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [isRouterReady, urlSearchQuery, searchValue, debouncedSearch]);

  const totalCount = totalCountResult.data?.aggregateGitPOAPRequest._count?.id ?? 0;
  const totalPage = totalCount / variables.perPage + 1;
  const gitPOAPRequests = result.data?.gitPOAPRequests;

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="center" justify="flex-start" spacing="sm" style={{ width: '100%' }}>
        <Group position="apart" align="center" grow style={{ width: '100%' }}>
          <Header style={{ alignSelf: 'start' }}>{'GitPOAP Requests'}</Header>
          <Group position="right" spacing="lg">
            <Input
              placeholder={'Request ID'}
              value={searchValue ?? ''}
              onChange={(e) => {
                if ((e.target.value && /^\d+$/.test(e.target.value)) || e.target.value === '') {
                  setSearchValue(e.target.value);
                }
              }}
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
        {result.fetching && (
          <Group position="center" align="center" grow>
            <Loader size="xl" variant="dots" />
          </Group>
        )}
        {!result.fetching && gitPOAPRequests && gitPOAPRequests.length === 0 && (
          <Text mt={rem(20)} size={18}>
            {'No GitPOAP Requests Found'}
          </Text>
        )}
        <Stack style={{ width: '100%' }}>
          {!result.fetching &&
            gitPOAPRequests &&
            gitPOAPRequests.length > 0 &&
            gitPOAPRequests.map((gitPOAPRequest) => (
              <GitPOAPRequest key={gitPOAPRequest.id} gitPOAPRequest={gitPOAPRequest} />
            ))}
        </Stack>
        {totalCount > variables.perPage && (
          <Pagination
            page={variables.page}
            onChange={handlePageChange}
            total={totalPage}
            mt={rem(20)}
          />
        )}
      </Stack>
    </Group>
  );
};
