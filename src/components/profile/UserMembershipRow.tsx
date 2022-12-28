import React from 'react';
import styled from 'styled-components';
import { Group } from '@mantine/core';
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
import { formatUTCDate } from '../../helpers';
import { Button, Text } from '../shared/elements';

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
  const { id, role, acceptanceStatus, joinedOn, teamId, team } = membership;

  const [, acceptMembership] = useAcceptMembershipMutation();
  const [, removeMember] = useRemoveMembershipMutation();

  const handleAccept = () =>
    openConfirmModal({
      title: 'Accept this membership?',
      centered: true,
      children: (
        <Text size="sm">
          {`Are you sure you want to accept this membership from `}
          <b>{team.name}</b>
          {` ?`}
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        void acceptMembership({ teamId });
      },
    });

  const handleReject = () =>
    openConfirmModal({
      title: 'Reject this membership?',
      centered: true,
      children: (
        <Text size="sm">
          {`Are you sure you want to reject this membership from `}
          <b>{team.name}</b>
          {` ?`}
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        void removeMember({ membershipId: id });
      },
    });

  return (
    <>
      <TableRow>
        <td>
          <AcceptanceStatusBadge status={acceptanceStatus} />
        </td>
        <td>
          <Text lineClamp={3}>{team.name}</Text>
        </td>
        <td>
          <Text lineClamp={3}>{role}</Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>{joinedOn ? formatUTCDate(joinedOn) : ''}</Text>
        </td>
        <td>
          {acceptanceStatus === MembershipAcceptanceStatus.Pending && (
            <Group align={'center'}>
              <Button onClick={handleAccept} compact>
                <FaCheckCircle />
              </Button>
              <Button onClick={handleReject} compact>
                <FaTimesCircle />
              </Button>
            </Group>
          )}
        </td>
      </TableRow>
    </>
  );
};
