import { useLocalStorage } from '@mantine/hooks';
import jwtDecode from 'jwt-decode';
import { Tokens, AccessTokenPayload } from '../types';

const ACCESS_TOKEN_KEY = 'accessToken';

export const isTokens = (tokens: unknown): tokens is Tokens => {
  return (
    typeof tokens === 'object' &&
    tokens !== null &&
    typeof (tokens as Tokens).accessToken === 'string'
  );
};

export const getAccessToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  return accessToken ? JSON.parse(accessToken) : null;
};

/**
 * This hook is used to get and set tokens, but does not contain any refresh logic.
 * @returns authentication token getters & setters.
 */
export const useTokens = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>({
    key: ACCESS_TOKEN_KEY,
    defaultValue: null,
  });

  let tokens = null;
  let payload = null;
  if (accessToken) {
    tokens = {
      accessToken,
    };

    payload = jwtDecode<AccessTokenPayload>(accessToken);
  }

  return { tokens, setAccessToken, payload };
};
