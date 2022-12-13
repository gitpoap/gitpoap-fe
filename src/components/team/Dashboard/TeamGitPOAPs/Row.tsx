import { Text, Button, Center } from '@mantine/core';
import styled from 'styled-components';
import React from 'react';
import { UserGitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { GitPOAPBadgePopover } from '../../../request/RequestItem/GitPOAPBadgePopover';
import { useDisclosure } from '@mantine/hooks';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { ContributorModal } from '../../../request/RequestItem/ContributorModal';
import { BackgroundPanel2 } from '../../../../colors';
import { formatUTCDate } from '../../../../helpers';

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel2} !important;
  }
`;

type RowProps = {
  gitPOAPRequest: Exclude<UserGitPoapRequestsQuery['gitPOAPRequests'], undefined | null>[number];
};

export const TeamGitPOAPsRow = ({ gitPOAPRequest }: RowProps) => {
  const {
    createdAt,
    name,
    description,
    imageUrl,
    contributors,
    startDate,
    endDate,
    staffApprovalStatus,
  } = gitPOAPRequest;

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const numberOfContributors = Object.values(contributors).flat().length;

  return (
    <>
      <TableRow>
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
          <Text sx={{ whiteSpace: 'nowrap' }}>{formatUTCDate(startDate)}</Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>{formatUTCDate(endDate)}</Text>
        </td>
        <td>
          <Center>
            <Button
              compact
              disabled={numberOfContributors === 0}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                openContributorModal();
              }}
            >
              {numberOfContributors}
            </Button>
          </Center>
        </td>
      </TableRow>
      <ContributorModal
        isOpen={isContributorModalOpen}
        onClose={closeContributorModal}
        contributors={contributors}
      />
    </>
  );
};
