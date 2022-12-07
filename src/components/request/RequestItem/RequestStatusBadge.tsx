import { Badge } from '@mantine/core';
import { StaffApprovalStatus } from '../../../graphql/generated-gql';

const StatusColor = {
  APPROVED: 'green',
  PENDING: 'blue',
  REJECTED: 'red',
};

export const RequestStatusBadge = ({ status }: { status: StaffApprovalStatus }) => {
  return (
    <Badge color={StatusColor[status]} size="sm" variant="filled">
      {status}
    </Badge>
  );
};
