import { ADMIN_GITHUB_IDS } from '../constants';
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

  /*
   * Since admin status is determined by a GitHub ID, if it doesn't exist on the payload
   * the user is therefore not an admin
   */
  if (!payload?.githubId) {
    return false;
  }

  /* Check if the user's githubId is in the list of admins on the FE */
  const isAdmin = ADMIN_GITHUB_IDS.includes(payload.githubId);

  return isAdmin;
};
