import {
  Web3Provider,
  ExternalProvider,
  JsonRpcFetchFunc,
  JsonRpcSigner,
} from '@ethersproject/providers';

/* Shorten check-summed version of the input address ~ 0x + 4 chars @ start + end */
export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}…${address.substring(42 - chars)}`;
}

export const truncateAddress = (address: string, startChars = 14, endChars = 4): string => {
  if (address === '') {
    return '';
  }

  return address.slice(0, startChars) + '…' + address.slice(-endChars);
};

export const truncateString = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + '…' : str;
};

export const isValidURL = (str: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator

  return !!pattern.test(str);
};

/**
 * Github username may only contain alphanumeric characters or hyphens.
 * Github username cannot have multiple consecutive hyphens.
 * Github username cannot begin or end with a hyphen.
 * Maximum is 39 characters.
 */
export const isValidGithubHandle = (handle: string): boolean =>
  /^(?![-])(?!.*[-]{2})(?!.*[-]$)[a-zA-Z0-9-]{1,39}$/.test(handle);

/**
 * Temporary validator that prevents the GitHub handle from starting with 0x
 */
export const isValidGithubHandleWithout0x = (handle: string): boolean =>
  /^(?![-])(?!0x)(?!.*[-]{2})(?!.*[-]$)[a-zA-Z0-9-]{1,39}$/.test(handle);

export const isValidTwitterHandle = (handle: string): boolean =>
  /^[a-zA-Z0-9_]{4,15}$/.test(handle);

export const fetchWithToken = async (url: string, token: string | null) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok || response.status >= 400) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const getWeb3Provider = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  return new Web3Provider(provider);
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
