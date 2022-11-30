import { Badge } from '@mantine/core';
import { ExtraRedDark, PrimaryBlue, BackgroundPanel3 } from '../../../colors';
import { StaffApprovalStatus } from '../../../graphql/generated-gql';

const statusColors = {
  [StaffApprovalStatus.Pending]: BackgroundPanel3,
  [StaffApprovalStatus.Approved]: PrimaryBlue,
  [StaffApprovalStatus.Rejected]: ExtraRedDark,
};

export const UserRequestStatusBadge = ({ status }: { status: StaffApprovalStatus }) => {
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
