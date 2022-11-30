import { Badge } from '@mantine/core';
import { ExtraRedDark, PrimaryBlue } from '../../../colors';
import { StaffApprovalStatus } from '../../../graphql/generated-gql';

export const RequestStatusBadge = ({ status }: { status: StaffApprovalStatus }) => {
  return (
    <Badge
      size="sm"
      variant="filled"
      style={{
        backgroundColor: status === StaffApprovalStatus.Rejected ? ExtraRedDark : PrimaryBlue,
      }}
    >
      {status}
    </Badge>
  );
};
