import { Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import React from 'react';
import { TeamGitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { GitPOAPBadgePopover } from '../../../request/RequestItem/GitPOAPBadgePopover';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { TableRow } from '../../../shared/elements/Table';

type RowProps = {
  gitPOAPRequest: Exclude<
    TeamGitPoapRequestsQuery['teamGitPOAPRequests'],
    null | undefined
  >[number];
  index: number;
};

export const TeamGitPOAPRequestsRow = ({ gitPOAPRequest, index }: RowProps) => {
  const { id, createdAt, name, description, imageUrl, contributors, staffApprovalStatus } =
    gitPOAPRequest;

  const router = useRouter();
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const numberOfContributors = Object.values(contributors).flat().length;

  return (
    <TableRow onClick={() => router.push(`/create/${id}`)}>
      <td>
        <Text>{index}</Text>
      </td>
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
        <Text>{numberOfContributors}</Text>
      </td>
    </TableRow>
  );
};
