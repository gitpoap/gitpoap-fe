import { STAFF_GITHUB_IDS, STAFF_ADDRESSES } from '../constants';
import { useIsDev } from './useIsDev';
import { useTokens } from './useTokens';

/**
 * This hook is used to check whether a user is a GitPOAP staff member. It provides
 * minimal soft-gating for staff pages.
 *
 * @returns boolean
 */
export const useIsStaff = (): boolean => {
  const { payload } = useTokens();
  const isDev = useIsDev();

  /* If we're in the dev environment, all users are considered staff */
  if (isDev) {
    return true;
  }

  // check if payload is null
  if (!payload) {
    return false;
  }

  /* Check if the user's address is in the list of staff on the FE */
  const isStaffAddress = STAFF_ADDRESSES.includes(payload.address);

  /*
   * Since staff status is determined by a GitHub ID or address, if githubId doesn't exist on the payload
   * if address is not staff, the user is not a staff member
   */
  if (!payload.githubId) {
    return isStaffAddress;
  }

  /* Check if the user's githubId is in the list of staff on the FE */
  const isStaffGithubId = STAFF_GITHUB_IDS.includes(payload.githubId);

  return isStaffAddress || isStaffGithubId;
};
