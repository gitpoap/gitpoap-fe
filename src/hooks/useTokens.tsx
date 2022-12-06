import { useLocalStorage } from '@mantine/hooks';
import jwtDecode from 'jwt-decode';
import { Tokens, AccessTokenPayload, RefreshTokenPayload } from '../types';

export const isTokens = (tokens: unknown): tokens is Tokens => {
  return (
    typeof tokens === 'object' &&
    tokens !== null &&
    typeof (tokens as Tokens).accessToken === 'string' &&
    typeof (tokens as Tokens).refreshToken === 'string'
  );
};

/**
 * This hook is used to get and set tokens, but does not contain any refresh logic.
 * Refresh logic is encapsulated in the useRefreshTokens hook instead.
 * @returns authentication token getters & setters.
 */
export const useTokens = () => {
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>({
    key: 'refreshToken',
    defaultValue: null,
  });

  const [accessToken, setAccessToken] = useLocalStorage<string | null>({
    key: 'accessToken',
    defaultValue: null,
  });

  let tokens = null;
  let payload = null;
  let refreshTokenPayload;
  if (accessToken && refreshToken) {
    tokens = {
      accessToken,
      refreshToken,
    };

    payload = jwtDecode<AccessTokenPayload>(accessToken);
    refreshTokenPayload = jwtDecode<RefreshTokenPayload>(refreshToken);
  }

  return { tokens, setRefreshToken, setAccessToken, payload, refreshTokenPayload };
};
