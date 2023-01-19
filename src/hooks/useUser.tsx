import { useIsStaff } from './useIsStaff';
import { useTokens } from './useTokens';
import { useWeb3Context, ConnectionStatus } from '../components/wallet/Web3Context';

export type User = {
  addressId: number;
  address: string;
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
  const { connectionStatus } = useWeb3Context();

  let user = null;
  if (payload && connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET) {
    user = {
      githubId: payload.githubId,
      githubHandle: payload.githubHandle,
      discordHandle: payload.discordHandle,
      addressId: payload.addressId,
      address: payload.ethAddress,
      ensName: payload.ensName,
      ensAvatarImageUrl: payload.ensAvatarImageUrl,
      emailAddress: payload.emailAddress,
      capabilities: {
        hasGithub: !!payload?.githubId,
        hasEmail: !!payload?.emailAddress,
        hasDiscord: !!payload?.discordHandle,
      },
      permissions: {
        isStaff,
      },
    };
  }

  return user;
};
