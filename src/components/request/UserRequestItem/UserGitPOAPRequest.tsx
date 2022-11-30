import React from 'react';
import styled from 'styled-components';
import { Stack, Group, Divider as DividerUI, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Button } from '../../shared/elements';
import { BackgroundPanel2 } from '../../../colors';
import { GitPOAPBadgePopover } from '../RequestItem/GitPOAPBadgePopover';
import { UserRequestStatusBadge } from './UserRequestStatusBadge';
import { Link } from '../../shared/compounds/Link';
import { ContributorModal } from '../RequestItem/ContributorModal';
import { BsPeopleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { DateTime } from 'luxon';
import { UserGitPoapRequestsQuery } from '../../../graphql/generated-gql';
import { ContributorsObject } from '../../../lib/api/gitpoapRequest';

type GitPOAPRequestRawType = UserGitPoapRequestsQuery['gitPOAPRequests'][number];

export interface GitPOAPRequestType extends GitPOAPRequestRawType {
  contributors: ContributorsObject;
}

type Props = {
  gitPOAPRequest: GitPOAPRequestType;
};

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};
  width: 100%;

  &:last-child {
    display: none;
  }
`;

export const UserGitPOAPRequest = ({ gitPOAPRequest }: Props) => {
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
    GitPOAP,
  } = gitPOAPRequest;

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const formattedStart = DateTime.fromISO(startDate, { zone: 'utc' }).toLocaleString(
    DateTime.DATE_MED,
  );
  const formattedEnd = DateTime.fromISO(endDate, { zone: 'utc' }).toLocaleString(DateTime.DATE_MED);
  const isPendingStaffApproval = staffApprovalStatus === 'APPROVED' && !GitPOAP?.id;

  return (
    <>
      <Stack>
        <Group align="stretch" position="left" spacing="md">
          <Stack>
            <GitPOAPBadgePopover
              isOpen={isImagePopoverOpen}
              onClose={closeImagePopover}
              onOpen={openImagePopover}
              imageUrl={imageUrl}
            />
            <Group position="center">
              <UserRequestStatusBadge status={staffApprovalStatus} />
            </Group>
          </Stack>

          <Stack justify="space-between">
            <Text size={22} weight="bold">
              {name}
            </Text>
            <Text>{description}</Text>
            <Text>{`From ${formattedStart} to ${formattedEnd}`}</Text>
            <Text>{`Created ${DateTime.fromISO(createdAt).toRelative()}`}</Text>
            <Group align="center" spacing="md">
              {!isPendingStaffApproval && (
                <Link
                  href={
                    staffApprovalStatus === 'APPROVED'
                      ? `/gp/${GitPOAP?.id}/manage`
                      : `/create/${id}`
                  }
                  passHref
                >
                  <Button leftIcon={<FaEdit />}>{'Edit'}</Button>
                </Link>
              )}
              {staffApprovalStatus === 'APPROVED' && !GitPOAP?.id}
              <Button onClick={openContributorModal} leftIcon={<BsPeopleFill />}>
                {'Contributors'}
              </Button>
            </Group>
          </Stack>
        </Group>
        <ContributorModal
          isOpen={isContributorModalOpen}
          onClose={closeContributorModal}
          contributors={contributors}
        />
      </Stack>
      <Divider />
    </>
  );
};
