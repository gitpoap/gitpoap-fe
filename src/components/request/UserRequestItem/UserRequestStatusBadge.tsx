import { Badge } from '@mantine/core';
import { ExtraRedDark, PrimaryBlue, BackgroundPanel3 } from '../../../colors';
import { AdminApprovalStatus } from '../../../graphql/generated-gql';

const statusColors = {
  [AdminApprovalStatus.Pending]: BackgroundPanel3,
  [AdminApprovalStatus.Approved]: PrimaryBlue,
  [AdminApprovalStatus.Rejected]: ExtraRedDark,
};

export const UserRequestStatusBadge = ({ status }: { status: AdminApprovalStatus }) => {
  return (
    <Badge
      size="lg"
      variant="filled"
      style={{
        backgroundColor: statusColors[status],
      }}
    >
      {status}
    </Badge>
  );
};
