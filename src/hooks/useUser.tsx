import { useWeb3React } from '@web3-react/core';
import { useIsStaff } from './useIsStaff';
import { useTokens } from './useTokens';
import { useWeb3Context, ConnectionStatus } from '../components/wallet/Web3Context';

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
  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  let user = null;
  if (payload && isConnected) {
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
