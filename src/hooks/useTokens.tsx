import { useLocalStorage } from '@mantine/hooks';
import jwtDecode from 'jwt-decode';

export type Tokens = {
  /* GitPOAP issued access token */
  accessToken: string;
  /* GitPOAP issued refresh token */
  refreshToken: string;
};

export type AccessTokenPayload = {
  authTokenId: number;
  addressId: number;
  address: string;
  ensName: string | null;
  ensAvatarImageUrl: string | null;
  githubId: number | null;
  githubHandle: string | null;
  exp: number;
  iat: number;
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
  if (accessToken && refreshToken) {
    tokens = {
      accessToken,
      refreshToken,
    };

    payload = jwtDecode<AccessTokenPayload>(accessToken);
  }

  return { tokens, setRefreshToken, setAccessToken, payload };
};