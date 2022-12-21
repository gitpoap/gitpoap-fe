import { Text } from '@mantine/core';
import styled from 'styled-components';
import React from 'react';
import { StaffApprovalStatus, TeamGitPoaPsQuery } from '../../../../graphql/generated-gql';
import { GitPOAPBadgePopover } from '../../../request/RequestItem/GitPOAPBadgePopover';
import { useDisclosure } from '@mantine/hooks';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { BackgroundPanel2 } from '../../../../colors';
import { formatUTCDate } from '../../../../helpers';
import Link from 'next/link';

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

  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const numberOfClaims = claims.length;

  return (
    <Link href={`/gp/${id}/manage`}>
      <TableRow>
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
    </Link>
  );
};
