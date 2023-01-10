import jwtDecode from 'jwt-decode';
import { DateTime } from 'luxon';
import { FIVE_MINUTES_IN_S, ONE_MONTH_IN_S } from '../../constants';
import { GITPOAP_API_URL } from '../../environment';
import { AccessTokenPayload, RefreshTokenPayload, Tokens } from '../../types';
import { JsonRpcSigner } from '@ethersproject/providers';

/* The methods that can be passed to the sign function */
export type Methods = 'POST /auth';

/* The parent class of all API endpoint collection classes - it handles
 * basic token management
 */
export class API {
  protected token: string | null;

  constructor(token?: string | null) {
    this.token = token ?? null;
  }
}

/**
 * This function makes a generic API request to the GitPOAP API.
 */
export const makeAPIRequest = async (
  endpoint: string,
  method: string,
  body?: BodyInit,
  headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
) => {
  try {
    const response = await fetch(`${GITPOAP_API_URL}${endpoint}`, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const refreshTokens = async (): Promise<Tokens | null> => {
  const refreshTokenRaw = localStorage.getItem('refreshToken');
  const refreshToken = refreshTokenRaw ? JSON.parse(refreshTokenRaw) : '';

  if (!refreshToken) {
    console.warn('No refresh token provided');
    return null;
  }

  const refreshTokenPayload = jwtDecode<RefreshTokenPayload>(refreshToken);
  const issuedAt = refreshTokenPayload?.iat ?? 0;
  const isExpired = DateTime.now().toUnixInteger() >= issuedAt + ONE_MONTH_IN_S;

  if (isExpired) {
    console.warn('The refresh token is expired');
    return null;
  }
  // refresh tokens
  const res = await makeAPIRequest(
    '/auth/refresh',
    'POST',
    JSON.stringify({ token: refreshToken }),
  );

  if (!res) {
    return null;
  }

  const tokens: Tokens = await res.json();

  localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken));
  localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));

  return tokens;
};

/**
 * This function makes a generic API request to the GitPOAP API &
 * also adds an Authorization header with the user's accessToken.
 */
export const makeAPIRequestWithAuth = async (
  endpoint: string,
  method: string,
  token: string | null,
  body?: BodyInit,
  headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
) => {
  let accessToken = token;
  if (!accessToken) {
    console.warn('No token provided');
    return null;
  }

  // check if access token is expired
  const payload = jwtDecode<AccessTokenPayload>(accessToken);
  const accessTokenExp = payload?.exp ?? 0;
  const isExpired = DateTime.now().toUnixInteger() + FIVE_MINUTES_IN_S > accessTokenExp;

  if (isExpired) {
    const tokens: Tokens | null = await refreshTokens();

    if (!tokens) {
      return null;
    }

    accessToken = tokens.accessToken;
  }

  const response = await makeAPIRequest(endpoint, method, body, {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  });

  return response;
};

/**
 * This function makes a generic API request to the GitPOAP API &
 * includes the full response object.
 */
export const makeAPIRequestWithResponse = async (
  endpoint: string,
  method: string,
  body?: BodyInit,
  headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
) => {
  const response = await fetch(`${GITPOAP_API_URL}${endpoint}`, {
    method,
    headers,
    body,
  });

  return response;
};

/**
 * This function makes a generic API request to the GitPOAP API &
 * includes the full response object while also adding an Authorization
 * header with the user's accessToken.
 */
export const makeAPIRequestWithResponseWithAuth = async (
  endpoint: string,
  method: string,
  token: string | null,
  body?: BodyInit,
  headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
) => {
  let accessToken = token;

  if (!accessToken) {
    console.warn('No token provided');
    return null;
  }

  // check if access token is expired
  const payload = jwtDecode<AccessTokenPayload>(accessToken);
  const accessTokenExp = payload?.exp ?? 0;
  const isExpired = DateTime.now().toUnixInteger() + FIVE_MINUTES_IN_S > accessTokenExp;

  if (isExpired) {
    const tokens: Tokens | null = await refreshTokens();

    if (!tokens) {
      return null;
    }

    accessToken = tokens.accessToken;
  }

  const response = await makeAPIRequestWithResponse(endpoint, method, body, {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  });

  return response;
};

export type SignatureData = {
  message: string;
  createdAt: number;
};

export function generateSignatureMessage(address: string, createdAt: number): string {
  return `This signature attests that I am ${address.toLowerCase()}, for the purpose of signing into GitPOAP.
Signing this message requires no ETH and will not create or send a transaction.
Created at: ${createdAt}.`;
}

export function generateSignatureData(address: string): SignatureData {
  const createdAt = Date.now();
  const message = generateSignatureMessage(address, createdAt);

  return { message, createdAt };
}

/**
 * This utility function signs a message with the user's wallet & returns the resulting
 * signature.
 */
export const sign = async (signer: JsonRpcSigner, message: string) => {
  try {
    return await signer.signMessage(message);
  } catch (e) {
    console.error(e);
    return null;
  }
};
