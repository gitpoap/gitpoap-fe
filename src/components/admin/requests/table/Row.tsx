import { Group, Text, Button, ActionIcon, Tooltip, Center } from '@mantine/core';
import styled from 'styled-components';
import React from 'react';
import { GitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { GitPOAPBadgePopover } from '../../../request/RequestItem/GitPOAPBadgePopover';
import { useDisclosure } from '@mantine/hooks';
import { RequestStatusBadge } from '../../../request/RequestItem/RequestStatusBadge';
import { ContributorModal } from '../../../request/RequestItem/ContributorModal';
import { MdCheck, MdClose, MdOutlineEdit } from 'react-icons/md';
import { NextLink } from '@mantine/next';
import { BackgroundPanel } from '../../../../colors';
import { formatUTCDate, shortenAddress } from '../../../../helpers';

const TableRow = styled.tr<{ active: boolean }>`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel} !important;
  }
  ${({ active }) => active && `background-color: ${BackgroundPanel}`}
`;

type RowProps = {
  active: boolean;
  gitPOAPRequest: Exclude<GitPoapRequestsQuery['gitPOAPRequests'], undefined | null>[number];
  setActiveGitPOAPRequest: () => void;
  setApproveGitPOAPRequest: () => void;
  setRejectGitPOAPRequest: () => void;
};

export const AdminGitPOAPRequestTableRow = ({
  active,
  gitPOAPRequest,
  setActiveGitPOAPRequest,
  setApproveGitPOAPRequest,
  setRejectGitPOAPRequest,
}: RowProps) => {
  const {
    id,
    createdAt,
    name,
    description,
    imageUrl,
    contributors,
    startDate,
    endDate,
    staffApprovalStatus,
    creatorEmail,
    address,
  } = gitPOAPRequest;

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const numberOfContributors = Object.values(contributors).flat().length;

  return (
    <>
      <TableRow active={active} onClick={setActiveGitPOAPRequest}>
        <td>
          <Text>{id}</Text>
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
          <Tooltip label={address.ethAddress}>
            <Text sx={{ whiteSpace: 'nowrap' }}>
              {address.ensName ?? shortenAddress(address.ethAddress)}
            </Text>
          </Tooltip>
        </td>
        <td>
          <Text>{creatorEmail.emailAddress}</Text>
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
        <td>
          <Group align="center" spacing="lg" noWrap>
            <Tooltip label="Approve" withArrow withinPortal>
              <ActionIcon
                color="blue"
                disabled={['APPROVED'].includes(gitPOAPRequest.staffApprovalStatus)}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setApproveGitPOAPRequest();
                }}
                variant="filled"
              >
                <MdCheck />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Reject" withArrow withinPortal>
              <ActionIcon
                color="blue"
                disabled={['APPROVED', 'REJECTED'].includes(gitPOAPRequest.staffApprovalStatus)}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setRejectGitPOAPRequest();
                }}
                variant="filled"
              >
                <MdClose />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Edit" withArrow withinPortal>
              <ActionIcon
                color="blue"
                component={NextLink}
                disabled={['APPROVED'].includes(gitPOAPRequest.staffApprovalStatus)}
                href={`/create/${id}`}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                variant="filled"
              >
                <MdOutlineEdit />
              </ActionIcon>
            </Tooltip>
          </Group>
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
