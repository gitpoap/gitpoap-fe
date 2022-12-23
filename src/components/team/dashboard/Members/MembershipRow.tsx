import React from 'react';
import { MdDelete } from 'react-icons/md';
import { TeamMembershipsQuery } from '../../../../graphql/generated-gql';
import { AcceptanceStatusBadge } from './AcceptanceStatusBadge';
import { formatUTCDate } from '../../../../helpers';
import { Button, Text } from '../../../shared/elements';
import { Link } from '../../../shared/compounds/Link';

type TeamMemberships = Exclude<TeamMembershipsQuery['teamMemberships'], undefined | null>;

type RowProps = {
  teamId: number;
  membership: TeamMemberships['memberships'][number];
  openRemoveModal: (address: string) => void;
};

export const MembershipRow = ({ membership, openRemoveModal }: RowProps) => {
  const { role, acceptanceStatus, joinedOn, address } = membership;

  return (
    <>
      <tr>
        <td>
          <AcceptanceStatusBadge status={acceptanceStatus} />
        </td>
        <td>
          <Link href={`/p/${address.ethAddress}`}>
            <Text lineClamp={3} variant="link">
              {address.ethAddress}
            </Text>
          </Link>
        </td>
        <td>
          <Text lineClamp={3}>{role}</Text>
        </td>
        <td>
          <Text sx={{ whiteSpace: 'nowrap' }}>{joinedOn ? formatUTCDate(joinedOn) : ''}</Text>
        </td>
        <td>
          <Button onClick={() => openRemoveModal(address.ethAddress)}>
            <MdDelete />
          </Button>
        </td>
      </tr>
    </>
  );
};
