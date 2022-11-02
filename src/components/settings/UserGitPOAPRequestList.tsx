import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, Loader, Stack, Text, Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  useUserGitPoapRequestsQuery,
  useTotalUserGitPoapRequestsCountQuery,
  AdminApprovalStatus,
} from '../../graphql/generated-gql';
import { useProfileContext } from '../profile/ProfileContext';
import { UserGitPOAPRequest } from './UserGitPOAPRequest';
import { Select } from '../shared/elements/Select';
import { Header } from '../shared/elements/Header';
import { TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { SelectOption } from '../shared/compounds/ItemList';

type QueryVars = {
  page: number;
  perPage: number;
};

const Heading = styled(Group)`
  width: 100%;
`;

const ListTitle = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(42)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: ${rem(26)};
    line-height: ${rem(32)};
  }
`;

type SortOptions = 'Pending' | 'Approved' | 'Rejected';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'Pending', label: 'PENDING' },
  { value: 'Approved', label: 'APPROVED' },
  { value: 'Rejected', label: 'REJECTED' },
];

export const UserGitPOAPRequestList = () => {
  const { profileData, updateProfile, isSaveLoading, isSaveSuccessful } = useProfileContext();
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 10,
  });
  const [filter, setFilter] = useState<SortOptions>('Pending');
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  const [totalCountResult] = useTotalUserGitPoapRequestsCountQuery({
    variables: {
      approvalStatus: AdminApprovalStatus[filter],
      address: profileData?.address ?? '',
    },
  });
  const [result] = useUserGitPoapRequestsQuery({
    variables: {
      take: variables.perPage,
      skip: (variables.page - 1) * variables.perPage,
      approvalStatus: AdminApprovalStatus[filter],
      address: profileData?.address ?? '',
    },
  });

  const handlePageChange = useCallback((page: number) => {
    setVariables({
      ...variables,
      page,
    });
  }, []);

  const onSelectChange = (filterValue: SortOptions) => {
    if (filterValue !== filter) {
      setFilter(filterValue as SortOptions);
    }
  };

  const totalCount = totalCountResult.data?.aggregateGitPOAPRequest._count?.id ?? 0;
  const totalPage = totalCount / variables.perPage + 1;
  const gitPOAPRequests = result.data?.gitPOAPRequests;
  const address = profileData?.address ?? '';

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="center" justify="flex-start" spacing="sm">
        <Heading position="apart" align="center" grow mt={rem(30)} mb={rem(15)}>
          <ListTitle>{'GitPOAP Requests'}</ListTitle>
          <Group position="right" spacing="lg">
            {!matchesBreakpointSmall && (
              <Text size={12} color={TextGray} transform="uppercase">
                {'Filter By: '}
              </Text>
            )}
            <Select data={selectOptions} value={filter} onChange={onSelectChange} />
          </Group>
        </Heading>
        {result.fetching && (
          <Group position="center" align="center" grow>
            <Loader size="xl" variant="dots" />
          </Group>
        )}
        {!result.fetching && gitPOAPRequests && gitPOAPRequests.length === 0 && (
          <Text>{'No GitPOAP Requests Found'}</Text>
        )}
        <Stack>
          {!result.fetching &&
            gitPOAPRequests &&
            gitPOAPRequests.length > 0 &&
            gitPOAPRequests.map((gitPOAPRequest) => (
              <UserGitPOAPRequest key={gitPOAPRequest.id} gitPOAPRequest={gitPOAPRequest} />
            ))}
        </Stack>
        {gitPOAPRequests && gitPOAPRequests.length > 0 && (
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
