import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { TeamGitPoapRequestsQuery } from '../../../../graphql/generated-gql';
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
  gitPOAPRequest: Exclude<
    TeamGitPoapRequestsQuery['teamGitPOAPRequests'],
    null | undefined
  >[number];
};

export const TeamGitPOAPRequestsRow = ({ gitPOAPRequest }: RowProps) => {
  const {
    id,
    createdAt,
    updatedAt,
    name,
    description,
    imageUrl,
    contributors,
    staffApprovalStatus,
  } = gitPOAPRequest;

  const router = useRouter();
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const numberOfContributors = Object.values(contributors).flat().length;

  return (
    <TableRow onClick={() => router.push(`/create/${id}`)}>
      <td>
        <RequestStatusBadge status={staffApprovalStatus} />
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
        <Text>{numberOfContributors}</Text>
      </td>
    </TableRow>
  );
};
