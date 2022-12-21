import { Text } from '@mantine/core';
import styled from 'styled-components';
import React from 'react';
import { TeamMembershipsQuery } from '../../../../graphql/generated-gql';
import { AcceptanceStatusBadge } from './AcceptanceStatusBadge';
import { BackgroundPanel2 } from '../../../../colors';
import { formatUTCDate } from '../../../../helpers';

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel2} !important;
  }
`;

type TeamMemberships = Exclude<TeamMembershipsQuery['teamMemberships'], undefined | null>;

type RowProps = {
  membership: TeamMemberships['memberships'][number];
};

export const MembershipRow = ({ membership }: RowProps) => {
  const { addressId, role, acceptanceStatus, joinedOn, createdAt } = membership;

  return (
    <>
      <TableRow>
        <td>
          <AcceptanceStatusBadge status={acceptanceStatus} />
        </td>
        <td>
          <Text lineClamp={3}>{addressId}</Text>
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
      </TableRow>
    </>
  );
};
