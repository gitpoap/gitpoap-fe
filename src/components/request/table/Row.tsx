import { Text, Button, Group } from '@mantine/core';
import styled from 'styled-components';
import React from 'react';
import { GitPOAPBadgePopover } from '../../request/RequestItem/GitPOAPBadgePopover';
import { useDisclosure } from '@mantine/hooks';
import { RequestStatusBadge } from '../../request/RequestItem/RequestStatusBadge';
import { ContributorModal } from '../../request/RequestItem/ContributorModal';
import { BackgroundPanel } from '../../../colors';
import { UserGitPoapRequestsQuery } from '../../../graphql/generated-gql';
import { ContributorsObject } from '../../../lib/api/gitpoapRequest';
import { DateTime } from 'luxon';
import { Link } from '../../shared/compounds/Link';
import { FaEdit } from 'react-icons/fa';

const TableRow = styled.tr`
  &:hover {
    background-color: ${BackgroundPanel} !important;
  }
`;

type GitPOAPRequestRawType = UserGitPoapRequestsQuery['gitPOAPRequests'][number];

export interface GitPOAPRequestType extends GitPOAPRequestRawType {
  contributors: ContributorsObject;
}

type RowProps = {
  gitPOAPRequest: GitPOAPRequestType;
};

export const UserGitPOAPRequestTableRow = ({ gitPOAPRequest }: RowProps) => {
  const {
    staffApprovalStatus,
    contributors,
    createdAt,
    description,
    endDate,
    id,
    imageUrl,
    name,
    startDate,
    gitPOAP,
  } = gitPOAPRequest;
  // const router = useRouter();

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const numberOfContributors = Object.values(contributors).flat().length;
  const formattedStart = DateTime.fromISO(startDate, { zone: 'utc' }).toLocaleString(
    DateTime.DATE_MED,
  );
  const formattedEnd = DateTime.fromISO(endDate, { zone: 'utc' }).toLocaleString(DateTime.DATE_MED);
  const isPendingStaffApproval = staffApprovalStatus === 'APPROVED' && !gitPOAP?.id;

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
            size="xs"
          />
        </td>
        <td>
          <Text lineClamp={3}>{name}</Text>
        </td>
        <td>
          <Text lineClamp={3}>{description}</Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>{formattedStart}</Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>{formattedEnd}</Text>
        </td>
        <td>
          <Text>{DateTime.fromISO(createdAt).toRelative()}</Text>
        </td>
        <td>
          <Group>
            <Button
              disabled={numberOfContributors === 0}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                openContributorModal();
              }}
            >
              {'Contributors'}
            </Button>
            {!isPendingStaffApproval && (
              <Link
                href={
                  staffApprovalStatus === 'APPROVED' ? `/gp/${gitPOAP?.id}/manage` : `/create/${id}`
                }
                passHref
              >
                <Button leftIcon={<FaEdit />}>{'Edit'}</Button>
              </Link>
            )}
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
