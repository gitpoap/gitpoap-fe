/**
 * This hook is used to determine if the component is being rendered
 * on the client or server.
 *
 * @returns {boolean} - true if the component is being rendered on the client
 */
export const useIsClient = (): boolean => {
  return typeof window !== 'undefined';
};
