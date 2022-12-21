import { Badge } from '@mantine/core';
import { MembershipAcceptanceStatus } from '../../../../graphql/generated-gql';

const StatusColor = {
  ACCEPTED: 'green',
  PENDING: 'blue',
};

export const AcceptanceStatusBadge = ({ status }: { status: MembershipAcceptanceStatus }) => {
  return (
    <Badge color={StatusColor[status]} size="sm" variant="filled">
      {status}
    </Badge>
  );
};
