import React from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { TeamMembershipsQuery } from '../../../../graphql/generated-gql';
import { AcceptanceStatusBadge } from './AcceptanceStatusBadge';
import { BackgroundPanel2 } from '../../../../colors';
import { formatUTCDate } from '../../../../helpers';
import { Button, Text } from '../../../shared/elements';
import { RemoveMemberModal } from './RemoveMemberModal';

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel2} !important;
  }
`;

type TeamMemberships = Exclude<TeamMembershipsQuery['teamMemberships'], undefined | null>;

type RowProps = {
  teamId: number;
  membership: TeamMemberships['memberships'][number];
  openRemoveModal: () => void;
  closeRemoveModal: () => void;
  isRemoveModalOpen: boolean;
};

export const MembershipRow = ({
  teamId,
  membership,
  isRemoveModalOpen,
  openRemoveModal,
  closeRemoveModal,
}: RowProps) => {
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
        <td>
          <Button onClick={openRemoveModal}>
            <MdDelete />
          </Button>
        </td>
      </TableRow>
      <RemoveMemberModal
        teamId={teamId}
        address={'0xE078c3BDEe620829135e1ab526bE860498B06339'}
        isOpen={isRemoveModalOpen}
        onClose={closeRemoveModal}
      />
    </>
  );
};
