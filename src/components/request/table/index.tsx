import { Group, Stack, Text, Table, ScrollArea, ActionIcon, Center } from '@mantine/core';
import { rem } from 'polished';
import React, { useState, useCallback } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdRefresh } from 'react-icons/md';

import {
  StaffApprovalStatus,
  useUserGitPoapRequestsQuery,
  useTotalUserGitPoapRequestsCountQuery,
} from '../../../graphql/generated-gql';
import { TableHeaderItem } from '../../gitpoap/manage/TableHeaderItem';
import { Loader } from '../../shared/elements';
import { BackgroundPanel } from '../../../colors';
import { UserGitPOAPRequestTableRow } from './row';

const HEADERS: {
  label: string;
  key: string;
  isSortable: boolean;
}[] = [
  { label: 'Status', key: 'status', isSortable: false },
  { label: 'Image', key: 'image', isSortable: false },
  { label: 'Name', key: 'name', isSortable: false },
  { label: 'Description', key: 'description', isSortable: false },
  { label: 'Start Date', key: 'startDate', isSortable: false },
  { label: 'End Date', key: 'endDate', isSortable: false },
  { label: 'Creation Date', key: 'creationAt', isSortable: false },
  { label: '', key: 'actions', isSortable: false },
];

type QueryVars = {
  page: number;
  perPage: number;
};

type Props = {
  address: string;
  staffApprovalStatus?: StaffApprovalStatus;
  debouncedValue?: string;
};

export const UserGitPOAPRequestTable = ({
  address,
  staffApprovalStatus,
  debouncedValue,
}: Props) => {
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
  });
  const [totalCountResult, refetchTotalCount] = useTotalUserGitPoapRequestsCountQuery({
    variables: {
      approvalStatus: staffApprovalStatus,
      address: address,
    },
  });
  const [result, refetch] = useUserGitPoapRequestsQuery({
    variables: {
      take: variables.perPage,
      skip: (variables.page - 1) * variables.perPage,
      approvalStatus: staffApprovalStatus,
      address: address,
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

  const totalCount = totalCountResult.data?.aggregateGitPOAPRequest._count?.id ?? 0;
  const totalPages = Math.ceil(totalCount / variables.perPage);
  const gitPOAPRequests = result.data?.gitPOAPRequests;
  const currentIndex = (variables.page - 1) * variables.perPage;

  return (
    <Stack
      align="center"
      justify="flex-start"
      spacing="sm"
      py={0}
      sx={{ border: `${rem(1)} solid ${BackgroundPanel}`, borderRadius: `${rem(6)} ${rem(6)} 0 0` }}
    >
      <Group position="apart" p={rem(16)} pr={rem(8)} sx={{ width: '100%' }}>
        <ActionIcon
          onClick={() => {
            refetch();
            refetchTotalCount();
          }}
        >
          {result.fetching ? <Loader /> : <MdRefresh size="20" />}
        </ActionIcon>
        <Group>
          <Text color="dimmed">
            {`${currentIndex + 1}-${Math.min(
              currentIndex + variables.perPage,
              totalCount,
            )} of ${totalCount}`}
          </Text>
          <ActionIcon
            disabled={variables.page === 1}
            onClick={() => void handlePageChange(variables.page - 1)}
          >
            <MdKeyboardArrowLeft size="20" />
          </ActionIcon>
          <ActionIcon
            disabled={variables.page === totalPages}
            onClick={() => void handlePageChange(variables.page + 1)}
          >
            <MdKeyboardArrowRight size="20" />
          </ActionIcon>
        </Group>
      </Group>
      {result.fetching ? (
        <Center style={{ height: '40vh' }}>
          <Loader />
        </Center>
      ) : gitPOAPRequests && gitPOAPRequests.length === 0 ? (
        <Center style={{ height: '40vh' }}>
          <Text mt={rem(20)} size={18}>
            {'No GitPOAP Requests Found'}
          </Text>
        </Center>
      ) : (
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
              {!result.fetching &&
                gitPOAPRequests &&
                gitPOAPRequests.length > 0 &&
                gitPOAPRequests.map((gitPOAPRequest) => {
                  return (
                    <UserGitPOAPRequestTableRow
                      key={gitPOAPRequest.id}
                      gitPOAPRequest={gitPOAPRequest}
                    />
                  );
                })}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    </Stack>
  );
};
