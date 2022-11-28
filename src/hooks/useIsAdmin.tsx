import { ADMIN_GITHUB_IDS, ADMIN_ADDRESSES } from '../constants';
import { useIsDev } from './useIsDev';
import { useTokens } from './useTokens';

/**
 * This hook is used to check whether a user is a GitPOAP Admin. It provides
 * minimal soft-gating for admin pages.
 *
 * @returns boolean
 */
export const useIsAdmin = (): boolean => {
  const { payload } = useTokens();
  const isDev = useIsDev();

  /* If we're in the dev environment, all users are considered admins */
  if (isDev) {
    return true;
  }

  // check if payload is null
  if (!payload) {
    return false;
  }

  /* Check if the user's address is in the list of admins on the FE */
  const isAdminAddress = ADMIN_ADDRESSES.includes(payload.address);

  /*
   * Since admin status is determined by a GitHub ID or address, if githubId doesn't exist on the payload
   * if address is not admin, the user is not an admin
   */
  if (!payload.githubId) {
    return isAdminAddress;
  }

  /* Check if the user's githubId is in the list of admins on the FE */
  const isAdminGithubId = ADMIN_GITHUB_IDS.includes(payload.githubId);

  return isAdminAddress || isAdminGithubId;
};
