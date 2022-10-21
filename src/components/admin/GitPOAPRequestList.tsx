import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, Loader, Stack, Text } from '@mantine/core';
import { FaPlus } from 'react-icons/fa';
import { useAuthContext } from '../github/AuthContext';
import { ConnectGitHub } from './ConnectGitHub';
import {
  useGitPoapRequestsQuery,
  useTotalGitPoapRequestsCountQuery,
  AdminApprovalStatus,
} from '../../graphql/generated-gql';
import { GitPOAPRequest } from './GitPOAPRequest';
import { Select } from '../../components/shared/elements/Select';
import { Button } from '../../components/shared/elements/Button';
import { Header } from '../../components/shared/elements/Header';
import { BREAKPOINTS } from '../../constants';
import { SelectOption } from '../shared/compounds/ItemList';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ShowMore = styled(Button)`
  align-self: center;
`;

const Heading = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem(30)};
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

const perPage = 2;

type GitPOAPRequest = {
  __typename?: 'GitPOAPRequest';
  id: number;
  name: string;
  description: string;
  imageKey: string;
  startDate: string;
  endDate: string;
  expiryDate: string;
  numRequestedCodes: number;
  email: string;
  contributors: ContributorsType;
  project?: {
    __typename?: 'Project';
    repos: Array<{ __typename?: 'Repo'; name: string }>;
  } | null;
  organization?: { __typename?: 'Organization'; name: string } | null;
};

export const GitPOAPRequestList = () => {
  const { tokens } = useAuthContext();
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState<SortOptions>('Pending');
  const [gitPOAPRequests, setGitPOAPRequests] = useState<GitPOAPRequest[]>([]);

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

  console.log('gitPOAPRequests', gitPOAPRequests, skip);

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
      console.log('result', result.fetching, result.data?.gitPOAPRequests);
      const newGitPOAPRequests = result.data?.gitPOAPRequests ?? [];
      setGitPOAPRequests([...gitPOAPRequests, ...newGitPOAPRequests]);
    }
  }, [result]);

  return (
    <Group position="center">
      {!accessToken ? (
        <>
          <Stack align="center" justify="flex-start" spacing="sm">
            <Heading>
              {/* <ListTitle>Approve CGs</ListTitle> */}
              <Sorting>
                <Select data={selectOptions} value={filter} onChange={onSelectChange} />
              </Sorting>
            </Heading>
            {!result.fetching && gitPOAPRequests && gitPOAPRequests.length === 0 && (
              <Text>{'No GitPoap Requests Found'}</Text>
            )}
            {gitPOAPRequests &&
              gitPOAPRequests.length > 0 &&
              gitPOAPRequests.map((gitPOAPRequest) => (
                <GitPOAPRequest
                  key={gitPOAPRequest.id}
                  id={gitPOAPRequest.id}
                  name={gitPOAPRequest.name}
                  description={gitPOAPRequest.description}
                  imageKey={''}
                  startDate={gitPOAPRequest.startDate}
                  endDate={gitPOAPRequest.endDate}
                  expiryDate={gitPOAPRequest.expiryDate}
                  numRequestedCodes={gitPOAPRequest.numRequestedCodes}
                  email={gitPOAPRequest.email}
                  contributors={gitPOAPRequest.contributors}
                  projectName={gitPOAPRequest.project?.repos[0].name}
                  organizationName={gitPOAPRequest.organization?.name}
                />
              ))}
            {result.fetching && (
              <LoaderContainer>
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
        </>
      ) : (
        <ConnectGitHub />
      )}
    </Group>
  );
};
