import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, Loader, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FaPlus } from 'react-icons/fa';
import { useAuthContext } from '../github/AuthContext';
import { ConnectGitHub } from './ConnectGitHub';
import {
  useGitPoapRequestsQuery,
  useTotalGitPoapRequestsCountQuery,
  AdminApprovalStatus,
} from '../../graphql/generated-gql';
import { GitPOAPRequest, GitPOAPRequestType } from './GitPOAPRequest';
import { Select } from '../../components/shared/elements/Select';
import { Button } from '../../components/shared/elements/Button';
import { Header } from '../../components/shared/elements/Header';
import { TextGray } from '../../colors';
import { BREAKPOINTS } from '../../constants';
import { SelectOption } from '../shared/compounds/ItemList';

const LoaderContainer = styled(Group)`
  height: 100%;
`;

const ShowMore = styled(Button)`
  align-self: center;
`;

const Heading = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${rem(30)};
  margin-bottom: ${rem(15)};
`;

const Sorting = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

const ListTitle = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(42)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: ${rem(26)};
    line-height: ${rem(32)};
  }
`;

const FilterBy = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${rem(12)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(2)};
  text-transform: uppercase;
  color: ${TextGray};
  margin-right: ${rem(10)};
`;

export type ContributorsType = {
  githubHandles?: string[];
  ethAddresses?: string[];
  ensNames?: string[];
  emails?: string[];
};

type SortOptions = 'Pending' | 'Approved' | 'Rejected';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'Pending', label: 'PENDING' },
  { value: 'Approved', label: 'APPROVED' },
  { value: 'Rejected', label: 'REJECTED' },
];

const perPage = 20;

export const GitPOAPRequestList = () => {
  const { tokens } = useAuthContext();
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState<SortOptions>('Pending');
  const [gitPOAPRequests, setGitPOAPRequests] = useState<GitPOAPRequestType[]>([]);
  const matchesBreakpointSmall = useMediaQuery(`(max-width: ${rem(BREAKPOINTS.sm)})`, false);

  const [totalCountResult] = useTotalGitPoapRequestsCountQuery({
    variables: {
      approvalStatus: AdminApprovalStatus[filter],
    },
  });
  const [result] = useGitPoapRequestsQuery({
    variables: {
      take: perPage,
      skip,
      approvalStatus: AdminApprovalStatus[filter],
    },
  });

  const showMoreOnClick = useCallback(() => {
    setSkip((prev) => prev + perPage);
  }, []);

  const onSelectChange = (filterValue: SortOptions) => {
    if (filterValue !== filter) {
      setFilter(filterValue as SortOptions);
      setGitPOAPRequests([]);
      setSkip(0);
    }
  };

  const accessToken = tokens?.accessToken;
  const totalCount = totalCountResult.data?.aggregateGitPOAPRequest._count?.id ?? 0;
  const hasShowMoreButton = gitPOAPRequests.length < totalCount;

  useEffect(() => {
    if (!result.fetching && result.data?.gitPOAPRequests) {
      const newGitPOAPRequests = result.data?.gitPOAPRequests ?? [];
      setGitPOAPRequests([...gitPOAPRequests, ...newGitPOAPRequests]);
    }
  }, [result]);

  return (
    <Group position="center" py={0} px={rem(20)}>
      <Stack align="center" justify="flex-start" spacing="sm">
        <Heading>
          <ListTitle>{'GitPoap Requests'}</ListTitle>
          <Sorting>
            {!matchesBreakpointSmall && <FilterBy>{'Filter By: '}</FilterBy>}
            <Select data={selectOptions} value={filter} onChange={onSelectChange} />
          </Sorting>
        </Heading>
        {!result.fetching && gitPOAPRequests && gitPOAPRequests.length === 0 && (
          <Text>{'No GitPoap Requests Found'}</Text>
        )}
        <Stack>
          {gitPOAPRequests &&
            gitPOAPRequests.length > 0 &&
            gitPOAPRequests.map((gitPOAPRequest) => (
              <GitPOAPRequest key={gitPOAPRequest.id} gitPOAPRequest={gitPOAPRequest} />
            ))}
        </Stack>
        {result.fetching && (
          <LoaderContainer position="center" align="center">
            <Loader size="xl" variant="dots" />
          </LoaderContainer>
        )}
        {!result.fetching && hasShowMoreButton && (
          <ShowMore
            onClick={showMoreOnClick}
            leftIcon={<FaPlus />}
            variant="outline"
            loading={result.fetching}
          >
            {'Show more'}
          </ShowMore>
        )}
      </Stack>
    </Group>
  );
};
