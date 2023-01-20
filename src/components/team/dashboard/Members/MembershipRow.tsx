import { DateTime } from 'luxon';
import React from 'react';
import { MdDelete } from 'react-icons/md';

import { TeamMembershipsQuery, MembershipRole } from '../../../../graphql/generated-gql';
import { shortenAddress } from '../../../../helpers';
import { useUser } from '../../../../hooks/useUser';
import { Link } from '../../../shared/compounds/Link';
import { Button, Text, RelativeDate } from '../../../shared/elements';
import { TableRow } from '../../../shared/elements/Table';
import { AcceptanceStatusBadge } from './AcceptanceStatusBadge';

type TeamMemberships = Exclude<TeamMembershipsQuery['teamMemberships'], undefined | null>;

export type Address = TeamMemberships['memberships'][number]['address'];

type RowProps = {
  teamId: number;
  membership: TeamMemberships['memberships'][number];
  openRemoveModal: (membershipId: number, address: Address) => void;
};

export const MembershipRow = ({ membership, openRemoveModal }: RowProps) => {
  const user = useUser();
  const { id, role, acceptanceStatus, joinedOn, address } = membership;

  return (
    <TableRow>
      <td>
        <AcceptanceStatusBadge status={acceptanceStatus} />
      </td>
      <td>
        <Link href={`/p/${address.ethAddress}`}>
          <Text lineClamp={3} variant="link">
            {address.ensName ?? shortenAddress(address.ethAddress)}
          </Text>
        </Link>
      </td>
      <td>
        <Text lineClamp={3}>{role}</Text>
      </td>
      <td>
        <RelativeDate sx={{ whiteSpace: 'nowrap' }} date={DateTime.fromISO(joinedOn)} />
      </td>
      <td>
        {role !== MembershipRole.Owner && address.ethAddress !== user?.address && (
          <Button onClick={() => openRemoveModal(id, address)} compact>
            <MdDelete />
          </Button>
        )}
      </td>
    </TableRow>
  );
};
