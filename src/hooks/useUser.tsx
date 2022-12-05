import { useIsStaff } from './useIsStaff';
import { useTokens } from './useTokens';
import { useConnectionStatus, ConnectionStatus } from './useConnectionStatus';

export type User = {
  addressId: number;
  address: string;
  githubId: number | null;
  githubHandle: string | null;
  discordId: number | null;
  discordHandle: string | null;
  ensName: string | null;
  ensAvatarImageUrl: string | null;
  capabilities: {
    hasGithub: boolean;
    hasEmail: boolean;
    hasDiscord: boolean;
  };
  permissions: {
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
  const { connectionStatus } = useConnectionStatus();

  let user = null;
  if (payload && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET) {
    user = {
      githubId: payload.githubId,
      githubHandle: payload.githubHandle,
      discordId: payload.discordId,
      discordHandle: payload.discordHandle,
      addressId: payload.addressId,
      address: payload.address,
      ensName: payload.ensName,
      ensAvatarImageUrl: payload.ensAvatarImageUrl,
      capabilities: {
        hasGithub: !!payload?.githubId,
        hasEmail: !!payload?.emailId,
        hasDiscord: !!payload?.discordId,
      },
      permissions: {
        isStaff,
      },
    };
  }

  return user;
};
