import { MembershipRole } from './graphql/generated-gql';

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
};

export type Memberships = {
  teamId: number;
  role: MembershipRole;
}[];

export type AddressPayload = {
  id: number;
  ethAddress: string;
  ensName: string | null;
  ensAvatarImageUrl: string | null;
};

export type GithubPayload = {
  id: number;
  githubId: number;
  githubHandle: string;
};

export type EmailPayload = {
  id: number;
  emailAddress: string;
};

export type DiscordPayload = {
  id: number;
  discordId: string;
  discordHandle: string;
};

export type MembershipPayload = {
  teamId: number;
  role: MembershipRole;
};

export type MembershipsPayload = MembershipPayload[];

export type AccessTokenPayload = {
  privyUserId: string;
  address: AddressPayload | null;
  github: GithubPayload | null;
  email: EmailPayload | null;
  discord: DiscordPayload | null;
  memberships: MembershipsPayload;
};
