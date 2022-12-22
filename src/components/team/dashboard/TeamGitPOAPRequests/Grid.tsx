import { Group } from '@mantine/core';
import React from 'react';

import { TeamGitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { GitPOAPCard } from '../GitPOAPCard';

type Props = {
  gitPOAPRequests: Exclude<TeamGitPoapRequestsQuery['teamGitPOAPRequests'], null | undefined>;
};

export const TeamGitPOAPRequestsGrid = ({ gitPOAPRequests }: Props) => {
  return (
    <Group position="left">
      {gitPOAPRequests &&
        gitPOAPRequests.length > 0 &&
        gitPOAPRequests.map((gitPOAPRequest) => (
          <GitPOAPCard
            key={`GitPOAPRequest-${gitPOAPRequest.id}`}
            imageUrl={gitPOAPRequest.imageUrl}
            name={gitPOAPRequest.name}
            staffApprovalStatus={gitPOAPRequest.staffApprovalStatus}
            href={`/create/${gitPOAPRequest.id}`}
          />
        ))}
    </Group>
  );
};
