import { useWeb3Context } from '../components/wallet/Web3Context';
import { useIsAdmin } from './useIsAdmin';
import { useTokens } from './useTokens';

export type User = {
  addressId: number;
  address: string;
  githubId: number | null;
  githubHandle: string | null;
  ensName: string | null;
  ensAvatarImageUrl: string | null;
  capabilities: {
    hasGithub: boolean;
    hasEmail: boolean;
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
  const { connectionStatus } = useWeb3Context();

  let user = null;
  if (payload && connectionStatus === 'connected-to-wallet') {
    user = {
      githubId: payload.githubId,
      githubHandle: payload.githubHandle,
      addressId: payload.addressId,
      address: payload.address,
      ensName: payload.ensName,
      ensAvatarImageUrl: payload.ensAvatarImageUrl,
      capabilities: {
        hasGithub: !!payload?.githubId,
        hasEmail: !!payload?.emailId,
      },
      permissions: {
        isAdmin,
      },
    };
  }

  return user;
};
