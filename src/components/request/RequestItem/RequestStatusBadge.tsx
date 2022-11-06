import { Badge } from '@mantine/core';
import { ExtraRedDark, PrimaryBlue } from '../../../colors';
import { AdminApprovalStatus } from '../../../graphql/generated-gql';

export const RequestStatusBadge = ({ status }: { status: AdminApprovalStatus }) => {
  return (
    <Badge
      size="sm"
      variant="filled"
      style={{
        backgroundColor: status === AdminApprovalStatus.Rejected ? ExtraRedDark : PrimaryBlue,
      }}
    >
      {status}
    </Badge>
  );
};
