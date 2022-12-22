import { useLocalStorage } from '@mantine/hooks';
import jwtDecode from 'jwt-decode';
import { Tokens, AccessTokenPayload, RefreshTokenPayload } from '../types';

const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_KEY = 'accessToken';

export const isTokens = (tokens: unknown): tokens is Tokens => {
  return (
    typeof tokens === 'object' &&
    tokens !== null &&
    typeof (tokens as Tokens).accessToken === 'string' &&
    typeof (tokens as Tokens).refreshToken === 'string'
  );
};

export const getAccessToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  return accessToken?.slice(1, -1);
};

/**
 * This hook is used to get and set tokens, but does not contain any refresh logic.
 * Refresh logic is encapsulated in the useRefreshTokens hook instead.
 * @returns authentication token getters & setters.
 */
export const useTokens = () => {
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>({
    key: REFRESH_TOKEN_KEY,
    defaultValue: null,
  });

  const [accessToken, setAccessToken] = useLocalStorage<string | null>({
    key: ACCESS_TOKEN_KEY,
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
