import { GITPOAP_API_URL } from '../../constants';
import { JsonRpcSigner } from '@ethersproject/providers';
import { Methods } from './types';

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
 * This utility function signs a message with the user's wallet & returns the resulting
 * signature.
 */
export const sign = async <DataType = unknown>(
  signer: JsonRpcSigner,
  timestamp: number,
  method: Methods,
  data: DataType,
) => {
  try {
    return await signer.signMessage(
      JSON.stringify({
        site: 'gitpoap.io',
        method,
        createdAt: timestamp,
        data,
      }),
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};