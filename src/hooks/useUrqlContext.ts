import { useMemo } from 'react';
import { useTokens } from './useTokens';

/**
 * This hook is used to get urql context with access token in its header.
 * @returns urql context
 */
export const useUrqlContext = () => {
  const { tokens } = useTokens();
  const accessToken = tokens?.accessToken ?? null;

  const context = useMemo(
    () => ({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    }),
    [accessToken],
  );

  return context;
};
