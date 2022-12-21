import React, { useCallback } from 'react';
import { Loader } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';
import {
  UserMembershipsQuery,
  MembershipAcceptanceStatus,
  useAcceptMembershipMutation,
} from '../../graphql/generated-gql';
import { AcceptanceStatusBadge } from '../team/dashboard/Members/AcceptanceStatusBadge';
import { BackgroundPanel2 } from '../../colors';
import { formatUTCDate } from '../../helpers';
import { Button, Text } from '../shared/elements';
import { useUrqlContext } from '../../hooks/useUrqlContext';

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
  const { role, acceptanceStatus, joinedOn, createdAt, teamId, team } = membership;
  const context = useUrqlContext();

  const [result, acceptMembership] = useAcceptMembershipMutation();

  const handleAccept = useCallback(async () => {
    await acceptMembership({ teamId }, context);
  }, [teamId, acceptMembership, context]);

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
          <Text sx={{ whiteSpace: 'nowrap' }}>{formatUTCDate(createdAt)}</Text>
        </td>
        <td>
          {acceptanceStatus === MembershipAcceptanceStatus.Pending && (
            <Button onClick={handleAccept} disabled={result.fetching}>
              {result.fetching ? <Loader /> : <AiFillCheckCircle size={rem(16)} />}
            </Button>
          )}
        </td>
      </TableRow>
    </>
  );
};
