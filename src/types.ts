export type GitPOAP = {
  id: number;
  name: string;
  description?: string;
  repoName: string;
  imgSrc: string;
};

export type Project = {
  id: number;
  name: string;
  createdAt: string;
  organization: {
    name: string;
  };
};

type POAPEvent = {
  id: number;
  name: string;
  description?: string;
  image_url: string;
};

export type POAP = {
  event: POAPEvent;
  tokenId: string;
};

export enum MetaMaskErrors {
  UserRejectedRequest = 4001,
}

export type MetaMaskError = {
  code: MetaMaskErrors;
  message: string;
  stack: string;
};

export type Level = 'bronze' | 'silver' | 'gold';

export type SignatureType = {
  address: string;
  signature: string;
  message: string;
  createdAt: number;
};

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
  emailId: number | null;
  discordId: number | null;
  discordHandle: string | null;
  exp: number;
  iat: number;
};

export type RefreshTokenPayload = {
  authTokenId: number;
  addressId: number;
  generation: number;
  iat: number;
};
