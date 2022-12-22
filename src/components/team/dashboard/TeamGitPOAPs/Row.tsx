import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { StaffApprovalStatus, TeamGitPoaPsQuery } from '../../../../graphql/generated-gql';
import { GitPOAPBadgePopover } from '../../../request/RequestItem/GitPOAPBadgePopover';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { BackgroundPanel2 } from '../../../../colors';
import { formatUTCDate } from '../../../../helpers';

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel2} !important;
  }
`;

type RowProps = {
  gitPOAP: Exclude<TeamGitPoaPsQuery['teamGitPOAPs'], null | undefined>[number];
};

const PoapToStaffApprovalStatus = {
  APPROVED: 'APPROVED',
  DEPRECATED: 'REJECTED',
  REDEEM_REQUEST_PENDING: 'APROVED',
  UNAPPROVED: 'PENDING',
};

export const TeamGitPOAPsRow = ({ gitPOAP }: RowProps) => {
  const { id, name, description, imageUrl, createdAt, updatedAt, poapApprovalStatus, claims } =
    gitPOAP;

  const router = useRouter();
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const numberOfClaims = claims.length;

  return (
    <TableRow onClick={() => router.push(`/gp/${id}/manage`)}>
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
        <Text sx={{ whiteSpace: 'nowrap' }}>{formatUTCDate(createdAt)}</Text>
      </td>
      <td>
        <Text sx={{ whiteSpace: 'nowrap' }}>{formatUTCDate(updatedAt)}</Text>
      </td>
      <td>
        <Text>{numberOfClaims}</Text>
      </td>
    </TableRow>
  );
};
