/**
 * This hook is used to check whether the application is currently in the development
 * environment via the NEXT_PUBLIC_SENTRY_ENVIRONMENT environment variable.
 *
 * Note: The name of the variable could likely be changed to be more general in the future.
 *
 * @returns boolean
 */
export const useIsDev = () => {
  const isDev = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'development';

  return isDev;
};
