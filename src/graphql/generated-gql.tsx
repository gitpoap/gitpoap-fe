import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AggregateClaim = {
  __typename?: 'AggregateClaim';
  _avg?: Maybe<ClaimAvgAggregate>;
  _count?: Maybe<ClaimCountAggregate>;
  _max?: Maybe<ClaimMaxAggregate>;
  _min?: Maybe<ClaimMinAggregate>;
  _sum?: Maybe<ClaimSumAggregate>;
};

export type AggregateFeaturedPoap = {
  __typename?: 'AggregateFeaturedPOAP';
  _avg?: Maybe<FeaturedPoapAvgAggregate>;
  _count?: Maybe<FeaturedPoapCountAggregate>;
  _max?: Maybe<FeaturedPoapMaxAggregate>;
  _min?: Maybe<FeaturedPoapMinAggregate>;
  _sum?: Maybe<FeaturedPoapSumAggregate>;
};

export type AggregateGitPoap = {
  __typename?: 'AggregateGitPOAP';
  _avg?: Maybe<GitPoapAvgAggregate>;
  _count?: Maybe<GitPoapCountAggregate>;
  _max?: Maybe<GitPoapMaxAggregate>;
  _min?: Maybe<GitPoapMinAggregate>;
  _sum?: Maybe<GitPoapSumAggregate>;
};

export type AggregateGithubPullRequest = {
  __typename?: 'AggregateGithubPullRequest';
  _avg?: Maybe<GithubPullRequestAvgAggregate>;
  _count?: Maybe<GithubPullRequestCountAggregate>;
  _max?: Maybe<GithubPullRequestMaxAggregate>;
  _min?: Maybe<GithubPullRequestMinAggregate>;
  _sum?: Maybe<GithubPullRequestSumAggregate>;
};

export type AggregateOrganization = {
  __typename?: 'AggregateOrganization';
  _avg?: Maybe<OrganizationAvgAggregate>;
  _count?: Maybe<OrganizationCountAggregate>;
  _max?: Maybe<OrganizationMaxAggregate>;
  _min?: Maybe<OrganizationMinAggregate>;
  _sum?: Maybe<OrganizationSumAggregate>;
};

export type AggregateProfile = {
  __typename?: 'AggregateProfile';
  _avg?: Maybe<ProfileAvgAggregate>;
  _count?: Maybe<ProfileCountAggregate>;
  _max?: Maybe<ProfileMaxAggregate>;
  _min?: Maybe<ProfileMinAggregate>;
  _sum?: Maybe<ProfileSumAggregate>;
};

