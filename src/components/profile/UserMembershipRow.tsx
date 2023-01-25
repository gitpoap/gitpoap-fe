import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Group } from '@mantine/core';
import { DateTime } from 'luxon';
import { openConfirmModal } from '@mantine/modals';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import {
  UserMembershipsQuery,
  MembershipAcceptanceStatus,
  useAcceptMembershipMutation,
  useRemoveMembershipMutation,
} from '../../graphql/generated-gql';
import { AcceptanceStatusBadge } from '../team/dashboard/Members/AcceptanceStatusBadge';
import { BackgroundPanel2 } from '../../colors';
import { Button, Text, RelativeDate } from '../shared/elements';
import { useTeamsContext } from '../team/TeamsContext';
import { Notifications } from '../../notifications';
import { TeamLogo } from '../team/settings/TeamLogo';

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel2} !important;
  }
`;

type UserMemberships = Exclude<UserMembershipsQuery['userMemberships'], undefined | null>;

type RowProps = {
  membership: UserMemberships['memberships'][number];
};

export const UserMembershipRow = ({ membership }: RowProps) => {
  const router = useRouter();
  const { setTeamId } = useTeamsContext();

  const { id, role, acceptanceStatus, joinedOn, teamId, team } = membership;

  const [, acceptMembership] = useAcceptMembershipMutation();
  const [, removeMember] = useRemoveMembershipMutation();

  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    openConfirmModal({
      title: (
        <Text size={28} sx={{ fontFamily: 'VT323' }}>
          Accept invitation?
        </Text>
      ),
      centered: true,
      children: (
        <Text size="sm">
          {`Are you sure you want to accept this invitation from `}
          <b>{team.name}</b>
          {` ?`}
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      cancelProps: {
        color: 'red',
        variant: 'outline',
      },
      confirmProps: {
        variant: 'outline',
      },
      onConfirm: async () => {
        const result = await acceptMembership({ teamId });
        if (result.error) {
          Notifications.error(`Error - Request Failed to accept an invite`);
        } else {
          Notifications.success(`Success - Accepted an invite`);
        }
      },
    });
  };

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    openConfirmModal({
      title: (
        <Text size={28} sx={{ fontFamily: 'VT323' }}>
          Reject invitation?
        </Text>
      ),
      centered: true,
      cancelProps: {
        color: 'red',
        variant: 'outline',
      },
      confirmProps: {
        variant: 'outline',
      },
      children: (
        <Text size="sm">
          {`Are you sure you want to reject this invitation from `}
          <b>{team.name}</b>
          {` ?`}
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        const result = await removeMember({ membershipId: id });
        if (result.error) {
          Notifications.error(`Error - Request Failed to reject an invite`);
        } else {
          Notifications.success(`Success - Rejected an invite`);
        }
      },
    });
  };

  const handleClick = async () => {
    setTeamId(teamId);

    await router.push('/app/team/dashboard');
  };

  return (
    <TableRow onClick={handleClick}>
      <td>
        <Group>
          <TeamLogo name={team.name} size={40} imageUrl={team.logoImageUrl} />
          <Text lineClamp={3}>{team.name}</Text>
        </Group>
      </td>
      <td>
        <Text lineClamp={3}>{role}</Text>
      </td>
      <td>
        <AcceptanceStatusBadge status={acceptanceStatus} />
      </td>
      <td>
        <RelativeDate sx={{ whiteSpace: 'nowrap' }} date={DateTime.fromISO(joinedOn)} />
      </td>
      <td>
        {acceptanceStatus === MembershipAcceptanceStatus.Pending && (
          <Group align={'center'} noWrap>
            <Button onClick={handleAccept} leftIcon={<FaCheckCircle />} compact>
              {'Accept'}
            </Button>
            <Button onClick={handleReject} leftIcon={<FaTimesCircle />} compact>
              {'Deny'}
            </Button>
          </Group>
        )}
      </td>
    </TableRow>
  );
};
