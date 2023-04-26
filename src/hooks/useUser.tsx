import { useIsStaff } from './useIsStaff';
import { useTokens } from './useTokens';
import { useWeb3Context, ConnectionStatus } from '../components/wallet/Web3Context';
import { usePermissions } from './usePermissions';

export type User = {
  addressId: number | null;
  address: string | null;
  githubId: number | null;
  githubHandle: string | null;
  discordHandle: string | null;
  ensName: string | null;
  ensAvatarImageUrl: string | null;
  emailAddress: string | null;
  capabilities: {
    hasGithub: boolean;
    hasEmail: boolean;
    hasDiscord: boolean;
  };
  permissions: {
    canCreateCGs: boolean;
    isStaff: boolean;
  };
};

/**
 * This hook returns a standardized user object that can be used to access
 * properties of the current user from a single place.
 */
export const useUser = (): User | null => {
  const { payload } = useTokens();
  const isStaff = useIsStaff();
  const permissions = usePermissions();
  const { connectionStatus } = useWeb3Context();

  let user = null;
  if (payload && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET) {
    user = {
      githubId: payload.github?.githubId ?? null,
      githubHandle: payload.github?.githubHandle ?? null,
      discordHandle: payload.discord?.discordHandle ?? null,
      addressId: payload.address?.id ?? null,
      address: payload.address?.ethAddress ?? null,
      ensName: payload.address?.ensName ?? null,
      ensAvatarImageUrl: payload.address?.ensAvatarImageUrl ?? null,
      emailAddress: payload.email?.emailAddress ?? null,
      capabilities: {
        hasGithub: !!payload.github?.githubId,
        hasEmail: !!payload.email?.emailAddress,
        hasDiscord: !!payload.discord?.discordHandle,
      },
      permissions: {
        canCreateCGs: permissions.canCreateCGs,
        isStaff,
      },
    };
  }

  return user;
};