export type AggregateRepo = {
  __typename?: 'AggregateRepo';
  _avg?: Maybe<RepoAvgAggregate>;
  _count?: Maybe<RepoCountAggregate>;
  _max?: Maybe<RepoMaxAggregate>;
  _min?: Maybe<RepoMinAggregate>;
  _sum?: Maybe<RepoSumAggregate>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type Claim = {
  __typename?: 'Claim';
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  gitPOAP: GitPoap;
  gitPOAPId: Scalars['Int'];
  id: Scalars['Int'];
  mintedAt?: Maybe<Scalars['DateTime']>;
  poapTokenId?: Maybe<Scalars['String']>;
  pullRequestEarned?: Maybe<GithubPullRequest>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  status: ClaimStatus;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Int'];
};

export type ClaimAvgAggregate = {
  __typename?: 'ClaimAvgAggregate';
  gitPOAPId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  pullRequestEarnedId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

export type ClaimAvgOrderByAggregateInput = {
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ClaimCountAggregate = {
  __typename?: 'ClaimCountAggregate';
  _all: Scalars['Int'];
  address: Scalars['Int'];
  createdAt: Scalars['Int'];
  gitPOAPId: Scalars['Int'];
  id: Scalars['Int'];
  mintedAt: Scalars['Int'];
  poapTokenId: Scalars['Int'];
  pullRequestEarnedId: Scalars['Int'];
  qrHash: Scalars['Int'];
  status: Scalars['Int'];
  updatedAt: Scalars['Int'];
  userId: Scalars['Int'];
};

export type ClaimCountOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ClaimGitPoapIdUserIdCompoundUniqueInput = {
  gitPOAPId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type ClaimGroupBy = {
  __typename?: 'ClaimGroupBy';
  _avg?: Maybe<ClaimAvgAggregate>;
  _count?: Maybe<ClaimCountAggregate>;
  _max?: Maybe<ClaimMaxAggregate>;
  _min?: Maybe<ClaimMinAggregate>;
  _sum?: Maybe<ClaimSumAggregate>;
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  gitPOAPId: Scalars['Int'];
  id: Scalars['Int'];
  mintedAt?: Maybe<Scalars['DateTime']>;
  poapTokenId?: Maybe<Scalars['String']>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  qrHash?: Maybe<Scalars['String']>;
  status: ClaimStatus;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Int'];
};

export type ClaimListRelationFilter = {
  every?: InputMaybe<ClaimWhereInput>;
  none?: InputMaybe<ClaimWhereInput>;
  some?: InputMaybe<ClaimWhereInput>;
};

export type ClaimMaxAggregate = {
  __typename?: 'ClaimMaxAggregate';
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  mintedAt?: Maybe<Scalars['DateTime']>;
  poapTokenId?: Maybe<Scalars['String']>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  qrHash?: Maybe<Scalars['String']>;
  status?: Maybe<ClaimStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['Int']>;
};

export type ClaimMaxOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ClaimMinAggregate = {
  __typename?: 'ClaimMinAggregate';
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  mintedAt?: Maybe<Scalars['DateTime']>;
  poapTokenId?: Maybe<Scalars['String']>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  qrHash?: Maybe<Scalars['String']>;
  status?: Maybe<ClaimStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['Int']>;
};

export type ClaimMinOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ClaimOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ClaimOrderByWithAggregationInput = {
  _avg?: InputMaybe<ClaimAvgOrderByAggregateInput>;
  _count?: InputMaybe<ClaimCountOrderByAggregateInput>;
  _max?: InputMaybe<ClaimMaxOrderByAggregateInput>;
  _min?: InputMaybe<ClaimMinOrderByAggregateInput>;
  _sum?: InputMaybe<ClaimSumOrderByAggregateInput>;
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ClaimOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gitPOAP?: InputMaybe<GitPoapOrderByWithRelationInput>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarned?: InputMaybe<GithubPullRequestOrderByWithRelationInput>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum ClaimScalarFieldEnum {
  Address = 'address',
  CreatedAt = 'createdAt',
  GitPoapId = 'gitPOAPId',
  Id = 'id',
  MintedAt = 'mintedAt',
  PoapTokenId = 'poapTokenId',
  PullRequestEarnedId = 'pullRequestEarnedId',
  QrHash = 'qrHash',
  Status = 'status',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
}

export type ClaimScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ClaimScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ClaimScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ClaimScalarWhereWithAggregatesInput>>;
  address?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  gitPOAPId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  mintedAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  poapTokenId?: InputMaybe<StringNullableWithAggregatesFilter>;
  pullRequestEarnedId?: InputMaybe<IntNullableWithAggregatesFilter>;
  status?: InputMaybe<EnumClaimStatusWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<IntWithAggregatesFilter>;
};

export enum ClaimStatus {
  Claimed = 'CLAIMED',
  Minting = 'MINTING',
  Pending = 'PENDING',
  Unclaimed = 'UNCLAIMED',
}

export type ClaimSumAggregate = {
  __typename?: 'ClaimSumAggregate';
  gitPOAPId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

export type ClaimSumOrderByAggregateInput = {
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum ClaimType {
  Annual = 'ANNUAL',
  Manual = 'MANUAL',
  Quarterly = 'QUARTERLY',
}

export type ClaimWhereInput = {
  AND?: InputMaybe<Array<ClaimWhereInput>>;
  NOT?: InputMaybe<Array<ClaimWhereInput>>;
  OR?: InputMaybe<Array<ClaimWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  gitPOAP?: InputMaybe<GitPoapRelationFilter>;
  gitPOAPId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  mintedAt?: InputMaybe<DateTimeNullableFilter>;
  poapTokenId?: InputMaybe<StringNullableFilter>;
  pullRequestEarned?: InputMaybe<GithubPullRequestRelationFilter>;
  pullRequestEarnedId?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<EnumClaimStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type ClaimWhereUniqueInput = {
  gitPOAPId_userId?: InputMaybe<ClaimGitPoapIdUserIdCompoundUniqueInput>;
  id?: InputMaybe<Scalars['Int']>;
  poapTokenId?: InputMaybe<Scalars['String']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EnumClaimStatusFilter = {
  equals?: InputMaybe<ClaimStatus>;
  in?: InputMaybe<Array<ClaimStatus>>;
  not?: InputMaybe<NestedEnumClaimStatusFilter>;
  notIn?: InputMaybe<Array<ClaimStatus>>;
};

export type EnumClaimStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumClaimStatusFilter>;
  _min?: InputMaybe<NestedEnumClaimStatusFilter>;
  equals?: InputMaybe<ClaimStatus>;
  in?: InputMaybe<Array<ClaimStatus>>;
  not?: InputMaybe<NestedEnumClaimStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<ClaimStatus>>;
};

export type EnumClaimTypeFilter = {
  equals?: InputMaybe<ClaimType>;
  in?: InputMaybe<Array<ClaimType>>;
  not?: InputMaybe<NestedEnumClaimTypeFilter>;
  notIn?: InputMaybe<Array<ClaimType>>;
};

export type EnumClaimTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumClaimTypeFilter>;
  _min?: InputMaybe<NestedEnumClaimTypeFilter>;
  equals?: InputMaybe<ClaimType>;
  in?: InputMaybe<Array<ClaimType>>;
  not?: InputMaybe<NestedEnumClaimTypeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<ClaimType>>;
};

export type EnumGitPoapStatusFilter = {
  equals?: InputMaybe<GitPoapStatus>;
  in?: InputMaybe<Array<GitPoapStatus>>;
  not?: InputMaybe<NestedEnumGitPoapStatusFilter>;
  notIn?: InputMaybe<Array<GitPoapStatus>>;
};

export type EnumGitPoapStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumGitPoapStatusFilter>;
  _min?: InputMaybe<NestedEnumGitPoapStatusFilter>;
  equals?: InputMaybe<GitPoapStatus>;
  in?: InputMaybe<Array<GitPoapStatus>>;
  not?: InputMaybe<NestedEnumGitPoapStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<GitPoapStatus>>;
};

export type Event = {
  __typename?: 'Event';
  _count?: Maybe<EventCount>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  githubHandle?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  location: Scalars['String'];
  name: Scalars['String'];
  organization: Scalars['String'];
  siteUrl?: Maybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type EventCount = {
  __typename?: 'EventCount';
  GitPOAP: Scalars['Int'];
};

export type EventOrderByWithRelationInput = {
  GitPOAP?: InputMaybe<GitPoapOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  location?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organization?: InputMaybe<SortOrder>;
  siteUrl?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EventRelationFilter = {
  is?: InputMaybe<EventWhereInput>;
  isNot?: InputMaybe<EventWhereInput>;
};

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  GitPOAP?: InputMaybe<GitPoapListRelationFilter>;
  NOT?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  githubHandle?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  imageUrl?: InputMaybe<StringNullableFilter>;
  location?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  organization?: InputMaybe<StringFilter>;
  siteUrl?: InputMaybe<StringNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  twitterHandle?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FeaturedPoap = {
  __typename?: 'FeaturedPOAP';
  id: Scalars['Int'];
  poapTokenId: Scalars['String'];
  profile: Profile;
  profileId: Scalars['Int'];
};

export type FeaturedPoapAvgAggregate = {
  __typename?: 'FeaturedPOAPAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  profileId?: Maybe<Scalars['Float']>;
};

export type FeaturedPoapAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type FeaturedPoapCountAggregate = {
  __typename?: 'FeaturedPOAPCountAggregate';
  _all: Scalars['Int'];
  id: Scalars['Int'];
  poapTokenId: Scalars['Int'];
  profileId: Scalars['Int'];
};

export type FeaturedPoapCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type FeaturedPoapGroupBy = {
  __typename?: 'FeaturedPOAPGroupBy';
  _avg?: Maybe<FeaturedPoapAvgAggregate>;
  _count?: Maybe<FeaturedPoapCountAggregate>;
  _max?: Maybe<FeaturedPoapMaxAggregate>;
  _min?: Maybe<FeaturedPoapMinAggregate>;
  _sum?: Maybe<FeaturedPoapSumAggregate>;
  id: Scalars['Int'];
  poapTokenId: Scalars['String'];
  profileId: Scalars['Int'];
};

export type FeaturedPoapListRelationFilter = {
  every?: InputMaybe<FeaturedPoapWhereInput>;
  none?: InputMaybe<FeaturedPoapWhereInput>;
  some?: InputMaybe<FeaturedPoapWhereInput>;
};

export type FeaturedPoapMaxAggregate = {
  __typename?: 'FeaturedPOAPMaxAggregate';
  id?: Maybe<Scalars['Int']>;
  poapTokenId?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['Int']>;
};

export type FeaturedPoapMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type FeaturedPoapMinAggregate = {
  __typename?: 'FeaturedPOAPMinAggregate';
  id?: Maybe<Scalars['Int']>;
  poapTokenId?: Maybe<Scalars['String']>;
  profileId?: Maybe<Scalars['Int']>;
};

export type FeaturedPoapMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type FeaturedPoapOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FeaturedPoapOrderByWithAggregationInput = {
  _avg?: InputMaybe<FeaturedPoapAvgOrderByAggregateInput>;
  _count?: InputMaybe<FeaturedPoapCountOrderByAggregateInput>;
  _max?: InputMaybe<FeaturedPoapMaxOrderByAggregateInput>;
  _min?: InputMaybe<FeaturedPoapMinOrderByAggregateInput>;
  _sum?: InputMaybe<FeaturedPoapSumOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type FeaturedPoapOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
};

export type FeaturedPoapPoapTokenIdProfileIdCompoundUniqueInput = {
  poapTokenId: Scalars['String'];
  profileId: Scalars['Int'];
};

export enum FeaturedPoapScalarFieldEnum {
  Id = 'id',
  PoapTokenId = 'poapTokenId',
  ProfileId = 'profileId',
}

export type FeaturedPoapScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<FeaturedPoapScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<FeaturedPoapScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<FeaturedPoapScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  poapTokenId?: InputMaybe<StringWithAggregatesFilter>;
  profileId?: InputMaybe<IntWithAggregatesFilter>;
};

export type FeaturedPoapSumAggregate = {
  __typename?: 'FeaturedPOAPSumAggregate';
  id?: Maybe<Scalars['Int']>;
  profileId?: Maybe<Scalars['Int']>;
};

export type FeaturedPoapSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type FeaturedPoapWhereInput = {
  AND?: InputMaybe<Array<FeaturedPoapWhereInput>>;
  NOT?: InputMaybe<Array<FeaturedPoapWhereInput>>;
  OR?: InputMaybe<Array<FeaturedPoapWhereInput>>;
  id?: InputMaybe<IntFilter>;
  poapTokenId?: InputMaybe<StringFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<IntFilter>;
};

export type FeaturedPoapWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  poapTokenId?: InputMaybe<Scalars['String']>;
  poapTokenId_profileId?: InputMaybe<FeaturedPoapPoapTokenIdProfileIdCompoundUniqueInput>;
};

export type FullClaimData = {
  __typename?: 'FullClaimData';
  claim: Claim;
  event: PoapEvent;
};

export type FullGitPoapEventData = {
  __typename?: 'FullGitPOAPEventData';
  event: PoapEvent;
  gitPOAP: GitPoap;
};

export type GitPoap = {
  __typename?: 'GitPOAP';
  _count?: Maybe<GitPoapCount>;
  claims: Array<Claim>;
  createdAt: Scalars['DateTime'];
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  level: Scalars['Int'];
  ongoing: Scalars['Boolean'];
  poapEventId: Scalars['Int'];
  redeemCodes: Array<RedeemCode>;
  repo: Repo;
  repoId: Scalars['Int'];
  status: GitPoapStatus;
  threshold: Scalars['Int'];
  type: ClaimType;
  updatedAt: Scalars['DateTime'];
  year: Scalars['Int'];
};

export type GitPoapClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type GitPoapRedeemCodesArgs = {
  cursor?: InputMaybe<RedeemCodeWhereUniqueInput>;
  distinct?: InputMaybe<Array<RedeemCodeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RedeemCodeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RedeemCodeWhereInput>;
};

export type GitPoapAvgAggregate = {
  __typename?: 'GitPOAPAvgAggregate';
  eventId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
  poapEventId?: Maybe<Scalars['Float']>;
  repoId?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type GitPoapAvgOrderByAggregateInput = {
  eventId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapCount = {
  __typename?: 'GitPOAPCount';
  claims: Scalars['Int'];
  redeemCodes: Scalars['Int'];
};

export type GitPoapCountAggregate = {
  __typename?: 'GitPOAPCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  eventId: Scalars['Int'];
  id: Scalars['Int'];
  level: Scalars['Int'];
  ongoing: Scalars['Int'];
  poapEventId: Scalars['Int'];
  poapSecret: Scalars['Int'];
  repoId: Scalars['Int'];
  status: Scalars['Int'];
  threshold: Scalars['Int'];
  type: Scalars['Int'];
  updatedAt: Scalars['Int'];
  year: Scalars['Int'];
};

export type GitPoapCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  ongoing?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapGroupBy = {
  __typename?: 'GitPOAPGroupBy';
  _avg?: Maybe<GitPoapAvgAggregate>;
  _count?: Maybe<GitPoapCountAggregate>;
  _max?: Maybe<GitPoapMaxAggregate>;
  _min?: Maybe<GitPoapMinAggregate>;
  _sum?: Maybe<GitPoapSumAggregate>;
  createdAt: Scalars['DateTime'];
  eventId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  level: Scalars['Int'];
  ongoing: Scalars['Boolean'];
  poapEventId: Scalars['Int'];
  poapSecret: Scalars['String'];
  repoId: Scalars['Int'];
  status: GitPoapStatus;
  threshold: Scalars['Int'];
  type: ClaimType;
  updatedAt: Scalars['DateTime'];
  year: Scalars['Int'];
};

export type GitPoapListRelationFilter = {
  every?: InputMaybe<GitPoapWhereInput>;
  none?: InputMaybe<GitPoapWhereInput>;
  some?: InputMaybe<GitPoapWhereInput>;
};

export type GitPoapMaxAggregate = {
  __typename?: 'GitPOAPMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  eventId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  ongoing?: Maybe<Scalars['Boolean']>;
  poapEventId?: Maybe<Scalars['Int']>;
  poapSecret?: Maybe<Scalars['String']>;
  repoId?: Maybe<Scalars['Int']>;
  status?: Maybe<GitPoapStatus>;
  threshold?: Maybe<Scalars['Int']>;
  type?: Maybe<ClaimType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  year?: Maybe<Scalars['Int']>;
};

export type GitPoapMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  ongoing?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapMinAggregate = {
  __typename?: 'GitPOAPMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  eventId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  ongoing?: Maybe<Scalars['Boolean']>;
  poapEventId?: Maybe<Scalars['Int']>;
  poapSecret?: Maybe<Scalars['String']>;
  repoId?: Maybe<Scalars['Int']>;
  status?: Maybe<GitPoapStatus>;
  threshold?: Maybe<Scalars['Int']>;
  type?: Maybe<ClaimType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  year?: Maybe<Scalars['Int']>;
};

export type GitPoapMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  ongoing?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GitPoapOrderByWithAggregationInput = {
  _avg?: InputMaybe<GitPoapAvgOrderByAggregateInput>;
  _count?: InputMaybe<GitPoapCountOrderByAggregateInput>;
  _max?: InputMaybe<GitPoapMaxOrderByAggregateInput>;
  _min?: InputMaybe<GitPoapMinOrderByAggregateInput>;
  _sum?: InputMaybe<GitPoapSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  ongoing?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapOrderByWithRelationInput = {
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  event?: InputMaybe<EventOrderByWithRelationInput>;
  eventId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  ongoing?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  redeemCodes?: InputMaybe<RedeemCodeOrderByRelationAggregateInput>;
  repo?: InputMaybe<RepoOrderByWithRelationInput>;
  repoId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapRelationFilter = {
  is?: InputMaybe<GitPoapWhereInput>;
  isNot?: InputMaybe<GitPoapWhereInput>;
};

export enum GitPoapScalarFieldEnum {
  CreatedAt = 'createdAt',
  EventId = 'eventId',
  Id = 'id',
  Level = 'level',
  Ongoing = 'ongoing',
  PoapEventId = 'poapEventId',
  PoapSecret = 'poapSecret',
  RepoId = 'repoId',
  Status = 'status',
  Threshold = 'threshold',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Year = 'year',
}

export type GitPoapScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GitPoapScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GitPoapScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GitPoapScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  eventId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  level?: InputMaybe<IntWithAggregatesFilter>;
  ongoing?: InputMaybe<BoolWithAggregatesFilter>;
  poapEventId?: InputMaybe<IntWithAggregatesFilter>;
  repoId?: InputMaybe<IntWithAggregatesFilter>;
  status?: InputMaybe<EnumGitPoapStatusWithAggregatesFilter>;
  threshold?: InputMaybe<IntWithAggregatesFilter>;
  type?: InputMaybe<EnumClaimTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  year?: InputMaybe<IntWithAggregatesFilter>;
};

export enum GitPoapStatus {
  Approved = 'APPROVED',
  RedeemRequestPending = 'REDEEM_REQUEST_PENDING',
  Unapproved = 'UNAPPROVED',
}

export type GitPoapSumAggregate = {
  __typename?: 'GitPOAPSumAggregate';
  eventId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  poapEventId?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  threshold?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type GitPoapSumOrderByAggregateInput = {
  eventId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapWhereInput = {
  AND?: InputMaybe<Array<GitPoapWhereInput>>;
  NOT?: InputMaybe<Array<GitPoapWhereInput>>;
  OR?: InputMaybe<Array<GitPoapWhereInput>>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  event?: InputMaybe<EventRelationFilter>;
  eventId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  level?: InputMaybe<IntFilter>;
  ongoing?: InputMaybe<BoolFilter>;
  poapEventId?: InputMaybe<IntFilter>;
  redeemCodes?: InputMaybe<RedeemCodeListRelationFilter>;
  repo?: InputMaybe<RepoRelationFilter>;
  repoId?: InputMaybe<IntFilter>;
  status?: InputMaybe<EnumGitPoapStatusFilter>;
  threshold?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumClaimTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  year?: InputMaybe<IntFilter>;
};

export type GitPoapWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  poapEventId?: InputMaybe<Scalars['Int']>;
};

export type GitPoapWithClaimsCount = {
  __typename?: 'GitPOAPWithClaimsCount';
  claimsCount: Scalars['Float'];
  event: PoapEvent;
  gitPOAP: GitPoap;
};

export type GithubPullRequest = {
  __typename?: 'GithubPullRequest';
  Claim: Array<Claim>;
  _count?: Maybe<GithubPullRequestCount>;
  createdAt: Scalars['DateTime'];
  githubMergeCommitSha: Scalars['String'];
  githubMergedAt: Scalars['DateTime'];
  githubPullNumber: Scalars['Int'];
  githubTitle: Scalars['String'];
  id: Scalars['Int'];
  repo: Repo;
  repoId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Int'];
};

export type GithubPullRequestClaimArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type GithubPullRequestAvgAggregate = {
  __typename?: 'GithubPullRequestAvgAggregate';
  githubPullNumber?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  repoId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

export type GithubPullRequestAvgOrderByAggregateInput = {
  githubPullNumber?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestCount = {
  __typename?: 'GithubPullRequestCount';
  Claim: Scalars['Int'];
};

export type GithubPullRequestCountAggregate = {
  __typename?: 'GithubPullRequestCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubMergeCommitSha: Scalars['Int'];
  githubMergedAt: Scalars['Int'];
  githubPullNumber: Scalars['Int'];
  githubTitle: Scalars['Int'];
  id: Scalars['Int'];
  repoId: Scalars['Int'];
  updatedAt: Scalars['Int'];
  userId: Scalars['Int'];
};

export type GithubPullRequestCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestGroupBy = {
  __typename?: 'GithubPullRequestGroupBy';
  _avg?: Maybe<GithubPullRequestAvgAggregate>;
  _count?: Maybe<GithubPullRequestCountAggregate>;
  _max?: Maybe<GithubPullRequestMaxAggregate>;
  _min?: Maybe<GithubPullRequestMinAggregate>;
  _sum?: Maybe<GithubPullRequestSumAggregate>;
  createdAt: Scalars['DateTime'];
  githubMergeCommitSha: Scalars['String'];
  githubMergedAt: Scalars['DateTime'];
  githubPullNumber: Scalars['Int'];
  githubTitle: Scalars['String'];
  id: Scalars['Int'];
  repoId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Int'];
};

export type GithubPullRequestListRelationFilter = {
  every?: InputMaybe<GithubPullRequestWhereInput>;
  none?: InputMaybe<GithubPullRequestWhereInput>;
  some?: InputMaybe<GithubPullRequestWhereInput>;
};

export type GithubPullRequestMaxAggregate = {
  __typename?: 'GithubPullRequestMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubMergeCommitSha?: Maybe<Scalars['String']>;
  githubMergedAt?: Maybe<Scalars['DateTime']>;
  githubPullNumber?: Maybe<Scalars['Int']>;
  githubTitle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['Int']>;
};

export type GithubPullRequestMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestMinAggregate = {
  __typename?: 'GithubPullRequestMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubMergeCommitSha?: Maybe<Scalars['String']>;
  githubMergedAt?: Maybe<Scalars['DateTime']>;
  githubPullNumber?: Maybe<Scalars['Int']>;
  githubTitle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['Int']>;
};

export type GithubPullRequestMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GithubPullRequestOrderByWithAggregationInput = {
  _avg?: InputMaybe<GithubPullRequestAvgOrderByAggregateInput>;
  _count?: InputMaybe<GithubPullRequestCountOrderByAggregateInput>;
  _max?: InputMaybe<GithubPullRequestMaxOrderByAggregateInput>;
  _min?: InputMaybe<GithubPullRequestMinOrderByAggregateInput>;
  _sum?: InputMaybe<GithubPullRequestSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestOrderByWithRelationInput = {
  Claim?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repo?: InputMaybe<RepoOrderByWithRelationInput>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestRelationFilter = {
  is?: InputMaybe<GithubPullRequestWhereInput>;
  isNot?: InputMaybe<GithubPullRequestWhereInput>;
};

export type GithubPullRequestRepoIdGithubPullNumberCompoundUniqueInput = {
  githubPullNumber: Scalars['Int'];
  repoId: Scalars['Int'];
};

export enum GithubPullRequestScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubMergeCommitSha = 'githubMergeCommitSha',
  GithubMergedAt = 'githubMergedAt',
  GithubPullNumber = 'githubPullNumber',
  GithubTitle = 'githubTitle',
  Id = 'id',
  RepoId = 'repoId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
}

export type GithubPullRequestScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GithubPullRequestScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GithubPullRequestScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GithubPullRequestScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubMergeCommitSha?: InputMaybe<StringWithAggregatesFilter>;
  githubMergedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubPullNumber?: InputMaybe<IntWithAggregatesFilter>;
  githubTitle?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  repoId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<IntWithAggregatesFilter>;
};

export type GithubPullRequestSumAggregate = {
  __typename?: 'GithubPullRequestSumAggregate';
  githubPullNumber?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

export type GithubPullRequestSumOrderByAggregateInput = {
  githubPullNumber?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestWhereInput = {
  AND?: InputMaybe<Array<GithubPullRequestWhereInput>>;
  Claim?: InputMaybe<ClaimListRelationFilter>;
  NOT?: InputMaybe<Array<GithubPullRequestWhereInput>>;
  OR?: InputMaybe<Array<GithubPullRequestWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubMergeCommitSha?: InputMaybe<StringFilter>;
  githubMergedAt?: InputMaybe<DateTimeFilter>;
  githubPullNumber?: InputMaybe<IntFilter>;
  githubTitle?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  repo?: InputMaybe<RepoRelationFilter>;
  repoId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type GithubPullRequestWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  repoId_githubPullNumber?: InputMaybe<GithubPullRequestRepoIdGithubPullNumberCompoundUniqueInput>;
};

export type Holder = {
  __typename?: 'Holder';
  address: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  gitPOAPCount: Scalars['Float'];
  githubHandle: Scalars['String'];
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileId: Scalars['Float'];
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
};

export type Holders = {
  __typename?: 'Holders';
  holders: Array<Holder>;
  totalHolders: Scalars['Float'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumClaimStatusFilter = {
  equals?: InputMaybe<ClaimStatus>;
  in?: InputMaybe<Array<ClaimStatus>>;
  not?: InputMaybe<NestedEnumClaimStatusFilter>;
  notIn?: InputMaybe<Array<ClaimStatus>>;
};

export type NestedEnumClaimStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumClaimStatusFilter>;
  _min?: InputMaybe<NestedEnumClaimStatusFilter>;
  equals?: InputMaybe<ClaimStatus>;
  in?: InputMaybe<Array<ClaimStatus>>;
  not?: InputMaybe<NestedEnumClaimStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<ClaimStatus>>;
};

export type NestedEnumClaimTypeFilter = {
  equals?: InputMaybe<ClaimType>;
  in?: InputMaybe<Array<ClaimType>>;
  not?: InputMaybe<NestedEnumClaimTypeFilter>;
  notIn?: InputMaybe<Array<ClaimType>>;
};

export type NestedEnumClaimTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumClaimTypeFilter>;
  _min?: InputMaybe<NestedEnumClaimTypeFilter>;
  equals?: InputMaybe<ClaimType>;
  in?: InputMaybe<Array<ClaimType>>;
  not?: InputMaybe<NestedEnumClaimTypeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<ClaimType>>;
};

export type NestedEnumGitPoapStatusFilter = {
  equals?: InputMaybe<GitPoapStatus>;
  in?: InputMaybe<Array<GitPoapStatus>>;
  not?: InputMaybe<NestedEnumGitPoapStatusFilter>;
  notIn?: InputMaybe<Array<GitPoapStatus>>;
};

export type NestedEnumGitPoapStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumGitPoapStatusFilter>;
  _min?: InputMaybe<NestedEnumGitPoapStatusFilter>;
  equals?: InputMaybe<GitPoapStatus>;
  in?: InputMaybe<Array<GitPoapStatus>>;
  not?: InputMaybe<NestedEnumGitPoapStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<GitPoapStatus>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NullableProfile = {
  __typename?: 'NullableProfile';
  address: Scalars['String'];
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ensName?: Maybe<Scalars['String']>;
  featuredPOAPs: Array<FeaturedPoap>;
  githubHandle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Organization = {
  __typename?: 'Organization';
  _count?: Maybe<OrganizationCount>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  repos: Array<Repo>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type OrganizationReposArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type OrganizationAvgAggregate = {
  __typename?: 'OrganizationAvgAggregate';
  githubOrgId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type OrganizationAvgOrderByAggregateInput = {
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type OrganizationCount = {
  __typename?: 'OrganizationCount';
  repos: Scalars['Int'];
};

export type OrganizationCountAggregate = {
  __typename?: 'OrganizationCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  description: Scalars['Int'];
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  twitterHandle: Scalars['Int'];
  updatedAt: Scalars['Int'];
  url: Scalars['Int'];
};

export type OrganizationCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type OrganizationData = {
  __typename?: 'OrganizationData';
  _count?: Maybe<OrganizationCount>;
  contributorCount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  gitPOAPCount: Scalars['Float'];
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  mintedGitPOAPCount: Scalars['Float'];
  name: Scalars['String'];
  projectCount: Scalars['Float'];
  repos: Array<Repo>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type OrganizationDataReposArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type OrganizationGroupBy = {
  __typename?: 'OrganizationGroupBy';
  _avg?: Maybe<OrganizationAvgAggregate>;
  _count?: Maybe<OrganizationCountAggregate>;
  _max?: Maybe<OrganizationMaxAggregate>;
  _min?: Maybe<OrganizationMinAggregate>;
  _sum?: Maybe<OrganizationSumAggregate>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type OrganizationMaxAggregate = {
  __typename?: 'OrganizationMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  githubOrgId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
};

export type OrganizationMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type OrganizationMinAggregate = {
  __typename?: 'OrganizationMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  githubOrgId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
};

export type OrganizationMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type OrganizationOrderByWithAggregationInput = {
  _avg?: InputMaybe<OrganizationAvgOrderByAggregateInput>;
  _count?: InputMaybe<OrganizationCountOrderByAggregateInput>;
  _max?: InputMaybe<OrganizationMaxOrderByAggregateInput>;
  _min?: InputMaybe<OrganizationMinOrderByAggregateInput>;
  _sum?: InputMaybe<OrganizationSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type OrganizationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  repos?: InputMaybe<RepoOrderByRelationAggregateInput>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type OrganizationRelationFilter = {
  is?: InputMaybe<OrganizationWhereInput>;
  isNot?: InputMaybe<OrganizationWhereInput>;
};

export enum OrganizationScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  GithubOrgId = 'githubOrgId',
  Id = 'id',
  Name = 'name',
  TwitterHandle = 'twitterHandle',
  UpdatedAt = 'updatedAt',
  Url = 'url',
}

export type OrganizationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<OrganizationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<OrganizationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<OrganizationScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  githubOrgId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  twitterHandle?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  url?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type OrganizationSumAggregate = {
  __typename?: 'OrganizationSumAggregate';
  githubOrgId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type OrganizationSumOrderByAggregateInput = {
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type OrganizationWhereInput = {
  AND?: InputMaybe<Array<OrganizationWhereInput>>;
  NOT?: InputMaybe<Array<OrganizationWhereInput>>;
  OR?: InputMaybe<Array<OrganizationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  githubOrgId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  repos?: InputMaybe<RepoListRelationFilter>;
  twitterHandle?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringNullableFilter>;
};

export type OrganizationWhereUniqueInput = {
  githubOrgId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type PoapEvent = {
  __typename?: 'POAPEvent';
  city: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  end_date: Scalars['String'];
  event_url: Scalars['String'];
  expiry_date: Scalars['String'];
  fancy_id: Scalars['String'];
  id: Scalars['Float'];
  image_url: Scalars['String'];
  name: Scalars['String'];
  start_date: Scalars['String'];
  supply: Scalars['Float'];
  year: Scalars['Float'];
};

export type PoapToken = {
  __typename?: 'POAPToken';
  chain: Scalars['String'];
  created: Scalars['String'];
  event: PoapEvent;
  owner: Scalars['String'];
  tokenId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  _count?: Maybe<ProfileCount>;
  address: Scalars['String'];
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  featuredPOAPs: Array<FeaturedPoap>;
  githubHandle?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProfileFeaturedPoaPsArgs = {
  cursor?: InputMaybe<FeaturedPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeaturedPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeaturedPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturedPoapWhereInput>;
};

export type ProfileAvgAggregate = {
  __typename?: 'ProfileAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type ProfileAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type ProfileCount = {
  __typename?: 'ProfileCount';
  featuredPOAPs: Scalars['Int'];
};

export type ProfileCountAggregate = {
  __typename?: 'ProfileCountAggregate';
  _all: Scalars['Int'];
  address: Scalars['Int'];
  bannerImageUrl: Scalars['Int'];
  bio: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubHandle: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  personalSiteUrl: Scalars['Int'];
  profileImageUrl: Scalars['Int'];
  twitterHandle: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type ProfileCountOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  personalSiteUrl?: InputMaybe<SortOrder>;
  profileImageUrl?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileGroupBy = {
  __typename?: 'ProfileGroupBy';
  _avg?: Maybe<ProfileAvgAggregate>;
  _count?: Maybe<ProfileCountAggregate>;
  _max?: Maybe<ProfileMaxAggregate>;
  _min?: Maybe<ProfileMinAggregate>;
  _sum?: Maybe<ProfileSumAggregate>;
  address: Scalars['String'];
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  githubHandle?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProfileMaxAggregate = {
  __typename?: 'ProfileMaxAggregate';
  address?: Maybe<Scalars['String']>;
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  githubHandle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProfileMaxOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  personalSiteUrl?: InputMaybe<SortOrder>;
  profileImageUrl?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileMinAggregate = {
  __typename?: 'ProfileMinAggregate';
  address?: Maybe<Scalars['String']>;
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  githubHandle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProfileMinOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  personalSiteUrl?: InputMaybe<SortOrder>;
  profileImageUrl?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileOrderByWithAggregationInput = {
  _avg?: InputMaybe<ProfileAvgOrderByAggregateInput>;
  _count?: InputMaybe<ProfileCountOrderByAggregateInput>;
  _max?: InputMaybe<ProfileMaxOrderByAggregateInput>;
  _min?: InputMaybe<ProfileMinOrderByAggregateInput>;
  _sum?: InputMaybe<ProfileSumOrderByAggregateInput>;
  address?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  personalSiteUrl?: InputMaybe<SortOrder>;
  profileImageUrl?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  featuredPOAPs?: InputMaybe<FeaturedPoapOrderByRelationAggregateInput>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  personalSiteUrl?: InputMaybe<SortOrder>;
  profileImageUrl?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export enum ProfileScalarFieldEnum {
  Address = 'address',
  BannerImageUrl = 'bannerImageUrl',
  Bio = 'bio',
  CreatedAt = 'createdAt',
  GithubHandle = 'githubHandle',
  Id = 'id',
  Name = 'name',
  PersonalSiteUrl = 'personalSiteUrl',
  ProfileImageUrl = 'profileImageUrl',
  TwitterHandle = 'twitterHandle',
  UpdatedAt = 'updatedAt',
}

export type ProfileScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ProfileScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ProfileScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ProfileScalarWhereWithAggregatesInput>>;
  address?: InputMaybe<StringWithAggregatesFilter>;
  bannerImageUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  bio?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubHandle?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  personalSiteUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  profileImageUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  twitterHandle?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ProfileSumAggregate = {
  __typename?: 'ProfileSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type ProfileSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  address?: InputMaybe<StringFilter>;
  bannerImageUrl?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  featuredPOAPs?: InputMaybe<FeaturedPoapListRelationFilter>;
  githubHandle?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  personalSiteUrl?: InputMaybe<StringNullableFilter>;
  profileImageUrl?: InputMaybe<StringNullableFilter>;
  twitterHandle?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProfileWhereUniqueInput = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type ProfileWithClaimsCount = {
  __typename?: 'ProfileWithClaimsCount';
  claimsCount: Scalars['Float'];
  profile: Profile;
};

export type ProfileWithEns = {
  __typename?: 'ProfileWithENS';
  ens: Scalars['String'];
  profile: Profile;
};

export type Query = {
  __typename?: 'Query';
  aggregateClaim: AggregateClaim;
  aggregateFeaturedPOAP: AggregateFeaturedPoap;
  aggregateGitPOAP: AggregateGitPoap;
  aggregateGithubPullRequest: AggregateGithubPullRequest;
  aggregateOrganization: AggregateOrganization;
  aggregateProfile: AggregateProfile;
  aggregateRepo: AggregateRepo;
  aggregateUser: AggregateUser;
  allOrganizations?: Maybe<Array<Organization>>;
  allRepos?: Maybe<Array<Repo>>;
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  featuredPOAP?: Maybe<FeaturedPoap>;
  featuredPOAPS: Array<FeaturedPoap>;
  findFirstClaim?: Maybe<Claim>;
  findFirstFeaturedPOAP?: Maybe<FeaturedPoap>;
  findFirstGitPOAP?: Maybe<GitPoap>;
  findFirstGithubPullRequest?: Maybe<GithubPullRequest>;
  findFirstOrganization?: Maybe<Organization>;
  findFirstProfile?: Maybe<Profile>;
  findFirstRepo?: Maybe<Repo>;
  findFirstUser?: Maybe<User>;
  gitPOAP?: Maybe<GitPoap>;
  gitPOAPEvent?: Maybe<FullGitPoapEventData>;
  gitPOAPHolders?: Maybe<Holders>;
  gitPOAPS: Array<GitPoap>;
  githubPullRequest?: Maybe<GithubPullRequest>;
  githubPullRequests: Array<GithubPullRequest>;
  groupByClaim: Array<ClaimGroupBy>;
  groupByFeaturedPOAP: Array<FeaturedPoapGroupBy>;
  groupByGitPOAP: Array<GitPoapGroupBy>;
  groupByGithubPullRequest: Array<GithubPullRequestGroupBy>;
  groupByOrganization: Array<OrganizationGroupBy>;
  groupByProfile: Array<ProfileGroupBy>;
  groupByRepo: Array<RepoGroupBy>;
  groupByUser: Array<UserGroupBy>;
  lastMonthClaims: Scalars['Float'];
  lastMonthContributors: Scalars['Float'];
  lastMonthGitPOAPs: Scalars['Float'];
  lastMonthRepos: Scalars['Float'];
  mostClaimedGitPOAPs?: Maybe<Array<GitPoapWithClaimsCount>>;
  mostHonoredContributors: Array<ProfileWithClaimsCount>;
  organization?: Maybe<Organization>;
  organizationData?: Maybe<OrganizationData>;
  organizationRepos?: Maybe<Array<RepoData>>;
  organizations: Array<Organization>;
  profile?: Maybe<Profile>;
  profileData?: Maybe<NullableProfile>;
  profileFeaturedPOAPs?: Maybe<UserFeaturedPoaPs>;
  profiles: Array<Profile>;
  recentlyAddedProjects: Array<Repo>;
  repo?: Maybe<Repo>;
  repoData?: Maybe<RepoData>;
  repoGitPOAPs?: Maybe<RepoGitPoaPs>;
  repoMostHonoredContributors: Array<ProfileWithClaimsCount>;
  repoStarCount: Scalars['Float'];
  repos: Array<Repo>;
  search: SearchResults;
  totalClaims: Scalars['Float'];
  totalContributors: Scalars['Float'];
  totalGitPOAPs: Scalars['Float'];
  totalRepos: Scalars['Float'];
  user?: Maybe<User>;
  userClaims?: Maybe<Array<FullClaimData>>;
  userPOAPs?: Maybe<UserPoaPs>;
  users: Array<User>;
};

export type QueryAggregateClaimArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryAggregateFeaturedPoapArgs = {
  cursor?: InputMaybe<FeaturedPoapWhereUniqueInput>;
  orderBy?: InputMaybe<Array<FeaturedPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturedPoapWhereInput>;
};

export type QueryAggregateGitPoapArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type QueryAggregateGithubPullRequestArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type QueryAggregateOrganizationArgs = {
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type QueryAggregateProfileArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryAggregateRepoArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryAllOrganizationsArgs = {
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryAllReposArgs = {
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryClaimArgs = {
  where: ClaimWhereUniqueInput;
};

export type QueryClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryFeaturedPoapArgs = {
  where: FeaturedPoapWhereUniqueInput;
};

export type QueryFeaturedPoapsArgs = {
  cursor?: InputMaybe<FeaturedPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeaturedPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeaturedPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturedPoapWhereInput>;
};

export type QueryFindFirstClaimArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryFindFirstFeaturedPoapArgs = {
  cursor?: InputMaybe<FeaturedPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeaturedPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeaturedPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturedPoapWhereInput>;
};

export type QueryFindFirstGitPoapArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type QueryFindFirstGithubPullRequestArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type QueryFindFirstOrganizationArgs = {
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrganizationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type QueryFindFirstProfileArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryFindFirstRepoArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryGitPoapArgs = {
  where: GitPoapWhereUniqueInput;
};

export type QueryGitPoapEventArgs = {
  id: Scalars['Float'];
};

export type QueryGitPoapHoldersArgs = {
  gitPOAPId: Scalars['Float'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryGitPoapsArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type QueryGithubPullRequestArgs = {
  where: GithubPullRequestWhereUniqueInput;
};

export type QueryGithubPullRequestsArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type QueryGroupByClaimArgs = {
  by: Array<ClaimScalarFieldEnum>;
  having?: InputMaybe<ClaimScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryGroupByFeaturedPoapArgs = {
  by: Array<FeaturedPoapScalarFieldEnum>;
  having?: InputMaybe<FeaturedPoapScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<FeaturedPoapOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturedPoapWhereInput>;
};

export type QueryGroupByGitPoapArgs = {
  by: Array<GitPoapScalarFieldEnum>;
  having?: InputMaybe<GitPoapScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type QueryGroupByGithubPullRequestArgs = {
  by: Array<GithubPullRequestScalarFieldEnum>;
  having?: InputMaybe<GithubPullRequestScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type QueryGroupByOrganizationArgs = {
  by: Array<OrganizationScalarFieldEnum>;
  having?: InputMaybe<OrganizationScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type QueryGroupByProfileArgs = {
  by: Array<ProfileScalarFieldEnum>;
  having?: InputMaybe<ProfileScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryGroupByRepoArgs = {
  by: Array<RepoScalarFieldEnum>;
  having?: InputMaybe<RepoScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<RepoOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QueryGroupByUserArgs = {
  by: Array<UserScalarFieldEnum>;
  having?: InputMaybe<UserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryMostClaimedGitPoaPsArgs = {
  count?: InputMaybe<Scalars['Float']>;
};

export type QueryMostHonoredContributorsArgs = {
  count?: InputMaybe<Scalars['Float']>;
};

export type QueryOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
};

export type QueryOrganizationDataArgs = {
  orgId?: InputMaybe<Scalars['Float']>;
  orgName?: InputMaybe<Scalars['String']>;
};

export type QueryOrganizationReposArgs = {
  orgId: Scalars['Float'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryOrganizationsArgs = {
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrganizationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type QueryProfileArgs = {
  where: ProfileWhereUniqueInput;
};

export type QueryProfileDataArgs = {
  address: Scalars['String'];
};

export type QueryProfileFeaturedPoaPsArgs = {
  address: Scalars['String'];
};

export type QueryProfilesArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryRecentlyAddedProjectsArgs = {
  count?: InputMaybe<Scalars['Float']>;
};

export type QueryRepoArgs = {
  where: RepoWhereUniqueInput;
};

export type QueryRepoDataArgs = {
  orgName?: InputMaybe<Scalars['String']>;
  repoId?: InputMaybe<Scalars['Float']>;
  repoName?: InputMaybe<Scalars['String']>;
};

export type QueryRepoGitPoaPsArgs = {
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  repoId: Scalars['Float'];
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryRepoMostHonoredContributorsArgs = {
  count?: InputMaybe<Scalars['Float']>;
  repoId: Scalars['Float'];
};

export type QueryRepoStarCountArgs = {
  repoId: Scalars['Float'];
};

export type QueryReposArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QuerySearchArgs = {
  text: Scalars['String'];
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUserClaimsArgs = {
  githubId: Scalars['Float'];
};

export type QueryUserPoaPsArgs = {
  address: Scalars['String'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type RedeemCode = {
  __typename?: 'RedeemCode';
  code: Scalars['String'];
  gitPOAPId: Scalars['Int'];
  id: Scalars['Int'];
};

export type RedeemCodeListRelationFilter = {
  every?: InputMaybe<RedeemCodeWhereInput>;
  none?: InputMaybe<RedeemCodeWhereInput>;
  some?: InputMaybe<RedeemCodeWhereInput>;
};

export type RedeemCodeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RedeemCodeOrderByWithRelationInput = {
  code?: InputMaybe<SortOrder>;
  gitPOAP?: InputMaybe<GitPoapOrderByWithRelationInput>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export enum RedeemCodeScalarFieldEnum {
  Code = 'code',
  GitPoapId = 'gitPOAPId',
  Id = 'id',
}

export type RedeemCodeWhereInput = {
  AND?: InputMaybe<Array<RedeemCodeWhereInput>>;
  NOT?: InputMaybe<Array<RedeemCodeWhereInput>>;
  OR?: InputMaybe<Array<RedeemCodeWhereInput>>;
  code?: InputMaybe<StringFilter>;
  gitPOAP?: InputMaybe<GitPoapRelationFilter>;
  gitPOAPId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
};

export type RedeemCodeWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Repo = {
  __typename?: 'Repo';
  GithubPullRequest: Array<GithubPullRequest>;
  _count?: Maybe<RepoCount>;
  createdAt: Scalars['DateTime'];
  gitPOAPs: Array<GitPoap>;
  githubRepoId: Scalars['Int'];
  id: Scalars['Int'];
  lastPRUpdatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  organization: Organization;
  organizationId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type RepoGithubPullRequestArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type RepoGitPoaPsArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type RepoAvgAggregate = {
  __typename?: 'RepoAvgAggregate';
  githubRepoId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
};

export type RepoAvgOrderByAggregateInput = {
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
};

export type RepoCount = {
  __typename?: 'RepoCount';
  GithubPullRequest: Scalars['Int'];
  gitPOAPs: Scalars['Int'];
};

export type RepoCountAggregate = {
  __typename?: 'RepoCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubRepoId: Scalars['Int'];
  id: Scalars['Int'];
  lastPRUpdatedAt: Scalars['Int'];
  name: Scalars['Int'];
  organizationId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type RepoCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RepoData = {
  __typename?: 'RepoData';
  GithubPullRequest: Array<GithubPullRequest>;
  _count?: Maybe<RepoCount>;
  contributorCount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  gitPOAPCount: Scalars['Float'];
  gitPOAPs: Array<GitPoap>;
  githubRepoId: Scalars['Int'];
  id: Scalars['Int'];
  lastPRUpdatedAt: Scalars['DateTime'];
  mintedGitPOAPCount: Scalars['Float'];
  name: Scalars['String'];
  organization: Organization;
  organizationId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type RepoDataGithubPullRequestArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type RepoDataGitPoaPsArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type RepoGitPoaPs = {
  __typename?: 'RepoGitPOAPs';
  gitPOAPs: Array<FullGitPoapEventData>;
  totalGitPOAPs: Scalars['Float'];
};

export type RepoGroupBy = {
  __typename?: 'RepoGroupBy';
  _avg?: Maybe<RepoAvgAggregate>;
  _count?: Maybe<RepoCountAggregate>;
  _max?: Maybe<RepoMaxAggregate>;
  _min?: Maybe<RepoMinAggregate>;
  _sum?: Maybe<RepoSumAggregate>;
  createdAt: Scalars['DateTime'];
  githubRepoId: Scalars['Int'];
  id: Scalars['Int'];
  lastPRUpdatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  organizationId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type RepoListRelationFilter = {
  every?: InputMaybe<RepoWhereInput>;
  none?: InputMaybe<RepoWhereInput>;
  some?: InputMaybe<RepoWhereInput>;
};

export type RepoMaxAggregate = {
  __typename?: 'RepoMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubRepoId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  lastPRUpdatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RepoMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RepoMinAggregate = {
  __typename?: 'RepoMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubRepoId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  lastPRUpdatedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RepoMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RepoOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RepoOrderByWithAggregationInput = {
  _avg?: InputMaybe<RepoAvgOrderByAggregateInput>;
  _count?: InputMaybe<RepoCountOrderByAggregateInput>;
  _max?: InputMaybe<RepoMaxOrderByAggregateInput>;
  _min?: InputMaybe<RepoMinOrderByAggregateInput>;
  _sum?: InputMaybe<RepoSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RepoOrderByWithRelationInput = {
  GithubPullRequest?: InputMaybe<GithubPullRequestOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  gitPOAPs?: InputMaybe<GitPoapOrderByRelationAggregateInput>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organization?: InputMaybe<OrganizationOrderByWithRelationInput>;
  organizationId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RepoRelationFilter = {
  is?: InputMaybe<RepoWhereInput>;
  isNot?: InputMaybe<RepoWhereInput>;
};

export enum RepoScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubRepoId = 'githubRepoId',
  Id = 'id',
  LastPrUpdatedAt = 'lastPRUpdatedAt',
  Name = 'name',
  OrganizationId = 'organizationId',
  UpdatedAt = 'updatedAt',
}

export type RepoScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RepoScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RepoScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RepoScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubRepoId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  lastPRUpdatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  organizationId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type RepoSumAggregate = {
  __typename?: 'RepoSumAggregate';
  githubRepoId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  organizationId?: Maybe<Scalars['Int']>;
};

export type RepoSumOrderByAggregateInput = {
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
};

export type RepoWhereInput = {
  AND?: InputMaybe<Array<RepoWhereInput>>;
  GithubPullRequest?: InputMaybe<GithubPullRequestListRelationFilter>;
  NOT?: InputMaybe<Array<RepoWhereInput>>;
  OR?: InputMaybe<Array<RepoWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  gitPOAPs?: InputMaybe<GitPoapListRelationFilter>;
  githubRepoId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  lastPRUpdatedAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  organization?: InputMaybe<OrganizationRelationFilter>;
  organizationId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RepoWhereUniqueInput = {
  githubRepoId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  profileByENS?: Maybe<ProfileWithEns>;
  profilesByAddress: Array<Profile>;
  profilesByName: Array<Profile>;
  usersByGithubHandle: Array<User>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  GithubPullRequest: Array<GithubPullRequest>;
  _count?: Maybe<UserCount>;
  claims: Array<Claim>;
  createdAt: Scalars['DateTime'];
  githubHandle: Scalars['String'];
  githubId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type UserGithubPullRequestArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type UserClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  githubId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type UserAvgOrderByAggregateInput = {
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type UserCount = {
  __typename?: 'UserCount';
  GithubPullRequest: Scalars['Int'];
  authTokens: Scalars['Int'];
  claims: Scalars['Int'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubHandle: Scalars['Int'];
  githubId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type UserCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserFeaturedGitPoapData = {
  __typename?: 'UserFeaturedGitPOAPData';
  claim: Claim;
  poap: PoapToken;
};

export type UserFeaturedPoaPs = {
  __typename?: 'UserFeaturedPOAPs';
  gitPOAPs: Array<UserFeaturedGitPoapData>;
  poaps: Array<PoapToken>;
};

export type UserGitPoapData = {
  __typename?: 'UserGitPOAPData';
  claim: Claim;
  event: PoapEvent;
};

export type UserGroupBy = {
  __typename?: 'UserGroupBy';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
  createdAt: Scalars['DateTime'];
  githubHandle: Scalars['String'];
  githubId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubHandle?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubHandle?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  GithubPullRequest?: InputMaybe<GithubPullRequestOrderByRelationAggregateInput>;
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserPoaPs = {
  __typename?: 'UserPOAPs';
  gitPOAPs: Array<UserGitPoapData>;
  poaps: Array<PoapToken>;
  totalGitPOAPs: Scalars['Float'];
  totalPOAPs: Scalars['Float'];
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubHandle = 'githubHandle',
  GithubId = 'githubId',
  Id = 'id',
  UpdatedAt = 'updatedAt',
}

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubHandle?: InputMaybe<StringWithAggregatesFilter>;
  githubId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  githubId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type UserSumOrderByAggregateInput = {
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  GithubPullRequest?: InputMaybe<GithubPullRequestListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubHandle?: InputMaybe<StringFilter>;
  githubId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  githubId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type GetAllStatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllStatsQuery = {
  __typename?: 'Query';
  totalContributors: number;
  lastMonthContributors: number;
  totalClaims: number;
  lastMonthClaims: number;
  totalRepos: number;
  lastMonthRepos: number;
};

export type LeadersQueryVariables = Exact<{
  count: Scalars['Float'];
}>;

export type LeadersQuery = {
  __typename?: 'Query';
  mostHonoredContributors: Array<{
    __typename?: 'ProfileWithClaimsCount';
    claimsCount: number;
    profile: { __typename?: 'Profile'; address: string; id: number };
  }>;
};

export type RepoLeadersQueryVariables = Exact<{
  count: Scalars['Float'];
  repoId: Scalars['Float'];
}>;

export type RepoLeadersQuery = {
  __typename?: 'Query';
  repoMostHonoredContributors: Array<{
    __typename?: 'ProfileWithClaimsCount';
    claimsCount: number;
    profile: { __typename?: 'Profile'; address: string; id: number };
  }>;
};

export type GitpoapByPoapEventIdQueryVariables = Exact<{
  poapEventId: Scalars['Int'];
}>;

export type GitpoapByPoapEventIdQuery = {
  __typename?: 'Query';
  gitPOAP?: {
    __typename?: 'GitPOAP';
    id: number;
    poapEventId: number;
    status: GitPoapStatus;
    repo: { __typename?: 'Repo'; name: string };
  } | null;
};

export type GitPoapHoldersQueryVariables = Exact<{
  gitPOAPId: Scalars['Float'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
}>;

export type GitPoapHoldersQuery = {
  __typename?: 'Query';
  gitPOAPHolders?: {
    __typename?: 'Holders';
    totalHolders: number;
    holders: Array<{
      __typename?: 'Holder';
      address: string;
      githubHandle: string;
      gitPOAPCount: number;
      profileId: number;
      bio?: string | null;
      personalSiteUrl?: string | null;
      twitterHandle?: string | null;
    }>;
  } | null;
};

export type MostClaimedGitPoapsQueryVariables = Exact<{
  count: Scalars['Float'];
}>;

export type MostClaimedGitPoapsQuery = {
  __typename?: 'Query';
  mostClaimedGitPOAPs?: Array<{
    __typename?: 'GitPOAPWithClaimsCount';
    claimsCount: number;
    gitPOAP: {
      __typename?: 'GitPOAP';
      id: number;
      repo: {
        __typename?: 'Repo';
        name: string;
        organization: { __typename?: 'Organization'; name: string };
      };
    };
    event: { __typename?: 'POAPEvent'; name: string; image_url: string };
  }> | null;
};

export type ProfileQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type ProfileQuery = {
  __typename?: 'Query';
  profileData?: {
    __typename?: 'NullableProfile';
    id?: number | null;
    bio?: string | null;
    name?: string | null;
    githubHandle?: string | null;
    twitterHandle?: string | null;
    personalSiteUrl?: string | null;
    address: string;
    ensName?: string | null;
  } | null;
};

export type SearchForStringQueryVariables = Exact<{
  text: Scalars['String'];
}>;

export type SearchForStringQuery = {
  __typename?: 'Query';
  search: {
    __typename?: 'SearchResults';
    profilesByAddress: Array<{ __typename?: 'Profile'; id: number; address: string }>;
    profileByENS?: {
      __typename?: 'ProfileWithENS';
      ens: string;
      profile: { __typename?: 'Profile'; id: number; address: string };
    } | null;
  };
};

export type GitPoapsQueryVariables = Exact<{
  address: Scalars['String'];
  sort?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type GitPoapsQuery = {
  __typename?: 'Query';
  userPOAPs?: {
    __typename?: 'UserPOAPs';
    totalGitPOAPs: number;
    gitPOAPs: Array<{
      __typename?: 'UserGitPOAPData';
      claim: {
        __typename?: 'Claim';
        status: ClaimStatus;
        poapTokenId?: string | null;
        gitPOAP: {
          __typename?: 'GitPOAP';
          id: number;
          repo: {
            __typename?: 'Repo';
            name: string;
            organization: { __typename?: 'Organization'; name: string };
          };
        };
      };
      event: { __typename?: 'POAPEvent'; name: string; image_url: string; description: string };
    }>;
  } | null;
};

export type RepoGitPoapsQueryVariables = Exact<{
  repoId: Scalars['Float'];
  sort?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type RepoGitPoapsQuery = {
  __typename?: 'Query';
  repoGitPOAPs?: {
    __typename?: 'RepoGitPOAPs';
    totalGitPOAPs: number;
    gitPOAPs: Array<{
      __typename?: 'FullGitPOAPEventData';
      gitPOAP: { __typename?: 'GitPOAP'; id: number; repo: { __typename?: 'Repo'; name: string } };
      event: { __typename?: 'POAPEvent'; name: string; image_url: string; description: string };
    }>;
  } | null;
};

export type OpenClaimsQueryVariables = Exact<{
  githubId: Scalars['Float'];
}>;

export type OpenClaimsQuery = {
  __typename?: 'Query';
  userClaims?: Array<{
    __typename?: 'FullClaimData';
    claim: {
      __typename?: 'Claim';
      id: number;
      gitPOAP: {
        __typename?: 'GitPOAP';
        id: number;
        repo: { __typename?: 'Repo'; organization: { __typename?: 'Organization'; name: string } };
      };
    };
    event: { __typename?: 'POAPEvent'; name: string; image_url: string; description: string };
  }> | null;
};

export type RecentReposQueryVariables = Exact<{
  count: Scalars['Float'];
}>;

export type RecentReposQuery = {
  __typename?: 'Query';
  recentlyAddedProjects: Array<{
    __typename?: 'Repo';
    id: number;
    name: string;
    createdAt: any;
    organization: { __typename?: 'Organization'; name: string };
  }>;
};

export type GitPoapEventQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GitPoapEventQuery = {
  __typename?: 'Query';
  gitPOAPEvent?: {
    __typename?: 'FullGitPOAPEventData';
    gitPOAP: {
      __typename?: 'GitPOAP';
      repo: {
        __typename?: 'Repo';
        id: number;
        name: string;
        organization: {
          __typename?: 'Organization';
          id: number;
          name: string;
          description?: string | null;
          twitterHandle?: string | null;
          url?: string | null;
        };
      };
    };
    event: { __typename?: 'POAPEvent'; name: string; image_url: string; description: string };
  } | null;
};

export type AllPoapsQueryVariables = Exact<{
  address: Scalars['String'];
  sort?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type AllPoapsQuery = {
  __typename?: 'Query';
  userPOAPs?: {
    __typename?: 'UserPOAPs';
    totalPOAPs: number;
    poaps: Array<{
      __typename?: 'POAPToken';
      tokenId: string;
      event: { __typename?: 'POAPEvent'; id: number; name: string; image_url: string };
    }>;
  } | null;
};

export type FeaturedPoapsQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type FeaturedPoapsQuery = {
  __typename?: 'Query';
  profileFeaturedPOAPs?: {
    __typename?: 'UserFeaturedPOAPs';
    gitPOAPs: Array<{
      __typename?: 'UserFeaturedGitPOAPData';
      claim: {
        __typename?: 'Claim';
        id: number;
        gitPOAP: {
          __typename?: 'GitPOAP';
          id: number;
          repo: {
            __typename?: 'Repo';
            name: string;
            organization: { __typename?: 'Organization'; name: string };
          };
        };
      };
      poap: {
        __typename?: 'POAPToken';
        tokenId: string;
        event: {
          __typename?: 'POAPEvent';
          id: number;
          image_url: string;
          name: string;
          description: string;
        };
      };
    }>;
    poaps: Array<{
      __typename?: 'POAPToken';
      tokenId: string;
      event: {
        __typename?: 'POAPEvent';
        id: number;
        name: string;
        description: string;
        image_url: string;
      };
    }>;
  } | null;
};

export type AdminClaimsQueryVariables = Exact<{
  count: Scalars['Int'];
}>;

export type AdminClaimsQuery = {
  __typename?: 'Query';
  claims: Array<{
    __typename?: 'Claim';
    id: number;
    status: ClaimStatus;
    poapTokenId?: string | null;
    address?: string | null;
    updatedAt: any;
    createdAt: any;
    mintedAt?: any | null;
    user: { __typename?: 'User'; id: number; githubHandle: string };
    gitPOAP: {
      __typename?: 'GitPOAP';
      id: number;
      year: number;
      repo: {
        __typename?: 'Repo';
        id: number;
        name: string;
        organization: { __typename?: 'Organization'; id: number; name: string };
      };
    };
  }>;
};

export type RepoDataQueryVariables = Exact<{
  repoId: Scalars['Float'];
}>;

export type RepoDataQuery = {
  __typename?: 'Query';
  repoData?: {
    __typename?: 'RepoData';
    id: number;
    name: string;
    githubRepoId: number;
    contributorCount: number;
    mintedGitPOAPCount: number;
    organization: {
      __typename?: 'Organization';
      id: number;
      name: string;
      description?: string | null;
      twitterHandle?: string | null;
      url?: string | null;
    };
    gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }>;
  } | null;
};

export type RepoSeoByIdQueryVariables = Exact<{
  repoId: Scalars['Float'];
}>;

export type RepoSeoByIdQuery = {
  __typename?: 'Query';
  repoData?: {
    __typename?: 'RepoData';
    id: number;
    name: string;
    organization: { __typename?: 'Organization'; name: string };
  } | null;
};

export type RepoSeoByNameQueryVariables = Exact<{
  orgName: Scalars['String'];
  repoName: Scalars['String'];
}>;

export type RepoSeoByNameQuery = {
  __typename?: 'Query';
  repoData?: {
    __typename?: 'RepoData';
    id: number;
    name: string;
    organization: { __typename?: 'Organization'; name: string };
  } | null;
};

export type RepoStarCountQueryVariables = Exact<{
  repoId: Scalars['Float'];
}>;

export type RepoStarCountQuery = { __typename?: 'Query'; repoStarCount: number };

export type AllReposQueryVariables = Exact<{
  count: Scalars['Int'];
}>;

export type AllReposQuery = {
  __typename?: 'Query';
  repos: Array<{
    __typename?: 'Repo';
    id: number;
    name: string;
    createdAt: any;
    organization: { __typename?: 'Organization'; name: string };
    gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }>;
  }>;
};

export type AllReposOnRepoPageQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type AllReposOnRepoPageQuery = {
  __typename?: 'Query';
  allRepos?: Array<{
    __typename?: 'Repo';
    id: number;
    name: string;
    githubRepoId: number;
    organization: { __typename?: 'Organization'; name: string };
    gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }>;
  }> | null;
};

export type RepoSearchOnRepoPageQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
}>;

export type RepoSearchOnRepoPageQuery = {
  __typename?: 'Query';
  repos: Array<{
    __typename?: 'Repo';
    id: number;
    name: string;
    githubRepoId: number;
    organization: { __typename?: 'Organization'; name: string };
    gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }>;
  }>;
};

export type OrganizationDataQueryVariables = Exact<{
  orgId: Scalars['Float'];
}>;

export type OrganizationDataQuery = {
  __typename?: 'Query';
  organizationData?: {
    __typename?: 'OrganizationData';
    id: number;
    name: string;
    description?: string | null;
    twitterHandle?: string | null;
    url?: string | null;
    contributorCount: number;
    gitPOAPCount: number;
    mintedGitPOAPCount: number;
    projectCount: number;
  } | null;
};

export type OrganizationSeoByIdQueryVariables = Exact<{
  orgId: Scalars['Float'];
}>;

export type OrganizationSeoByIdQuery = {
  __typename?: 'Query';
  organizationData?: { __typename?: 'OrganizationData'; id: number; name: string } | null;
};

export type OrganizationSeoByNameQueryVariables = Exact<{
  orgName: Scalars['String'];
}>;

export type OrganizationSeoByNameQuery = {
  __typename?: 'Query';
  organizationData?: { __typename?: 'OrganizationData'; id: number; name: string } | null;
};

export type OrganizationsListQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type OrganizationsListQuery = {
  __typename?: 'Query';
  allOrganizations?: Array<{
    __typename?: 'Organization';
    id: number;
    name: string;
    githubOrgId: number;
    repos: Array<{
      __typename?: 'Repo';
      id: number;
      gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }>;
    }>;
  }> | null;
};

export type OrganizationReposQueryVariables = Exact<{
  orgId: Scalars['Float'];
  sort?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type OrganizationReposQuery = {
  __typename?: 'Query';
  organizationRepos?: Array<{
    __typename?: 'RepoData';
    id: number;
    name: string;
    contributorCount: number;
    mintedGitPOAPCount: number;
    organization: { __typename?: 'Organization'; name: string };
  }> | null;
};

export type TotalRepoCountQueryVariables = Exact<{ [key: string]: never }>;

export type TotalRepoCountQuery = {
  __typename?: 'Query';
  aggregateRepo: {
    __typename?: 'AggregateRepo';
    _count?: { __typename?: 'RepoCountAggregate'; id: number } | null;
  };
};

export type TotalOrganizationCountQueryVariables = Exact<{ [key: string]: never }>;

export type TotalOrganizationCountQuery = {
  __typename?: 'Query';
  aggregateOrganization: {
    __typename?: 'AggregateOrganization';
    _count?: { __typename?: 'OrganizationCountAggregate'; id: number } | null;
  };
};

export type ClaimsSinceQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']>;
}>;

export type ClaimsSinceQuery = {
  __typename?: 'Query';
  claims: Array<{ __typename?: 'Claim'; id: number }>;
};

export type ReposSinceQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']>;
}>;

export type ReposSinceQuery = {
  __typename?: 'Query';
  repos: Array<{ __typename?: 'Repo'; id: number }>;
};

export type GitPoaPsSinceQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']>;
}>;

export type GitPoaPsSinceQuery = {
  __typename?: 'Query';
  gitPOAPS: Array<{ __typename?: 'GitPOAP'; id: number }>;
};

export type ProfilesSinceQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']>;
}>;

export type ProfilesSinceQuery = {
  __typename?: 'Query';
  profiles: Array<{ __typename?: 'Profile'; id: number }>;
};

export type OrgsSinceQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']>;
}>;

export type OrgsSinceQuery = {
  __typename?: 'Query';
  organizations: Array<{ __typename?: 'Organization'; id: number }>;
};

export type ClaimsCountQueryVariables = Exact<{ [key: string]: never }>;

export type ClaimsCountQuery = {
  __typename?: 'Query';
  aggregateClaim: {
    __typename?: 'AggregateClaim';
    _count?: { __typename?: 'ClaimCountAggregate'; id: number } | null;
  };
};

export type MintedClaimsCountQueryVariables = Exact<{ [key: string]: never }>;

export type MintedClaimsCountQuery = {
  __typename?: 'Query';
  aggregateClaim: {
    __typename?: 'AggregateClaim';
    _count?: { __typename?: 'ClaimCountAggregate'; id: number } | null;
  };
};

export type AllGitPoapIdsQueryVariables = Exact<{ [key: string]: never }>;

export type AllGitPoapIdsQuery = {
  __typename?: 'Query';
  gitPOAPS: Array<{ __typename?: 'GitPOAP'; id: number }>;
};

export type ReposGetStaticPathsQueryVariables = Exact<{ [key: string]: never }>;

export type ReposGetStaticPathsQuery = {
  __typename?: 'Query';
  repos: Array<{
    __typename?: 'Repo';
    id: number;
    name: string;
    organization: { __typename?: 'Organization'; name: string };
  }>;
};

export type OrgsGetStaticPathsQueryVariables = Exact<{ [key: string]: never }>;

export type OrgsGetStaticPathsQuery = {
  __typename?: 'Query';
  organizations: Array<{ __typename?: 'Organization'; id: number; name: string }>;
};

export const GetAllStatsDocument = gql`
  query getAllStats {
    totalContributors
    lastMonthContributors
    totalClaims
    lastMonthClaims
    totalRepos
    lastMonthRepos
  }
`;

export function useGetAllStatsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllStatsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllStatsQuery>({ query: GetAllStatsDocument, ...options });
}
export const LeadersDocument = gql`
  query leaders($count: Float!) {
    mostHonoredContributors(count: $count) {
      profile {
        address
        id
      }
      claimsCount
    }
  }
`;

export function useLeadersQuery(options: Omit<Urql.UseQueryArgs<LeadersQueryVariables>, 'query'>) {
  return Urql.useQuery<LeadersQuery>({ query: LeadersDocument, ...options });
}
export const RepoLeadersDocument = gql`
  query repoLeaders($count: Float!, $repoId: Float!) {
    repoMostHonoredContributors(count: $count, repoId: $repoId) {
      profile {
        address
        id
      }
      claimsCount
    }
  }
`;

export function useRepoLeadersQuery(
  options: Omit<Urql.UseQueryArgs<RepoLeadersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoLeadersQuery>({ query: RepoLeadersDocument, ...options });
}
export const GitpoapByPoapEventIdDocument = gql`
  query gitpoapByPoapEventId($poapEventId: Int!) {
    gitPOAP(where: { poapEventId: $poapEventId }) {
      id
      poapEventId
      status
      repo {
        name
      }
    }
  }
`;

export function useGitpoapByPoapEventIdQuery(
  options: Omit<Urql.UseQueryArgs<GitpoapByPoapEventIdQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitpoapByPoapEventIdQuery>({
    query: GitpoapByPoapEventIdDocument,
    ...options,
  });
}
export const GitPoapHoldersDocument = gql`
  query gitPOAPHolders($gitPOAPId: Float!, $page: Float, $perPage: Float, $sort: String) {
    gitPOAPHolders(gitPOAPId: $gitPOAPId, page: $page, perPage: $perPage, sort: $sort) {
      totalHolders
      holders {
        address
        githubHandle
        gitPOAPCount
        profileId
        bio
        personalSiteUrl
        twitterHandle
      }
    }
  }
`;

export function useGitPoapHoldersQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapHoldersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapHoldersQuery>({ query: GitPoapHoldersDocument, ...options });
}
export const MostClaimedGitPoapsDocument = gql`
  query mostClaimedGitPoaps($count: Float!) {
    mostClaimedGitPOAPs(count: $count) {
      claimsCount
      gitPOAP {
        id
        repo {
          name
          organization {
            name
          }
        }
      }
      event {
        name
        image_url
      }
    }
  }
`;

export function useMostClaimedGitPoapsQuery(
  options: Omit<Urql.UseQueryArgs<MostClaimedGitPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MostClaimedGitPoapsQuery>({
    query: MostClaimedGitPoapsDocument,
    ...options,
  });
}
export const ProfileDocument = gql`
  query profile($address: String!) {
    profileData(address: $address) {
      id
      bio
      name
      githubHandle
      twitterHandle
      personalSiteUrl
      address
      ensName
    }
  }
`;

export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options });
}
export const SearchForStringDocument = gql`
  query searchForString($text: String!) {
    search(text: $text) {
      profilesByAddress {
        id
        address
      }
      profileByENS {
        profile {
          id
          address
        }
        ens
      }
    }
  }
`;

export function useSearchForStringQuery(
  options: Omit<Urql.UseQueryArgs<SearchForStringQueryVariables>, 'query'>,
) {
  return Urql.useQuery<SearchForStringQuery>({ query: SearchForStringDocument, ...options });
}
export const GitPoapsDocument = gql`
  query gitPoaps($address: String!, $sort: String, $page: Float, $perPage: Float) {
    userPOAPs(address: $address, sort: $sort, page: $page, perPage: $perPage) {
      totalGitPOAPs
      gitPOAPs {
        claim {
          gitPOAP {
            id
            repo {
              name
              organization {
                name
              }
            }
          }
          status
          poapTokenId
        }
        event {
          name
          image_url
          description
        }
      }
    }
  }
`;

export function useGitPoapsQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapsQuery>({ query: GitPoapsDocument, ...options });
}
export const RepoGitPoapsDocument = gql`
  query repoGitPoaps($repoId: Float!, $sort: String, $page: Float, $perPage: Float) {
    repoGitPOAPs(repoId: $repoId, sort: $sort, page: $page, perPage: $perPage) {
      totalGitPOAPs
      gitPOAPs {
        gitPOAP {
          id
          repo {
            name
          }
        }
        event {
          name
          image_url
          description
        }
      }
    }
  }
`;

export function useRepoGitPoapsQuery(
  options: Omit<Urql.UseQueryArgs<RepoGitPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoGitPoapsQuery>({ query: RepoGitPoapsDocument, ...options });
}
export const OpenClaimsDocument = gql`
  query openClaims($githubId: Float!) {
    userClaims(githubId: $githubId) {
      claim {
        id
        gitPOAP {
          id
          repo {
            organization {
              name
            }
          }
        }
      }
      event {
        name
        image_url
        description
      }
    }
  }
`;

export function useOpenClaimsQuery(
  options: Omit<Urql.UseQueryArgs<OpenClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OpenClaimsQuery>({ query: OpenClaimsDocument, ...options });
}
export const RecentReposDocument = gql`
  query recentRepos($count: Float!) {
    recentlyAddedProjects(count: $count) {
      id
      name
      createdAt
      organization {
        name
      }
    }
  }
`;

export function useRecentReposQuery(
  options: Omit<Urql.UseQueryArgs<RecentReposQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RecentReposQuery>({ query: RecentReposDocument, ...options });
}
export const GitPoapEventDocument = gql`
  query gitPoapEvent($id: Float!) {
    gitPOAPEvent(id: $id) {
      gitPOAP {
        repo {
          id
          name
          organization {
            id
            name
            description
            twitterHandle
            url
          }
        }
      }
      event {
        name
        image_url
        description
      }
    }
  }
`;

export function useGitPoapEventQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapEventQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapEventQuery>({ query: GitPoapEventDocument, ...options });
}
export const AllPoapsDocument = gql`
  query allPoaps($address: String!, $sort: String, $page: Float, $perPage: Float) {
    userPOAPs(address: $address, sort: $sort, page: $page, perPage: $perPage) {
      totalPOAPs
      poaps {
        event {
          id
          name
          image_url
        }
        tokenId
      }
    }
  }
`;

export function useAllPoapsQuery(
  options: Omit<Urql.UseQueryArgs<AllPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AllPoapsQuery>({ query: AllPoapsDocument, ...options });
}
export const FeaturedPoapsDocument = gql`
  query featuredPoaps($address: String!) {
    profileFeaturedPOAPs(address: $address) {
      gitPOAPs {
        claim {
          id
          gitPOAP {
            id
            repo {
              name
              organization {
                name
              }
            }
          }
        }
        poap {
          event {
            id
            image_url
            name
            description
          }
          tokenId
        }
      }
      poaps {
        event {
          id
          name
          description
          image_url
        }
        tokenId
      }
    }
  }
`;

export function useFeaturedPoapsQuery(
  options: Omit<Urql.UseQueryArgs<FeaturedPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<FeaturedPoapsQuery>({ query: FeaturedPoapsDocument, ...options });
}
export const AdminClaimsDocument = gql`
  query adminClaims($count: Int!) {
    claims(take: $count, orderBy: { mintedAt: desc }, where: { status: { equals: CLAIMED } }) {
      id
      user {
        id
        githubHandle
      }
      status
      poapTokenId
      address
      updatedAt
      createdAt
      mintedAt
      gitPOAP {
        id
        year
        repo {
          id
          name
          organization {
            id
            name
          }
        }
      }
    }
  }
`;

export function useAdminClaimsQuery(
  options: Omit<Urql.UseQueryArgs<AdminClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AdminClaimsQuery>({ query: AdminClaimsDocument, ...options });
}
export const RepoDataDocument = gql`
  query repoData($repoId: Float!) {
    repoData(repoId: $repoId) {
      id
      name
      githubRepoId
      organization {
        id
        name
        description
        twitterHandle
        url
      }
      gitPOAPs {
        id
      }
      contributorCount
      mintedGitPOAPCount
    }
  }
`;

export function useRepoDataQuery(
  options: Omit<Urql.UseQueryArgs<RepoDataQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoDataQuery>({ query: RepoDataDocument, ...options });
}
export const RepoSeoByIdDocument = gql`
  query repoSEOById($repoId: Float!) {
    repoData(repoId: $repoId) {
      id
      name
      organization {
        name
      }
    }
  }
`;

export function useRepoSeoByIdQuery(
  options: Omit<Urql.UseQueryArgs<RepoSeoByIdQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoSeoByIdQuery>({ query: RepoSeoByIdDocument, ...options });
}
export const RepoSeoByNameDocument = gql`
  query repoSEOByName($orgName: String!, $repoName: String!) {
    repoData(orgName: $orgName, repoName: $repoName) {
      id
      name
      organization {
        name
      }
    }
  }
`;

export function useRepoSeoByNameQuery(
  options: Omit<Urql.UseQueryArgs<RepoSeoByNameQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoSeoByNameQuery>({ query: RepoSeoByNameDocument, ...options });
}
export const RepoStarCountDocument = gql`
  query repoStarCount($repoId: Float!) {
    repoStarCount(repoId: $repoId)
  }
`;

export function useRepoStarCountQuery(
  options: Omit<Urql.UseQueryArgs<RepoStarCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoStarCountQuery>({ query: RepoStarCountDocument, ...options });
}
export const AllReposDocument = gql`
  query allRepos($count: Int!) {
    repos(take: $count, orderBy: { createdAt: desc }) {
      id
      name
      organization {
        name
      }
      createdAt
      gitPOAPs {
        id
      }
    }
  }
`;

export function useAllReposQuery(
  options: Omit<Urql.UseQueryArgs<AllReposQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AllReposQuery>({ query: AllReposDocument, ...options });
}
export const AllReposOnRepoPageDocument = gql`
  query allReposOnRepoPage($sort: String, $page: Float, $perPage: Float) {
    allRepos(sort: $sort, page: $page, perPage: $perPage) {
      id
      name
      githubRepoId
      organization {
        name
      }
      gitPOAPs {
        id
      }
    }
  }
`;

export function useAllReposOnRepoPageQuery(
  options?: Omit<Urql.UseQueryArgs<AllReposOnRepoPageQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AllReposOnRepoPageQuery>({ query: AllReposOnRepoPageDocument, ...options });
}
export const RepoSearchOnRepoPageDocument = gql`
  query repoSearchOnRepoPage($take: Int, $search: String) {
    repos(
      take: $take
      where: {
        OR: [
          { name: { contains: $search, mode: insensitive } }
          { organization: { is: { name: { contains: $search, mode: insensitive } } } }
        ]
      }
    ) {
      id
      name
      githubRepoId
      organization {
        name
      }
      gitPOAPs {
        id
      }
    }
  }
`;

export function useRepoSearchOnRepoPageQuery(
  options?: Omit<Urql.UseQueryArgs<RepoSearchOnRepoPageQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoSearchOnRepoPageQuery>({
    query: RepoSearchOnRepoPageDocument,
    ...options,
  });
}
export const OrganizationDataDocument = gql`
  query organizationData($orgId: Float!) {
    organizationData(orgId: $orgId) {
      id
      name
      description
      twitterHandle
      url
      contributorCount
      gitPOAPCount
      mintedGitPOAPCount
      projectCount
    }
  }
`;

export function useOrganizationDataQuery(
  options: Omit<Urql.UseQueryArgs<OrganizationDataQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrganizationDataQuery>({ query: OrganizationDataDocument, ...options });
}
export const OrganizationSeoByIdDocument = gql`
  query organizationSEOById($orgId: Float!) {
    organizationData(orgId: $orgId) {
      id
      name
    }
  }
`;

export function useOrganizationSeoByIdQuery(
  options: Omit<Urql.UseQueryArgs<OrganizationSeoByIdQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrganizationSeoByIdQuery>({
    query: OrganizationSeoByIdDocument,
    ...options,
  });
}
export const OrganizationSeoByNameDocument = gql`
  query organizationSEOByName($orgName: String!) {
    organizationData(orgName: $orgName) {
      id
      name
    }
  }
`;

export function useOrganizationSeoByNameQuery(
  options: Omit<Urql.UseQueryArgs<OrganizationSeoByNameQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrganizationSeoByNameQuery>({
    query: OrganizationSeoByNameDocument,
    ...options,
  });
}
export const OrganizationsListDocument = gql`
  query organizationsList($sort: String, $page: Float, $perPage: Float) {
    allOrganizations(sort: $sort, page: $page, perPage: $perPage) {
      id
      name
      githubOrgId
      repos {
        id
        gitPOAPs {
          id
        }
      }
    }
  }
`;

export function useOrganizationsListQuery(
  options?: Omit<Urql.UseQueryArgs<OrganizationsListQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrganizationsListQuery>({ query: OrganizationsListDocument, ...options });
}
export const OrganizationReposDocument = gql`
  query organizationRepos($orgId: Float!, $sort: String, $page: Float, $perPage: Float) {
    organizationRepos(orgId: $orgId, sort: $sort, page: $page, perPage: $perPage) {
      id
      name
      contributorCount
      mintedGitPOAPCount
      organization {
        name
      }
    }
  }
`;

export function useOrganizationReposQuery(
  options: Omit<Urql.UseQueryArgs<OrganizationReposQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrganizationReposQuery>({ query: OrganizationReposDocument, ...options });
}
export const TotalRepoCountDocument = gql`
  query totalRepoCount {
    aggregateRepo {
      _count {
        id
      }
    }
  }
`;

export function useTotalRepoCountQuery(
  options?: Omit<Urql.UseQueryArgs<TotalRepoCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalRepoCountQuery>({ query: TotalRepoCountDocument, ...options });
}
export const TotalOrganizationCountDocument = gql`
  query totalOrganizationCount {
    aggregateOrganization {
      _count {
        id
      }
    }
  }
`;

export function useTotalOrganizationCountQuery(
  options?: Omit<Urql.UseQueryArgs<TotalOrganizationCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalOrganizationCountQuery>({
    query: TotalOrganizationCountDocument,
    ...options,
  });
}
export const ClaimsSinceDocument = gql`
  query claimsSince($date: DateTime) {
    claims(where: { status: { equals: CLAIMED }, mintedAt: { gt: $date } }) {
      id
    }
  }
`;

export function useClaimsSinceQuery(
  options?: Omit<Urql.UseQueryArgs<ClaimsSinceQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ClaimsSinceQuery>({ query: ClaimsSinceDocument, ...options });
}
export const ReposSinceDocument = gql`
  query reposSince($date: DateTime) {
    repos(where: { createdAt: { gt: $date } }) {
      id
    }
  }
`;

export function useReposSinceQuery(
  options?: Omit<Urql.UseQueryArgs<ReposSinceQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ReposSinceQuery>({ query: ReposSinceDocument, ...options });
}
export const GitPoaPsSinceDocument = gql`
  query gitPOAPsSince($date: DateTime) {
    gitPOAPS(where: { createdAt: { gt: $date } }) {
      id
    }
  }
`;

export function useGitPoaPsSinceQuery(
  options?: Omit<Urql.UseQueryArgs<GitPoaPsSinceQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoaPsSinceQuery>({ query: GitPoaPsSinceDocument, ...options });
}
export const ProfilesSinceDocument = gql`
  query profilesSince($date: DateTime) {
    profiles(where: { createdAt: { gt: $date } }) {
      id
    }
  }
`;

export function useProfilesSinceQuery(
  options?: Omit<Urql.UseQueryArgs<ProfilesSinceQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ProfilesSinceQuery>({ query: ProfilesSinceDocument, ...options });
}
export const OrgsSinceDocument = gql`
  query orgsSince($date: DateTime) {
    organizations(where: { createdAt: { gt: $date } }) {
      id
    }
  }
`;

export function useOrgsSinceQuery(
  options?: Omit<Urql.UseQueryArgs<OrgsSinceQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrgsSinceQuery>({ query: OrgsSinceDocument, ...options });
}
export const ClaimsCountDocument = gql`
  query claimsCount {
    aggregateClaim {
      _count {
        id
      }
    }
  }
`;

export function useClaimsCountQuery(
  options?: Omit<Urql.UseQueryArgs<ClaimsCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ClaimsCountQuery>({ query: ClaimsCountDocument, ...options });
}
export const MintedClaimsCountDocument = gql`
  query mintedClaimsCount {
    aggregateClaim(where: { status: { equals: CLAIMED } }) {
      _count {
        id
      }
    }
  }
`;

export function useMintedClaimsCountQuery(
  options?: Omit<Urql.UseQueryArgs<MintedClaimsCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MintedClaimsCountQuery>({ query: MintedClaimsCountDocument, ...options });
}
export const AllGitPoapIdsDocument = gql`
  query allGitPOAPIds {
    gitPOAPS {
      id
    }
  }
`;

export function useAllGitPoapIdsQuery(
  options?: Omit<Urql.UseQueryArgs<AllGitPoapIdsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AllGitPoapIdsQuery>({ query: AllGitPoapIdsDocument, ...options });
}
export const ReposGetStaticPathsDocument = gql`
  query reposGetStaticPaths {
    repos {
      id
      name
      organization {
        name
      }
    }
  }
`;

export function useReposGetStaticPathsQuery(
  options?: Omit<Urql.UseQueryArgs<ReposGetStaticPathsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ReposGetStaticPathsQuery>({
    query: ReposGetStaticPathsDocument,
    ...options,
  });
}
export const OrgsGetStaticPathsDocument = gql`
  query orgsGetStaticPaths {
    organizations {
      id
      name
    }
  }
`;

export function useOrgsGetStaticPathsQuery(
  options?: Omit<Urql.UseQueryArgs<OrgsGetStaticPathsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrgsGetStaticPathsQuery>({ query: OrgsGetStaticPathsDocument, ...options });
}
