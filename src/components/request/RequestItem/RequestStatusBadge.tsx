import { Badge } from '@mantine/core';
import { StaffApprovalStatus } from '../../../graphql/generated-gql';

export const RequestStatusBadge = ({ status }: { status: StaffApprovalStatus }) => {
  return (
    <Badge
      color={
        {
          APPROVED: 'green',
          PENDING: 'blue',
          REJECTED: 'red',
        }[status]
      }
      size="sm"
      variant="filled"
    >
      {status}
    </Badge>
  );
};
