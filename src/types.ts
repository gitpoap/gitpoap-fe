export type UserClaim = {
  claim: {
    id: number;
    gitPOAP: {
      id: number;
      repo: {
        name?: string;
        organization: {
          name: string;
        };
      };
    };
  };
  event: {
    name: string;
    image_url: string;
    description: string;
  };
};

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
