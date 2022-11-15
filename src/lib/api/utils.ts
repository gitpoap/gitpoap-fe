import { GITPOAP_API_URL } from '../../constants';
import { JsonRpcSigner } from '@ethersproject/providers';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

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
  if (!token) {
    console.warn('No token provided');
    return null;
  }

  const response = await makeAPIRequest(endpoint, method, body, {
    ...headers,
    Authorization: `Bearer ${token}`,
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
  if (!token) {
    console.warn('No token provided');
    return null;
  }

  const response = await makeAPIRequestWithResponse(endpoint, method, body, {
    ...headers,
    Authorization: `Bearer ${token}`,
  });

  return response;
};

type SignatureData = {
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
