import { Group } from '@mantine/core';
import React from 'react';

import { StaffApprovalStatus, TeamGitPoaPsQuery } from '../../../../graphql/generated-gql';
import { GitPOAPCard } from '../GitPOAPCard';

type Props = {
  gitPOAPs: Exclude<TeamGitPoaPsQuery['teamGitPOAPs'], null | undefined>;
};

const PoapToStaffApprovalStatus = {
  APPROVED: 'APPROVED',
  DEPRECATED: 'REJECTED',
  REDEEM_REQUEST_PENDING: 'APROVED',
  UNAPPROVED: 'PENDING',
};

export const TeamGitPOAPsGrid = ({ gitPOAPs }: Props) => {
  return (
    <Group align="baseline" position="left" sx={{ width: '100%' }}>
      {gitPOAPs &&
        gitPOAPs.length > 0 &&
        gitPOAPs.map((gitPOAP) => (
          <GitPOAPCard
            key={`GitPOAP-${gitPOAP.id}`}
            imageUrl={gitPOAP.imageUrl}
            name={gitPOAP.name}
            staffApprovalStatus={
              PoapToStaffApprovalStatus[gitPOAP.poapApprovalStatus] as StaffApprovalStatus
            }
            href={`/gp/${gitPOAP.id}/manage`}
          />
        ))}
    </Group>
  );
};
