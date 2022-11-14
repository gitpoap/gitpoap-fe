import React from 'react';
import styled from 'styled-components';
import { Stack, Group, Divider as DividerUI, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Button } from '../../shared/elements';
import { BackgroundPanel2 } from '../../../colors';
import { GitPOAPBadgePopover } from '../RequestItem/GitPOAPBadgePopover';
import { UserRequestStatusBadge } from './UserRequestStatusBadge';
import { Link } from '../../shared/compounds/Link';
import { ContributorModal, ContributorsType } from '../RequestItem/ContributorModal';
import { BsPeopleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { DateTime } from 'luxon';
import { UserGitPoapRequestsQuery } from '../../../graphql/generated-gql';

type GitPOAPRequestRawType = UserGitPoapRequestsQuery['gitPOAPRequests'][number];

export interface GitPOAPRequestType extends GitPOAPRequestRawType {
  contributors: ContributorsType;
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
    adminApprovalStatus,
    contributors,
    createdAt,
    description,
    endDate,
    id,
    imageUrl,
    name,
    startDate,
  } = gitPOAPRequest;

  const [isContributorModalOpen, { open: openContributorModal, close: closeContributorModal }] =
    useDisclosure(false);
  const [isImagePopoverOpen, { open: openImagePopover, close: closeImagePopover }] =
    useDisclosure(false);

  const formattedStart = DateTime.fromISO(startDate).toLocaleString(DateTime.DATE_MED);
  const formattedEnd = DateTime.fromISO(endDate).toLocaleString(DateTime.DATE_MED);

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
              <UserRequestStatusBadge status={adminApprovalStatus} />
            </Group>
          </Stack>

          <Stack justify="space-between">
            <Text size={22} weight="bold">
              {name}
            </Text>
            <Text>{description}</Text>
            <Text>{`Achievement Dates: ${formattedStart} to ${formattedEnd}`}</Text>
            <Text>{`Created on ${DateTime.fromISO(createdAt).toFormat(
              'd LLL yyyy hh:mm a',
            )}`}</Text>
            <Group align="center" spacing="md">
              <Link
                href={adminApprovalStatus === 'APPROVED' ? `gp/${id}/manage` : `/create/${id}`}
                passHref
              >
                <Button leftIcon={<FaEdit />}>{'Edit'}</Button>
              </Link>
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
