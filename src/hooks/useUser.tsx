import { useIsAdmin } from './useIsAdmin';
import { useTokens } from './useTokens';

type User = {
  addressId: number;
  address: string;
  githubId: number | null;
  githubHandle: string | null;
  ensName: string | null;
  ensAvatarImageUrl: string | null;
  capabilities: {
    hasGithub: boolean;
  };
  permissions: {
    isAdmin: boolean;
  };
};

/**
 * This hook returns a standardized user object that can be used to access
 * properties of the current user from a single place.
 */
export const useUser = (): User | null => {
  const { payload } = useTokens();
  const isAdmin = useIsAdmin();

  let user = null;
  if (payload) {
    user = {
      githubId: payload.githubId,
      githubHandle: payload.githubHandle,
      addressId: payload.addressId,
      address: payload.address,
      ensName: payload.ensName,
      ensAvatarImageUrl: payload.ensAvatarImageUrl,
      capabilities: {
        hasGithub: !!payload?.githubId,
      },
      permissions: {
        isAdmin,
      },
    };
  }

  return user;
};
