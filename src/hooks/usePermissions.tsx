import { useEffect, useState } from 'react';
import { useUserPermissionsQuery } from '../graphql/generated-gql';

type Permissions = {
  canCreateCGs: boolean;
  isStaff: boolean;
};

const DefaultPermissions: Permissions = {
  canCreateCGs: false,
  isStaff: false,
};

/**
 * This hook is used to get the current user's permissions.
 */
export const usePermissions = (): Permissions => {
  const [permissions, setPermissions] = useState<Permissions>(DefaultPermissions);
  const [permissionsQuery] = useUserPermissionsQuery();

  useEffect(() => {
    if (permissionsQuery.data) {
      setPermissions(permissionsQuery.data.userPermissions);
    }
  }, [permissionsQuery.data]);

  return permissions;
};
