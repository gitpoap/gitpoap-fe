import { Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import React from 'react';
import { StaffApprovalStatus, TeamGitPoaPsQuery } from '../../../../graphql/generated-gql';
import { GitPOAPBadgePopover } from '../../../request/RequestItem/GitPOAPBadgePopover';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { TableRow } from '../../../shared/elements/Table';

type RowProps = {
  gitPOAP: Exclude<TeamGitPoaPsQuery['teamGitPOAPs'], null | undefined>[number];
  index: number;
};

const PoapToStaffApprovalStatus = {
  APPROVED: 'APPROVED',
  DEPRECATED: 'REJECTED',
  REDEEM_REQUEST_PENDING: 'APROVED',
  UNAPPROVED: 'PENDING',
};

export const TeamGitPOAPsRow = ({ gitPOAP, index }: RowProps) => {
  const { id, name, description, imageUrl, createdAt, poapApprovalStatus, claims } = gitPOAP;

  const router = useRouter();
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const numberOfClaims = claims.length;

  return (
    <TableRow onClick={() => router.push(`/gp/${id}/manage`)}>
      <td>
        <Text>{index}</Text>
      </td>
      <td>
        <RequestStatusBadge
          status={PoapToStaffApprovalStatus[poapApprovalStatus] as StaffApprovalStatus}
        />
      </td>
      <td>
        <GitPOAPBadgePopover
          isOpen={isImagePopoverOpen}
          onClose={closeImagePopover}
          onOpen={openImagePopover}
          imageUrl={imageUrl}
          showWithoutTemplate
          size="xxs"
        />
      </td>
      <td>
        <Text lineClamp={3}>{name}</Text>
      </td>
      <td>
        <Text lineClamp={3}>{description}</Text>
      </td>
      <td>
        <Tooltip
          label={DateTime.fromISO(createdAt).toFormat('dd LLL yyyy HH:mm')}
          multiline
          withArrow
          transition="fade"
          position="top-start"
          sx={{ textAlign: 'center' }}
        >
          <Text sx={{ whiteSpace: 'nowrap' }}>
            {DateTime.fromISO(createdAt).toRelative() ?? '-'}
          </Text>
        </Tooltip>
      </td>
      <td>
        <Text>{numberOfClaims}</Text>
      </td>
    </TableRow>
  );
};
