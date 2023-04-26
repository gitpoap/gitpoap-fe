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
  JSON: any;
};

export type Address = {
  __typename?: 'Address';
  GithubUser?: Maybe<GithubUser>;
  _count?: Maybe<AddressCount>;
  createdAt: Scalars['DateTime'];
  createdGitPOAPs: Array<GitPoap>;
  ensAvatarImageUrl?: Maybe<Scalars['String']>;
  ensName?: Maybe<Scalars['String']>;
  ethAddress: Scalars['String'];
  gitPOAPRequests: Array<GitPoapRequest>;
  githubUserId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  issuedClaims: Array<Claim>;
  memberships: Array<Membership>;
  mintedClaims: Array<Claim>;
  profile?: Maybe<Profile>;
  teams: Array<Team>;
  updatedAt: Scalars['DateTime'];
};

export type AddressCreatedGitPoaPsArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type AddressGitPoapRequestsArgs = {
  cursor?: InputMaybe<GitPoapRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapRequestWhereInput>;
};

export type AddressIssuedClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type AddressMembershipsArgs = {
  cursor?: InputMaybe<MembershipWhereUniqueInput>;
  distinct?: InputMaybe<Array<MembershipScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MembershipOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MembershipWhereInput>;
};

export type AddressMintedClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type AddressTeamsArgs = {
  cursor?: InputMaybe<TeamWhereUniqueInput>;
  distinct?: InputMaybe<Array<TeamScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TeamOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamWhereInput>;
};

export type AddressAvgAggregate = {
  __typename?: 'AddressAvgAggregate';
  githubUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type AddressAvgOrderByAggregateInput = {
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type AddressCount = {
  __typename?: 'AddressCount';
  createdGitPOAPs: Scalars['Int'];
  gitPOAPRequests: Scalars['Int'];
  issuedClaims: Scalars['Int'];
  memberships: Scalars['Int'];
  mintedClaims: Scalars['Int'];
  teams: Scalars['Int'];
};

export type AddressCountAggregate = {
  __typename?: 'AddressCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  ensAvatarImageUrl: Scalars['Int'];
  ensName: Scalars['Int'];
  ethAddress: Scalars['Int'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type AddressCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  ensAvatarImageUrl?: InputMaybe<SortOrder>;
  ensName?: InputMaybe<SortOrder>;
  ethAddress?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressGroupBy = {
  __typename?: 'AddressGroupBy';
  _avg?: Maybe<AddressAvgAggregate>;
  _count?: Maybe<AddressCountAggregate>;
  _max?: Maybe<AddressMaxAggregate>;
  _min?: Maybe<AddressMinAggregate>;
  _sum?: Maybe<AddressSumAggregate>;
  createdAt: Scalars['DateTime'];
  ensAvatarImageUrl?: Maybe<Scalars['String']>;
  ensName?: Maybe<Scalars['String']>;
  ethAddress: Scalars['String'];
  githubUserId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type AddressListRelationFilter = {
  every?: InputMaybe<AddressWhereInput>;
  none?: InputMaybe<AddressWhereInput>;
  some?: InputMaybe<AddressWhereInput>;
};

export type AddressMaxAggregate = {
  __typename?: 'AddressMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  ensAvatarImageUrl?: Maybe<Scalars['String']>;
  ensName?: Maybe<Scalars['String']>;
  ethAddress?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AddressMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  ensAvatarImageUrl?: InputMaybe<SortOrder>;
  ensName?: InputMaybe<SortOrder>;
  ethAddress?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressMinAggregate = {
  __typename?: 'AddressMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  ensAvatarImageUrl?: Maybe<Scalars['String']>;
  ensName?: Maybe<Scalars['String']>;
  ethAddress?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AddressMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  ensAvatarImageUrl?: InputMaybe<SortOrder>;
  ensName?: InputMaybe<SortOrder>;
  ethAddress?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AddressOrderByWithAggregationInput = {
  _avg?: InputMaybe<AddressAvgOrderByAggregateInput>;
  _count?: InputMaybe<AddressCountOrderByAggregateInput>;
  _max?: InputMaybe<AddressMaxOrderByAggregateInput>;
  _min?: InputMaybe<AddressMinOrderByAggregateInput>;
  _sum?: InputMaybe<AddressSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  ensAvatarImageUrl?: InputMaybe<SortOrder>;
  ensName?: InputMaybe<SortOrder>;
  ethAddress?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressOrderByWithRelationInput = {
  GithubUser?: InputMaybe<GithubUserOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  createdGitPOAPs?: InputMaybe<GitPoapOrderByRelationAggregateInput>;
  ensAvatarImageUrl?: InputMaybe<SortOrder>;
  ensName?: InputMaybe<SortOrder>;
  ethAddress?: InputMaybe<SortOrder>;
  gitPOAPRequests?: InputMaybe<GitPoapRequestOrderByRelationAggregateInput>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuedClaims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  memberships?: InputMaybe<MembershipOrderByRelationAggregateInput>;
  mintedClaims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  teams?: InputMaybe<TeamOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressRelationFilter = {
  is?: InputMaybe<AddressWhereInput>;
  isNot?: InputMaybe<AddressWhereInput>;
};

export enum AddressScalarFieldEnum {
  CreatedAt = 'createdAt',
  EnsAvatarImageUrl = 'ensAvatarImageUrl',
  EnsName = 'ensName',
  EthAddress = 'ethAddress',
  GithubUserId = 'githubUserId',
  Id = 'id',
  UpdatedAt = 'updatedAt',
}

export type AddressScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AddressScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<AddressScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AddressScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  ensAvatarImageUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  ensName?: InputMaybe<StringNullableWithAggregatesFilter>;
  ethAddress?: InputMaybe<StringWithAggregatesFilter>;
  githubUserId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type AddressSumAggregate = {
  __typename?: 'AddressSumAggregate';
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type AddressSumOrderByAggregateInput = {
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  GithubUser?: InputMaybe<GithubUserRelationFilter>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdGitPOAPs?: InputMaybe<GitPoapListRelationFilter>;
  ensAvatarImageUrl?: InputMaybe<StringNullableFilter>;
  ensName?: InputMaybe<StringNullableFilter>;
  ethAddress?: InputMaybe<StringFilter>;
  gitPOAPRequests?: InputMaybe<GitPoapRequestListRelationFilter>;
  githubUserId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  issuedClaims?: InputMaybe<ClaimListRelationFilter>;
  memberships?: InputMaybe<MembershipListRelationFilter>;
  mintedClaims?: InputMaybe<ClaimListRelationFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  teams?: InputMaybe<TeamListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AddressWhereUniqueInput = {
  ethAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type AggregateAddress = {
  __typename?: 'AggregateAddress';
  _avg?: Maybe<AddressAvgAggregate>;
  _count?: Maybe<AddressCountAggregate>;
  _max?: Maybe<AddressMaxAggregate>;
  _min?: Maybe<AddressMinAggregate>;
  _sum?: Maybe<AddressSumAggregate>;
};

export type AggregateClaim = {
  __typename?: 'AggregateClaim';
  _avg?: Maybe<ClaimAvgAggregate>;
  _count?: Maybe<ClaimCountAggregate>;
  _max?: Maybe<ClaimMaxAggregate>;
  _min?: Maybe<ClaimMinAggregate>;
  _sum?: Maybe<ClaimSumAggregate>;
};

export type AggregateDiscordUser = {
  __typename?: 'AggregateDiscordUser';
  _avg?: Maybe<DiscordUserAvgAggregate>;
  _count?: Maybe<DiscordUserCountAggregate>;
  _max?: Maybe<DiscordUserMaxAggregate>;
  _min?: Maybe<DiscordUserMinAggregate>;
  _sum?: Maybe<DiscordUserSumAggregate>;
};

export type AggregateEmail = {
  __typename?: 'AggregateEmail';
  _avg?: Maybe<EmailAvgAggregate>;
  _count?: Maybe<EmailCountAggregate>;
  _max?: Maybe<EmailMaxAggregate>;
  _min?: Maybe<EmailMinAggregate>;
  _sum?: Maybe<EmailSumAggregate>;
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

export type AggregateGitPoapRequest = {
  __typename?: 'AggregateGitPOAPRequest';
  _avg?: Maybe<GitPoapRequestAvgAggregate>;
  _count?: Maybe<GitPoapRequestCountAggregate>;
  _max?: Maybe<GitPoapRequestMaxAggregate>;
  _min?: Maybe<GitPoapRequestMinAggregate>;
  _sum?: Maybe<GitPoapRequestSumAggregate>;
};

export type AggregateGithubIssue = {
  __typename?: 'AggregateGithubIssue';
  _avg?: Maybe<GithubIssueAvgAggregate>;
  _count?: Maybe<GithubIssueCountAggregate>;
  _max?: Maybe<GithubIssueMaxAggregate>;
  _min?: Maybe<GithubIssueMinAggregate>;
  _sum?: Maybe<GithubIssueSumAggregate>;
};

export type AggregateGithubMention = {
  __typename?: 'AggregateGithubMention';
  _avg?: Maybe<GithubMentionAvgAggregate>;
  _count?: Maybe<GithubMentionCountAggregate>;
  _max?: Maybe<GithubMentionMaxAggregate>;
  _min?: Maybe<GithubMentionMinAggregate>;
  _sum?: Maybe<GithubMentionSumAggregate>;
};

export type AggregateGithubOrganization = {
  __typename?: 'AggregateGithubOrganization';
  _avg?: Maybe<GithubOrganizationAvgAggregate>;
  _count?: Maybe<GithubOrganizationCountAggregate>;
  _max?: Maybe<GithubOrganizationMaxAggregate>;
  _min?: Maybe<GithubOrganizationMinAggregate>;
  _sum?: Maybe<GithubOrganizationSumAggregate>;
};

export type AggregateGithubPullRequest = {
  __typename?: 'AggregateGithubPullRequest';
  _avg?: Maybe<GithubPullRequestAvgAggregate>;
  _count?: Maybe<GithubPullRequestCountAggregate>;
  _max?: Maybe<GithubPullRequestMaxAggregate>;
  _min?: Maybe<GithubPullRequestMinAggregate>;
  _sum?: Maybe<GithubPullRequestSumAggregate>;
};

export type AggregateGithubUser = {
  __typename?: 'AggregateGithubUser';
  _avg?: Maybe<GithubUserAvgAggregate>;
  _count?: Maybe<GithubUserCountAggregate>;
  _max?: Maybe<GithubUserMaxAggregate>;
  _min?: Maybe<GithubUserMinAggregate>;
  _sum?: Maybe<GithubUserSumAggregate>;
};

export type AggregateMembership = {
  __typename?: 'AggregateMembership';
  _avg?: Maybe<MembershipAvgAggregate>;
  _count?: Maybe<MembershipCountAggregate>;
  _max?: Maybe<MembershipMaxAggregate>;
  _min?: Maybe<MembershipMinAggregate>;
  _sum?: Maybe<MembershipSumAggregate>;
};

export type AggregateProfile = {
  __typename?: 'AggregateProfile';
  _avg?: Maybe<ProfileAvgAggregate>;
  _count?: Maybe<ProfileCountAggregate>;
  _max?: Maybe<ProfileMaxAggregate>;
  _min?: Maybe<ProfileMinAggregate>;
  _sum?: Maybe<ProfileSumAggregate>;
};

export type AggregateProject = {
  __typename?: 'AggregateProject';
  _avg?: Maybe<ProjectAvgAggregate>;
  _count?: Maybe<ProjectCountAggregate>;
  _max?: Maybe<ProjectMaxAggregate>;
  _min?: Maybe<ProjectMinAggregate>;
  _sum?: Maybe<ProjectSumAggregate>;
};

export type AggregateRepo = {
  __typename?: 'AggregateRepo';
  _avg?: Maybe<RepoAvgAggregate>;
  _count?: Maybe<RepoCountAggregate>;
  _max?: Maybe<RepoMaxAggregate>;
  _min?: Maybe<RepoMinAggregate>;
  _sum?: Maybe<RepoSumAggregate>;
};

export type AggregateTeam = {
  __typename?: 'AggregateTeam';
  _avg?: Maybe<TeamAvgAggregate>;
  _count?: Maybe<TeamCountAggregate>;
  _max?: Maybe<TeamMaxAggregate>;
  _min?: Maybe<TeamMinAggregate>;
  _sum?: Maybe<TeamSumAggregate>;
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
  createdAt: Scalars['DateTime'];
  discordUser?: Maybe<DiscordUser>;
  discordUserId?: Maybe<Scalars['Int']>;
  email?: Maybe<Email>;
  emailId?: Maybe<Scalars['Int']>;
  gitPOAP: GitPoap;
  gitPOAPId: Scalars['Int'];
  githubUser?: Maybe<GithubUser>;
  githubUserId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  issuedAddress?: Maybe<Address>;
  issuedAddressId?: Maybe<Scalars['Int']>;
  mentionEarned?: Maybe<GithubMention>;
  mentionEarnedId?: Maybe<Scalars['Int']>;
  mintedAddress?: Maybe<Address>;
  mintedAddressId?: Maybe<Scalars['Int']>;
  mintedAt?: Maybe<Scalars['DateTime']>;
  needsRevalidation: Scalars['Boolean'];
  poapTokenId?: Maybe<Scalars['String']>;
  pullRequestEarned?: Maybe<GithubPullRequest>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  status: ClaimStatus;
  updatedAt: Scalars['DateTime'];
};

export type ClaimAvgAggregate = {
  __typename?: 'ClaimAvgAggregate';
  discordUserId?: Maybe<Scalars['Float']>;
  emailId?: Maybe<Scalars['Float']>;
  gitPOAPId?: Maybe<Scalars['Float']>;
  githubUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  issuedAddressId?: Maybe<Scalars['Float']>;
  mentionEarnedId?: Maybe<Scalars['Float']>;
  mintedAddressId?: Maybe<Scalars['Float']>;
  pullRequestEarnedId?: Maybe<Scalars['Float']>;
};

export type ClaimAvgOrderByAggregateInput = {
  discordUserId?: InputMaybe<SortOrder>;
  emailId?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuedAddressId?: InputMaybe<SortOrder>;
  mentionEarnedId?: InputMaybe<SortOrder>;
  mintedAddressId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
};

export type ClaimCountAggregate = {
  __typename?: 'ClaimCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  discordUserId: Scalars['Int'];
  emailId: Scalars['Int'];
  gitPOAPId: Scalars['Int'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  issuedAddressId: Scalars['Int'];
  mentionEarnedId: Scalars['Int'];
  mintedAddressId: Scalars['Int'];
  mintedAt: Scalars['Int'];
  needsRevalidation: Scalars['Int'];
  poapTokenId: Scalars['Int'];
  pullRequestEarnedId: Scalars['Int'];
  qrHash: Scalars['Int'];
  status: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type ClaimCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  discordUserId?: InputMaybe<SortOrder>;
  emailId?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuedAddressId?: InputMaybe<SortOrder>;
  mentionEarnedId?: InputMaybe<SortOrder>;
  mintedAddressId?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  needsRevalidation?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ClaimGitPoapIdEmailIdCompoundUniqueInput = {
  emailId: Scalars['Int'];
  gitPOAPId: Scalars['Int'];
};

export type ClaimGitPoapIdGithubUserIdCompoundUniqueInput = {
  gitPOAPId: Scalars['Int'];
  githubUserId: Scalars['Int'];
};

export type ClaimGitPoapIdIssuedAddressIdCompoundUniqueInput = {
  gitPOAPId: Scalars['Int'];
  issuedAddressId: Scalars['Int'];
};

export type ClaimGitPoapIdMintedAddressIdCompoundUniqueInput = {
  gitPOAPId: Scalars['Int'];
  mintedAddressId: Scalars['Int'];
};

export type ClaimGroupBy = {
  __typename?: 'ClaimGroupBy';
  _avg?: Maybe<ClaimAvgAggregate>;
  _count?: Maybe<ClaimCountAggregate>;
  _max?: Maybe<ClaimMaxAggregate>;
  _min?: Maybe<ClaimMinAggregate>;
  _sum?: Maybe<ClaimSumAggregate>;
  createdAt: Scalars['DateTime'];
  discordUserId?: Maybe<Scalars['Int']>;
  emailId?: Maybe<Scalars['Int']>;
  gitPOAPId: Scalars['Int'];
  githubUserId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  issuedAddressId?: Maybe<Scalars['Int']>;
  mentionEarnedId?: Maybe<Scalars['Int']>;
  mintedAddressId?: Maybe<Scalars['Int']>;
  mintedAt?: Maybe<Scalars['DateTime']>;
  needsRevalidation: Scalars['Boolean'];
  poapTokenId?: Maybe<Scalars['String']>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  qrHash?: Maybe<Scalars['String']>;
  status: ClaimStatus;
  updatedAt: Scalars['DateTime'];
};

export type ClaimListRelationFilter = {
  every?: InputMaybe<ClaimWhereInput>;
  none?: InputMaybe<ClaimWhereInput>;
  some?: InputMaybe<ClaimWhereInput>;
};

export type ClaimMaxAggregate = {
  __typename?: 'ClaimMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  discordUserId?: Maybe<Scalars['Int']>;
  emailId?: Maybe<Scalars['Int']>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  issuedAddressId?: Maybe<Scalars['Int']>;
  mentionEarnedId?: Maybe<Scalars['Int']>;
  mintedAddressId?: Maybe<Scalars['Int']>;
  mintedAt?: Maybe<Scalars['DateTime']>;
  needsRevalidation?: Maybe<Scalars['Boolean']>;
  poapTokenId?: Maybe<Scalars['String']>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  qrHash?: Maybe<Scalars['String']>;
  status?: Maybe<ClaimStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ClaimMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  discordUserId?: InputMaybe<SortOrder>;
  emailId?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuedAddressId?: InputMaybe<SortOrder>;
  mentionEarnedId?: InputMaybe<SortOrder>;
  mintedAddressId?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  needsRevalidation?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ClaimMinAggregate = {
  __typename?: 'ClaimMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  discordUserId?: Maybe<Scalars['Int']>;
  emailId?: Maybe<Scalars['Int']>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  issuedAddressId?: Maybe<Scalars['Int']>;
  mentionEarnedId?: Maybe<Scalars['Int']>;
  mintedAddressId?: Maybe<Scalars['Int']>;
  mintedAt?: Maybe<Scalars['DateTime']>;
  needsRevalidation?: Maybe<Scalars['Boolean']>;
  poapTokenId?: Maybe<Scalars['String']>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
  qrHash?: Maybe<Scalars['String']>;
  status?: Maybe<ClaimStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ClaimMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  discordUserId?: InputMaybe<SortOrder>;
  emailId?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuedAddressId?: InputMaybe<SortOrder>;
  mentionEarnedId?: InputMaybe<SortOrder>;
  mintedAddressId?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  needsRevalidation?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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
  createdAt?: InputMaybe<SortOrder>;
  discordUserId?: InputMaybe<SortOrder>;
  emailId?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuedAddressId?: InputMaybe<SortOrder>;
  mentionEarnedId?: InputMaybe<SortOrder>;
  mintedAddressId?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  needsRevalidation?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ClaimOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  discordUser?: InputMaybe<DiscordUserOrderByWithRelationInput>;
  discordUserId?: InputMaybe<SortOrder>;
  email?: InputMaybe<EmailOrderByWithRelationInput>;
  emailId?: InputMaybe<SortOrder>;
  gitPOAP?: InputMaybe<GitPoapOrderByWithRelationInput>;
  gitPOAPId?: InputMaybe<SortOrder>;
  githubUser?: InputMaybe<GithubUserOrderByWithRelationInput>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuedAddress?: InputMaybe<AddressOrderByWithRelationInput>;
  issuedAddressId?: InputMaybe<SortOrder>;
  mentionEarned?: InputMaybe<GithubMentionOrderByWithRelationInput>;
  mentionEarnedId?: InputMaybe<SortOrder>;
  mintedAddress?: InputMaybe<AddressOrderByWithRelationInput>;
  mintedAddressId?: InputMaybe<SortOrder>;
  mintedAt?: InputMaybe<SortOrder>;
  needsRevalidation?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  pullRequestEarned?: InputMaybe<GithubPullRequestOrderByWithRelationInput>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ClaimScalarFieldEnum {
  CreatedAt = 'createdAt',
  DiscordUserId = 'discordUserId',
  EmailId = 'emailId',
  GitPoapId = 'gitPOAPId',
  GithubUserId = 'githubUserId',
  Id = 'id',
  IssuedAddressId = 'issuedAddressId',
  MentionEarnedId = 'mentionEarnedId',
  MintedAddressId = 'mintedAddressId',
  MintedAt = 'mintedAt',
  NeedsRevalidation = 'needsRevalidation',
  PoapTokenId = 'poapTokenId',
  PullRequestEarnedId = 'pullRequestEarnedId',
  QrHash = 'qrHash',
  Status = 'status',
  UpdatedAt = 'updatedAt',
}

export type ClaimScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ClaimScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ClaimScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ClaimScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  discordUserId?: InputMaybe<IntNullableWithAggregatesFilter>;
  emailId?: InputMaybe<IntNullableWithAggregatesFilter>;
  gitPOAPId?: InputMaybe<IntWithAggregatesFilter>;
  githubUserId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  issuedAddressId?: InputMaybe<IntNullableWithAggregatesFilter>;
  mentionEarnedId?: InputMaybe<IntNullableWithAggregatesFilter>;
  mintedAddressId?: InputMaybe<IntNullableWithAggregatesFilter>;
  mintedAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  needsRevalidation?: InputMaybe<BoolWithAggregatesFilter>;
  poapTokenId?: InputMaybe<StringNullableWithAggregatesFilter>;
  pullRequestEarnedId?: InputMaybe<IntNullableWithAggregatesFilter>;
  status?: InputMaybe<EnumClaimStatusWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export enum ClaimStatus {
  Claimed = 'CLAIMED',
  Minting = 'MINTING',
  Pending = 'PENDING',
  Unclaimed = 'UNCLAIMED',
}

export type ClaimSumAggregate = {
  __typename?: 'ClaimSumAggregate';
  discordUserId?: Maybe<Scalars['Int']>;
  emailId?: Maybe<Scalars['Int']>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  issuedAddressId?: Maybe<Scalars['Int']>;
  mentionEarnedId?: Maybe<Scalars['Int']>;
  mintedAddressId?: Maybe<Scalars['Int']>;
  pullRequestEarnedId?: Maybe<Scalars['Int']>;
};

export type ClaimSumOrderByAggregateInput = {
  discordUserId?: InputMaybe<SortOrder>;
  emailId?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issuedAddressId?: InputMaybe<SortOrder>;
  mentionEarnedId?: InputMaybe<SortOrder>;
  mintedAddressId?: InputMaybe<SortOrder>;
  pullRequestEarnedId?: InputMaybe<SortOrder>;
};

export type ClaimWhereInput = {
  AND?: InputMaybe<Array<ClaimWhereInput>>;
  NOT?: InputMaybe<Array<ClaimWhereInput>>;
  OR?: InputMaybe<Array<ClaimWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  discordUser?: InputMaybe<DiscordUserRelationFilter>;
  discordUserId?: InputMaybe<IntNullableFilter>;
  email?: InputMaybe<EmailRelationFilter>;
  emailId?: InputMaybe<IntNullableFilter>;
  gitPOAP?: InputMaybe<GitPoapRelationFilter>;
  gitPOAPId?: InputMaybe<IntFilter>;
  githubUser?: InputMaybe<GithubUserRelationFilter>;
  githubUserId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  issuedAddress?: InputMaybe<AddressRelationFilter>;
  issuedAddressId?: InputMaybe<IntNullableFilter>;
  mentionEarned?: InputMaybe<GithubMentionRelationFilter>;
  mentionEarnedId?: InputMaybe<IntNullableFilter>;
  mintedAddress?: InputMaybe<AddressRelationFilter>;
  mintedAddressId?: InputMaybe<IntNullableFilter>;
  mintedAt?: InputMaybe<DateTimeNullableFilter>;
  needsRevalidation?: InputMaybe<BoolFilter>;
  poapTokenId?: InputMaybe<StringNullableFilter>;
  pullRequestEarned?: InputMaybe<GithubPullRequestRelationFilter>;
  pullRequestEarnedId?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<EnumClaimStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ClaimWhereUniqueInput = {
  gitPOAPId_emailId?: InputMaybe<ClaimGitPoapIdEmailIdCompoundUniqueInput>;
  gitPOAPId_githubUserId?: InputMaybe<ClaimGitPoapIdGithubUserIdCompoundUniqueInput>;
  gitPOAPId_issuedAddressId?: InputMaybe<ClaimGitPoapIdIssuedAddressIdCompoundUniqueInput>;
  gitPOAPId_mintedAddressId?: InputMaybe<ClaimGitPoapIdMintedAddressIdCompoundUniqueInput>;
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

export type DiscordUser = {
  __typename?: 'DiscordUser';
  _count?: Maybe<DiscordUserCount>;
  claims: Array<Claim>;
  createdAt: Scalars['DateTime'];
  discordHandle: Scalars['String'];
  discordId: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type DiscordUserClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type DiscordUserAvgAggregate = {
  __typename?: 'DiscordUserAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type DiscordUserAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type DiscordUserCount = {
  __typename?: 'DiscordUserCount';
  claims: Scalars['Int'];
};

export type DiscordUserCountAggregate = {
  __typename?: 'DiscordUserCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  discordHandle: Scalars['Int'];
  discordId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type DiscordUserCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  discordId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DiscordUserGroupBy = {
  __typename?: 'DiscordUserGroupBy';
  _avg?: Maybe<DiscordUserAvgAggregate>;
  _count?: Maybe<DiscordUserCountAggregate>;
  _max?: Maybe<DiscordUserMaxAggregate>;
  _min?: Maybe<DiscordUserMinAggregate>;
  _sum?: Maybe<DiscordUserSumAggregate>;
  createdAt: Scalars['DateTime'];
  discordHandle: Scalars['String'];
  discordId: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type DiscordUserMaxAggregate = {
  __typename?: 'DiscordUserMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  discordHandle?: Maybe<Scalars['String']>;
  discordId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DiscordUserMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  discordId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DiscordUserMinAggregate = {
  __typename?: 'DiscordUserMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  discordHandle?: Maybe<Scalars['String']>;
  discordId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DiscordUserMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  discordId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DiscordUserOrderByWithAggregationInput = {
  _avg?: InputMaybe<DiscordUserAvgOrderByAggregateInput>;
  _count?: InputMaybe<DiscordUserCountOrderByAggregateInput>;
  _max?: InputMaybe<DiscordUserMaxOrderByAggregateInput>;
  _min?: InputMaybe<DiscordUserMinOrderByAggregateInput>;
  _sum?: InputMaybe<DiscordUserSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  discordId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DiscordUserOrderByWithRelationInput = {
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  discordId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DiscordUserRelationFilter = {
  is?: InputMaybe<DiscordUserWhereInput>;
  isNot?: InputMaybe<DiscordUserWhereInput>;
};

export enum DiscordUserScalarFieldEnum {
  CreatedAt = 'createdAt',
  DiscordHandle = 'discordHandle',
  DiscordId = 'discordId',
  Id = 'id',
  UpdatedAt = 'updatedAt',
}

export type DiscordUserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DiscordUserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<DiscordUserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DiscordUserScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  discordHandle?: InputMaybe<StringWithAggregatesFilter>;
  discordId?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type DiscordUserSumAggregate = {
  __typename?: 'DiscordUserSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type DiscordUserSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type DiscordUserWhereInput = {
  AND?: InputMaybe<Array<DiscordUserWhereInput>>;
  NOT?: InputMaybe<Array<DiscordUserWhereInput>>;
  OR?: InputMaybe<Array<DiscordUserWhereInput>>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  discordHandle?: InputMaybe<StringFilter>;
  discordId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DiscordUserWhereUniqueInput = {
  discordId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type Email = {
  __typename?: 'Email';
  _count?: Maybe<EmailCount>;
  createdAt: Scalars['DateTime'];
  emailAddress: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type EmailAvgAggregate = {
  __typename?: 'EmailAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type EmailCount = {
  __typename?: 'EmailCount';
  claims: Scalars['Int'];
  createdGitPOAPRequests: Scalars['Int'];
  createdGitPOAPs: Scalars['Int'];
};

export type EmailCountAggregate = {
  __typename?: 'EmailCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  emailAddress: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type EmailMaxAggregate = {
  __typename?: 'EmailMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  emailAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmailMinAggregate = {
  __typename?: 'EmailMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  emailAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmailOrderByWithRelationInput = {
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  createdGitPOAPRequests?: InputMaybe<GitPoapRequestOrderByRelationAggregateInput>;
  createdGitPOAPs?: InputMaybe<GitPoapOrderByRelationAggregateInput>;
  emailAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EmailRelationFilter = {
  is?: InputMaybe<EmailWhereInput>;
  isNot?: InputMaybe<EmailWhereInput>;
};

export type EmailSumAggregate = {
  __typename?: 'EmailSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type EmailWhereInput = {
  AND?: InputMaybe<Array<EmailWhereInput>>;
  NOT?: InputMaybe<Array<EmailWhereInput>>;
  OR?: InputMaybe<Array<EmailWhereInput>>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdGitPOAPRequests?: InputMaybe<GitPoapRequestListRelationFilter>;
  createdGitPOAPs?: InputMaybe<GitPoapListRelationFilter>;
  emailAddress?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EmailWhereUniqueInput = {
  emailAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
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

export type EnumGitPoapTypeFilter = {
  equals?: InputMaybe<GitPoapType>;
  in?: InputMaybe<Array<GitPoapType>>;
  not?: InputMaybe<NestedEnumGitPoapTypeFilter>;
  notIn?: InputMaybe<Array<GitPoapType>>;
};

export type EnumGitPoapTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumGitPoapTypeFilter>;
  _min?: InputMaybe<NestedEnumGitPoapTypeFilter>;
  equals?: InputMaybe<GitPoapType>;
  in?: InputMaybe<Array<GitPoapType>>;
  not?: InputMaybe<NestedEnumGitPoapTypeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<GitPoapType>>;
};

export type EnumMembershipAcceptanceStatusFilter = {
  equals?: InputMaybe<MembershipAcceptanceStatus>;
  in?: InputMaybe<Array<MembershipAcceptanceStatus>>;
  not?: InputMaybe<NestedEnumMembershipAcceptanceStatusFilter>;
  notIn?: InputMaybe<Array<MembershipAcceptanceStatus>>;
};

export type EnumMembershipAcceptanceStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumMembershipAcceptanceStatusFilter>;
  _min?: InputMaybe<NestedEnumMembershipAcceptanceStatusFilter>;
  equals?: InputMaybe<MembershipAcceptanceStatus>;
  in?: InputMaybe<Array<MembershipAcceptanceStatus>>;
  not?: InputMaybe<NestedEnumMembershipAcceptanceStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<MembershipAcceptanceStatus>>;
};

export type EnumMembershipRoleFilter = {
  equals?: InputMaybe<MembershipRole>;
  in?: InputMaybe<Array<MembershipRole>>;
  not?: InputMaybe<NestedEnumMembershipRoleFilter>;
  notIn?: InputMaybe<Array<MembershipRole>>;
};

export type EnumMembershipRoleWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumMembershipRoleFilter>;
  _min?: InputMaybe<NestedEnumMembershipRoleFilter>;
  equals?: InputMaybe<MembershipRole>;
  in?: InputMaybe<Array<MembershipRole>>;
  not?: InputMaybe<NestedEnumMembershipRoleWithAggregatesFilter>;
  notIn?: InputMaybe<Array<MembershipRole>>;
};

export type EnumStaffApprovalStatusFilter = {
  equals?: InputMaybe<StaffApprovalStatus>;
  in?: InputMaybe<Array<StaffApprovalStatus>>;
  not?: InputMaybe<NestedEnumStaffApprovalStatusFilter>;
  notIn?: InputMaybe<Array<StaffApprovalStatus>>;
};

export type EnumStaffApprovalStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumStaffApprovalStatusFilter>;
  _min?: InputMaybe<NestedEnumStaffApprovalStatusFilter>;
  equals?: InputMaybe<StaffApprovalStatus>;
  in?: InputMaybe<Array<StaffApprovalStatus>>;
  not?: InputMaybe<NestedEnumStaffApprovalStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<StaffApprovalStatus>>;
};

export type Event = {
  __typename?: 'Event';
  _count?: Maybe<EventCount>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  discordHandle?: Maybe<Scalars['String']>;
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
  gitPOAPs: Scalars['Int'];
};

export type EventOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  gitPOAPs?: InputMaybe<GitPoapOrderByRelationAggregateInput>;
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
  NOT?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  discordHandle?: InputMaybe<StringNullableFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  gitPOAPs?: InputMaybe<GitPoapListRelationFilter>;
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
  canRequestMoreCodes: Scalars['Boolean'];
  claims: Array<Claim>;
  createdAt: Scalars['DateTime'];
  creatorAddress?: Maybe<Address>;
  creatorAddressId?: Maybe<Scalars['Int']>;
  creatorEmail?: Maybe<Email>;
  creatorEmailId?: Maybe<Scalars['Int']>;
  description: Scalars['String'];
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['Int']>;
  gitPOAPRequest?: Maybe<GitPoapRequest>;
  gitPOAPRequestId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  isPRBased: Scalars['Boolean'];
  level: Scalars['Int'];
  name: Scalars['String'];
  poapApprovalStatus: GitPoapStatus;
  poapEventId: Scalars['Int'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  redeemCodes: Array<RedeemCode>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']>;
  threshold: Scalars['Int'];
  type: GitPoapType;
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
  creatorAddressId?: Maybe<Scalars['Float']>;
  creatorEmailId?: Maybe<Scalars['Float']>;
  eventId?: Maybe<Scalars['Float']>;
  gitPOAPRequestId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
  poapEventId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  teamId?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type GitPoapAvgOrderByAggregateInput = {
  creatorAddressId?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  gitPOAPRequestId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
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
  canRequestMoreCodes: Scalars['Int'];
  createdAt: Scalars['Int'];
  creatorAddressId: Scalars['Int'];
  creatorEmailId: Scalars['Int'];
  description: Scalars['Int'];
  eventId: Scalars['Int'];
  gitPOAPRequestId: Scalars['Int'];
  id: Scalars['Int'];
  imageUrl: Scalars['Int'];
  isEnabled: Scalars['Int'];
  isPRBased: Scalars['Int'];
  level: Scalars['Int'];
  name: Scalars['Int'];
  poapApprovalStatus: Scalars['Int'];
  poapEventId: Scalars['Int'];
  poapSecret: Scalars['Int'];
  projectId: Scalars['Int'];
  teamId: Scalars['Int'];
  threshold: Scalars['Int'];
  type: Scalars['Int'];
  updatedAt: Scalars['Int'];
  year: Scalars['Int'];
};

export type GitPoapCountOrderByAggregateInput = {
  canRequestMoreCodes?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorAddressId?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  gitPOAPRequestId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  isEnabled?: InputMaybe<SortOrder>;
  isPRBased?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  poapApprovalStatus?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
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
  canRequestMoreCodes: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  creatorAddressId?: Maybe<Scalars['Int']>;
  creatorEmailId?: Maybe<Scalars['Int']>;
  description: Scalars['String'];
  eventId?: Maybe<Scalars['Int']>;
  gitPOAPRequestId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  isPRBased: Scalars['Boolean'];
  level: Scalars['Int'];
  name: Scalars['String'];
  poapApprovalStatus: GitPoapStatus;
  poapEventId: Scalars['Int'];
  poapSecret: Scalars['String'];
  projectId?: Maybe<Scalars['Int']>;
  teamId?: Maybe<Scalars['Int']>;
  threshold: Scalars['Int'];
  type: GitPoapType;
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
  canRequestMoreCodes?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creatorAddressId?: Maybe<Scalars['Int']>;
  creatorEmailId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['Int']>;
  gitPOAPRequestId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
  isPRBased?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  poapApprovalStatus?: Maybe<GitPoapStatus>;
  poapEventId?: Maybe<Scalars['Int']>;
  poapSecret?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['Int']>;
  teamId?: Maybe<Scalars['Int']>;
  threshold?: Maybe<Scalars['Int']>;
  type?: Maybe<GitPoapType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  year?: Maybe<Scalars['Int']>;
};

export type GitPoapMaxOrderByAggregateInput = {
  canRequestMoreCodes?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorAddressId?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  gitPOAPRequestId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  isEnabled?: InputMaybe<SortOrder>;
  isPRBased?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  poapApprovalStatus?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapMinAggregate = {
  __typename?: 'GitPOAPMinAggregate';
  canRequestMoreCodes?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creatorAddressId?: Maybe<Scalars['Int']>;
  creatorEmailId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['Int']>;
  gitPOAPRequestId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
  isPRBased?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  poapApprovalStatus?: Maybe<GitPoapStatus>;
  poapEventId?: Maybe<Scalars['Int']>;
  poapSecret?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['Int']>;
  teamId?: Maybe<Scalars['Int']>;
  threshold?: Maybe<Scalars['Int']>;
  type?: Maybe<GitPoapType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  year?: Maybe<Scalars['Int']>;
};

export type GitPoapMinOrderByAggregateInput = {
  canRequestMoreCodes?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorAddressId?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  gitPOAPRequestId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  isEnabled?: InputMaybe<SortOrder>;
  isPRBased?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  poapApprovalStatus?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
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
  canRequestMoreCodes?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorAddressId?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  gitPOAPRequestId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  isEnabled?: InputMaybe<SortOrder>;
  isPRBased?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  poapApprovalStatus?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapOrderByWithRelationInput = {
  canRequestMoreCodes?: InputMaybe<SortOrder>;
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  creatorAddress?: InputMaybe<AddressOrderByWithRelationInput>;
  creatorAddressId?: InputMaybe<SortOrder>;
  creatorEmail?: InputMaybe<EmailOrderByWithRelationInput>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  event?: InputMaybe<EventOrderByWithRelationInput>;
  eventId?: InputMaybe<SortOrder>;
  gitPOAPRequest?: InputMaybe<GitPoapRequestOrderByWithRelationInput>;
  gitPOAPRequestId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  isEnabled?: InputMaybe<SortOrder>;
  isPRBased?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  poapApprovalStatus?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  project?: InputMaybe<ProjectOrderByWithRelationInput>;
  projectId?: InputMaybe<SortOrder>;
  redeemCodes?: InputMaybe<RedeemCodeOrderByRelationAggregateInput>;
  team?: InputMaybe<TeamOrderByWithRelationInput>;
  teamId?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapRelationFilter = {
  is?: InputMaybe<GitPoapWhereInput>;
  isNot?: InputMaybe<GitPoapWhereInput>;
};

export type GitPoapRequest = {
  __typename?: 'GitPOAPRequest';
  address: Address;
  addressId: Scalars['Int'];
  contributors: Scalars['JSON'];
  createdAt: Scalars['DateTime'];
  creatorEmail: Email;
  creatorEmailId: Scalars['Int'];
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  gitPOAP?: Maybe<GitPoap>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  numRequestedCodes: Scalars['Int'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  rejectionReason?: Maybe<Scalars['String']>;
  staffApprovalStatus: StaffApprovalStatus;
  startDate: Scalars['DateTime'];
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
};

export type GitPoapRequestAvgAggregate = {
  __typename?: 'GitPOAPRequestAvgAggregate';
  addressId?: Maybe<Scalars['Float']>;
  creatorEmailId?: Maybe<Scalars['Float']>;
  gitPOAPId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  numRequestedCodes?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  teamId?: Maybe<Scalars['Float']>;
};

export type GitPoapRequestAvgOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  numRequestedCodes?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
};

export type GitPoapRequestCountAggregate = {
  __typename?: 'GitPOAPRequestCountAggregate';
  _all: Scalars['Int'];
  addressId: Scalars['Int'];
  contributors: Scalars['Int'];
  createdAt: Scalars['Int'];
  creatorEmailId: Scalars['Int'];
  description: Scalars['Int'];
  endDate: Scalars['Int'];
  gitPOAPId: Scalars['Int'];
  id: Scalars['Int'];
  imageUrl: Scalars['Int'];
  name: Scalars['Int'];
  numRequestedCodes: Scalars['Int'];
  projectId: Scalars['Int'];
  rejectionReason: Scalars['Int'];
  staffApprovalStatus: Scalars['Int'];
  startDate: Scalars['Int'];
  teamId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type GitPoapRequestCountOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  contributors?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numRequestedCodes?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  rejectionReason?: InputMaybe<SortOrder>;
  staffApprovalStatus?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GitPoapRequestGroupBy = {
  __typename?: 'GitPOAPRequestGroupBy';
  _avg?: Maybe<GitPoapRequestAvgAggregate>;
  _count?: Maybe<GitPoapRequestCountAggregate>;
  _max?: Maybe<GitPoapRequestMaxAggregate>;
  _min?: Maybe<GitPoapRequestMinAggregate>;
  _sum?: Maybe<GitPoapRequestSumAggregate>;
  addressId: Scalars['Int'];
  contributors: Scalars['JSON'];
  createdAt: Scalars['DateTime'];
  creatorEmailId: Scalars['Int'];
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  gitPOAPId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  numRequestedCodes: Scalars['Int'];
  projectId?: Maybe<Scalars['Int']>;
  rejectionReason?: Maybe<Scalars['String']>;
  staffApprovalStatus: StaffApprovalStatus;
  startDate: Scalars['DateTime'];
  teamId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
};

export type GitPoapRequestListRelationFilter = {
  every?: InputMaybe<GitPoapRequestWhereInput>;
  none?: InputMaybe<GitPoapRequestWhereInput>;
  some?: InputMaybe<GitPoapRequestWhereInput>;
};

export type GitPoapRequestMaxAggregate = {
  __typename?: 'GitPOAPRequestMaxAggregate';
  addressId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creatorEmailId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numRequestedCodes?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  rejectionReason?: Maybe<Scalars['String']>;
  staffApprovalStatus?: Maybe<StaffApprovalStatus>;
  startDate?: Maybe<Scalars['DateTime']>;
  teamId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GitPoapRequestMaxOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numRequestedCodes?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  rejectionReason?: InputMaybe<SortOrder>;
  staffApprovalStatus?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GitPoapRequestMinAggregate = {
  __typename?: 'GitPOAPRequestMinAggregate';
  addressId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creatorEmailId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numRequestedCodes?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  rejectionReason?: Maybe<Scalars['String']>;
  staffApprovalStatus?: Maybe<StaffApprovalStatus>;
  startDate?: Maybe<Scalars['DateTime']>;
  teamId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GitPoapRequestMinOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numRequestedCodes?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  rejectionReason?: InputMaybe<SortOrder>;
  staffApprovalStatus?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GitPoapRequestOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GitPoapRequestOrderByWithAggregationInput = {
  _avg?: InputMaybe<GitPoapRequestAvgOrderByAggregateInput>;
  _count?: InputMaybe<GitPoapRequestCountOrderByAggregateInput>;
  _max?: InputMaybe<GitPoapRequestMaxOrderByAggregateInput>;
  _min?: InputMaybe<GitPoapRequestMinOrderByAggregateInput>;
  _sum?: InputMaybe<GitPoapRequestSumOrderByAggregateInput>;
  addressId?: InputMaybe<SortOrder>;
  contributors?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numRequestedCodes?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  rejectionReason?: InputMaybe<SortOrder>;
  staffApprovalStatus?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GitPoapRequestOrderByWithRelationInput = {
  address?: InputMaybe<AddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrder>;
  contributors?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorEmail?: InputMaybe<EmailOrderByWithRelationInput>;
  creatorEmailId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  gitPOAP?: InputMaybe<GitPoapOrderByWithRelationInput>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numRequestedCodes?: InputMaybe<SortOrder>;
  project?: InputMaybe<ProjectOrderByWithRelationInput>;
  projectId?: InputMaybe<SortOrder>;
  rejectionReason?: InputMaybe<SortOrder>;
  staffApprovalStatus?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  team?: InputMaybe<TeamOrderByWithRelationInput>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GitPoapRequestRelationFilter = {
  is?: InputMaybe<GitPoapRequestWhereInput>;
  isNot?: InputMaybe<GitPoapRequestWhereInput>;
};

export enum GitPoapRequestScalarFieldEnum {
  AddressId = 'addressId',
  Contributors = 'contributors',
  CreatedAt = 'createdAt',
  CreatorEmailId = 'creatorEmailId',
  Description = 'description',
  EndDate = 'endDate',
  GitPoapId = 'gitPOAPId',
  Id = 'id',
  ImageUrl = 'imageUrl',
  Name = 'name',
  NumRequestedCodes = 'numRequestedCodes',
  ProjectId = 'projectId',
  RejectionReason = 'rejectionReason',
  StaffApprovalStatus = 'staffApprovalStatus',
  StartDate = 'startDate',
  TeamId = 'teamId',
  UpdatedAt = 'updatedAt',
}

export type GitPoapRequestScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GitPoapRequestScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GitPoapRequestScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GitPoapRequestScalarWhereWithAggregatesInput>>;
  addressId?: InputMaybe<IntWithAggregatesFilter>;
  contributors?: InputMaybe<JsonWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  creatorEmailId?: InputMaybe<IntWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  endDate?: InputMaybe<DateTimeWithAggregatesFilter>;
  gitPOAPId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  imageUrl?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  numRequestedCodes?: InputMaybe<IntWithAggregatesFilter>;
  projectId?: InputMaybe<IntNullableWithAggregatesFilter>;
  rejectionReason?: InputMaybe<StringNullableWithAggregatesFilter>;
  staffApprovalStatus?: InputMaybe<EnumStaffApprovalStatusWithAggregatesFilter>;
  startDate?: InputMaybe<DateTimeWithAggregatesFilter>;
  teamId?: InputMaybe<IntNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GitPoapRequestSumAggregate = {
  __typename?: 'GitPOAPRequestSumAggregate';
  addressId?: Maybe<Scalars['Int']>;
  creatorEmailId?: Maybe<Scalars['Int']>;
  gitPOAPId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  numRequestedCodes?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  teamId?: Maybe<Scalars['Int']>;
};

export type GitPoapRequestSumOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  numRequestedCodes?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
};

export type GitPoapRequestWhereInput = {
  AND?: InputMaybe<Array<GitPoapRequestWhereInput>>;
  NOT?: InputMaybe<Array<GitPoapRequestWhereInput>>;
  OR?: InputMaybe<Array<GitPoapRequestWhereInput>>;
  address?: InputMaybe<AddressRelationFilter>;
  addressId?: InputMaybe<IntFilter>;
  contributors?: InputMaybe<JsonFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creatorEmail?: InputMaybe<EmailRelationFilter>;
  creatorEmailId?: InputMaybe<IntFilter>;
  description?: InputMaybe<StringFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  gitPOAP?: InputMaybe<GitPoapRelationFilter>;
  gitPOAPId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  imageUrl?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numRequestedCodes?: InputMaybe<IntFilter>;
  project?: InputMaybe<ProjectRelationFilter>;
  projectId?: InputMaybe<IntNullableFilter>;
  rejectionReason?: InputMaybe<StringNullableFilter>;
  staffApprovalStatus?: InputMaybe<EnumStaffApprovalStatusFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  team?: InputMaybe<TeamRelationFilter>;
  teamId?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GitPoapRequestWhereUniqueInput = {
  gitPOAPId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export enum GitPoapScalarFieldEnum {
  CanRequestMoreCodes = 'canRequestMoreCodes',
  CreatedAt = 'createdAt',
  CreatorAddressId = 'creatorAddressId',
  CreatorEmailId = 'creatorEmailId',
  Description = 'description',
  EventId = 'eventId',
  GitPoapRequestId = 'gitPOAPRequestId',
  Id = 'id',
  ImageUrl = 'imageUrl',
  IsEnabled = 'isEnabled',
  IsPrBased = 'isPRBased',
  Level = 'level',
  Name = 'name',
  PoapApprovalStatus = 'poapApprovalStatus',
  PoapEventId = 'poapEventId',
  PoapSecret = 'poapSecret',
  ProjectId = 'projectId',
  TeamId = 'teamId',
  Threshold = 'threshold',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Year = 'year',
}

export type GitPoapScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GitPoapScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GitPoapScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GitPoapScalarWhereWithAggregatesInput>>;
  canRequestMoreCodes?: InputMaybe<BoolWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  creatorAddressId?: InputMaybe<IntNullableWithAggregatesFilter>;
  creatorEmailId?: InputMaybe<IntNullableWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  eventId?: InputMaybe<IntNullableWithAggregatesFilter>;
  gitPOAPRequestId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  imageUrl?: InputMaybe<StringWithAggregatesFilter>;
  isEnabled?: InputMaybe<BoolWithAggregatesFilter>;
  isPRBased?: InputMaybe<BoolWithAggregatesFilter>;
  level?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  poapApprovalStatus?: InputMaybe<EnumGitPoapStatusWithAggregatesFilter>;
  poapEventId?: InputMaybe<IntWithAggregatesFilter>;
  projectId?: InputMaybe<IntNullableWithAggregatesFilter>;
  teamId?: InputMaybe<IntNullableWithAggregatesFilter>;
  threshold?: InputMaybe<IntWithAggregatesFilter>;
  type?: InputMaybe<EnumGitPoapTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  year?: InputMaybe<IntWithAggregatesFilter>;
};

export enum GitPoapStatus {
  Approved = 'APPROVED',
  Deprecated = 'DEPRECATED',
  RedeemRequestPending = 'REDEEM_REQUEST_PENDING',
  Unapproved = 'UNAPPROVED',
}

export type GitPoapSumAggregate = {
  __typename?: 'GitPOAPSumAggregate';
  creatorAddressId?: Maybe<Scalars['Int']>;
  creatorEmailId?: Maybe<Scalars['Int']>;
  eventId?: Maybe<Scalars['Int']>;
  gitPOAPRequestId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  poapEventId?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  teamId?: Maybe<Scalars['Int']>;
  threshold?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type GitPoapSumOrderByAggregateInput = {
  creatorAddressId?: InputMaybe<SortOrder>;
  creatorEmailId?: InputMaybe<SortOrder>;
  eventId?: InputMaybe<SortOrder>;
  gitPOAPRequestId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  level?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  threshold?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export enum GitPoapType {
  Annual = 'ANNUAL',
  Custom = 'CUSTOM',
}

export type GitPoapWhereInput = {
  AND?: InputMaybe<Array<GitPoapWhereInput>>;
  NOT?: InputMaybe<Array<GitPoapWhereInput>>;
  OR?: InputMaybe<Array<GitPoapWhereInput>>;
  canRequestMoreCodes?: InputMaybe<BoolFilter>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creatorAddress?: InputMaybe<AddressRelationFilter>;
  creatorAddressId?: InputMaybe<IntNullableFilter>;
  creatorEmail?: InputMaybe<EmailRelationFilter>;
  creatorEmailId?: InputMaybe<IntNullableFilter>;
  description?: InputMaybe<StringFilter>;
  event?: InputMaybe<EventRelationFilter>;
  eventId?: InputMaybe<IntNullableFilter>;
  gitPOAPRequest?: InputMaybe<GitPoapRequestRelationFilter>;
  gitPOAPRequestId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  imageUrl?: InputMaybe<StringFilter>;
  isEnabled?: InputMaybe<BoolFilter>;
  isPRBased?: InputMaybe<BoolFilter>;
  level?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  poapApprovalStatus?: InputMaybe<EnumGitPoapStatusFilter>;
  poapEventId?: InputMaybe<IntFilter>;
  project?: InputMaybe<ProjectRelationFilter>;
  projectId?: InputMaybe<IntNullableFilter>;
  redeemCodes?: InputMaybe<RedeemCodeListRelationFilter>;
  team?: InputMaybe<TeamRelationFilter>;
  teamId?: InputMaybe<IntNullableFilter>;
  threshold?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumGitPoapTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  year?: InputMaybe<IntFilter>;
};

export type GitPoapWhereUniqueInput = {
  gitPOAPRequestId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  poapEventId?: InputMaybe<Scalars['Int']>;
};

export type GitPoapWithClaimsCount = {
  __typename?: 'GitPOAPWithClaimsCount';
  claimsCount: Scalars['Float'];
  event: PoapEvent;
  gitPOAP: GitPoap;
};

export type GithubIssue = {
  __typename?: 'GithubIssue';
  _count?: Maybe<GithubIssueCount>;
  createdAt: Scalars['DateTime'];
  githubClosedAt?: Maybe<Scalars['DateTime']>;
  githubCreatedAt: Scalars['DateTime'];
  githubIssueNumber: Scalars['Int'];
  githubTitle: Scalars['String'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  repoId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type GithubIssueAvgAggregate = {
  __typename?: 'GithubIssueAvgAggregate';
  githubIssueNumber?: Maybe<Scalars['Float']>;
  githubUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  repoId?: Maybe<Scalars['Float']>;
};

export type GithubIssueAvgOrderByAggregateInput = {
  githubIssueNumber?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
};

export type GithubIssueCount = {
  __typename?: 'GithubIssueCount';
  githubMentions: Scalars['Int'];
};

export type GithubIssueCountAggregate = {
  __typename?: 'GithubIssueCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubClosedAt: Scalars['Int'];
  githubCreatedAt: Scalars['Int'];
  githubIssueNumber: Scalars['Int'];
  githubTitle: Scalars['Int'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  repoId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type GithubIssueCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubClosedAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubIssueNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubIssueGroupBy = {
  __typename?: 'GithubIssueGroupBy';
  _avg?: Maybe<GithubIssueAvgAggregate>;
  _count?: Maybe<GithubIssueCountAggregate>;
  _max?: Maybe<GithubIssueMaxAggregate>;
  _min?: Maybe<GithubIssueMinAggregate>;
  _sum?: Maybe<GithubIssueSumAggregate>;
  createdAt: Scalars['DateTime'];
  githubClosedAt?: Maybe<Scalars['DateTime']>;
  githubCreatedAt: Scalars['DateTime'];
  githubIssueNumber: Scalars['Int'];
  githubTitle: Scalars['String'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  repoId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type GithubIssueListRelationFilter = {
  every?: InputMaybe<GithubIssueWhereInput>;
  none?: InputMaybe<GithubIssueWhereInput>;
  some?: InputMaybe<GithubIssueWhereInput>;
};

export type GithubIssueMaxAggregate = {
  __typename?: 'GithubIssueMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubClosedAt?: Maybe<Scalars['DateTime']>;
  githubCreatedAt?: Maybe<Scalars['DateTime']>;
  githubIssueNumber?: Maybe<Scalars['Int']>;
  githubTitle?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubIssueMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubClosedAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubIssueNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubIssueMinAggregate = {
  __typename?: 'GithubIssueMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubClosedAt?: Maybe<Scalars['DateTime']>;
  githubCreatedAt?: Maybe<Scalars['DateTime']>;
  githubIssueNumber?: Maybe<Scalars['Int']>;
  githubTitle?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubIssueMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubClosedAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubIssueNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubIssueOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GithubIssueOrderByWithAggregationInput = {
  _avg?: InputMaybe<GithubIssueAvgOrderByAggregateInput>;
  _count?: InputMaybe<GithubIssueCountOrderByAggregateInput>;
  _max?: InputMaybe<GithubIssueMaxOrderByAggregateInput>;
  _min?: InputMaybe<GithubIssueMinOrderByAggregateInput>;
  _sum?: InputMaybe<GithubIssueSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubClosedAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubIssueNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubIssueOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubClosedAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubIssueNumber?: InputMaybe<SortOrder>;
  githubMentions?: InputMaybe<GithubMentionOrderByRelationAggregateInput>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUser?: InputMaybe<GithubUserOrderByWithRelationInput>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repo?: InputMaybe<RepoOrderByWithRelationInput>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubIssueRelationFilter = {
  is?: InputMaybe<GithubIssueWhereInput>;
  isNot?: InputMaybe<GithubIssueWhereInput>;
};

export type GithubIssueRepoIdGithubIssueNumberCompoundUniqueInput = {
  githubIssueNumber: Scalars['Int'];
  repoId: Scalars['Int'];
};

export enum GithubIssueScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubClosedAt = 'githubClosedAt',
  GithubCreatedAt = 'githubCreatedAt',
  GithubIssueNumber = 'githubIssueNumber',
  GithubTitle = 'githubTitle',
  GithubUserId = 'githubUserId',
  Id = 'id',
  RepoId = 'repoId',
  UpdatedAt = 'updatedAt',
}

export type GithubIssueScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GithubIssueScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GithubIssueScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GithubIssueScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubClosedAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  githubCreatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubIssueNumber?: InputMaybe<IntWithAggregatesFilter>;
  githubTitle?: InputMaybe<StringWithAggregatesFilter>;
  githubUserId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  repoId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GithubIssueSumAggregate = {
  __typename?: 'GithubIssueSumAggregate';
  githubIssueNumber?: Maybe<Scalars['Int']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
};

export type GithubIssueSumOrderByAggregateInput = {
  githubIssueNumber?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
};

export type GithubIssueWhereInput = {
  AND?: InputMaybe<Array<GithubIssueWhereInput>>;
  NOT?: InputMaybe<Array<GithubIssueWhereInput>>;
  OR?: InputMaybe<Array<GithubIssueWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubClosedAt?: InputMaybe<DateTimeNullableFilter>;
  githubCreatedAt?: InputMaybe<DateTimeFilter>;
  githubIssueNumber?: InputMaybe<IntFilter>;
  githubMentions?: InputMaybe<GithubMentionListRelationFilter>;
  githubTitle?: InputMaybe<StringFilter>;
  githubUser?: InputMaybe<GithubUserRelationFilter>;
  githubUserId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  repo?: InputMaybe<RepoRelationFilter>;
  repoId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GithubIssueWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  repoId_githubIssueNumber?: InputMaybe<GithubIssueRepoIdGithubIssueNumberCompoundUniqueInput>;
};

export type GithubMention = {
  __typename?: 'GithubMention';
  _count?: Maybe<GithubMentionCount>;
  createdAt: Scalars['DateTime'];
  githubMentionedAt: Scalars['DateTime'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  issueId?: Maybe<Scalars['Int']>;
  pullRequestId?: Maybe<Scalars['Int']>;
  repoId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type GithubMentionAvgAggregate = {
  __typename?: 'GithubMentionAvgAggregate';
  githubUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  issueId?: Maybe<Scalars['Float']>;
  pullRequestId?: Maybe<Scalars['Float']>;
  repoId?: Maybe<Scalars['Float']>;
};

export type GithubMentionAvgOrderByAggregateInput = {
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issueId?: InputMaybe<SortOrder>;
  pullRequestId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
};

export type GithubMentionCount = {
  __typename?: 'GithubMentionCount';
  claims: Scalars['Int'];
};

export type GithubMentionCountAggregate = {
  __typename?: 'GithubMentionCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubMentionedAt: Scalars['Int'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  issueId: Scalars['Int'];
  pullRequestId: Scalars['Int'];
  repoId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type GithubMentionCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubMentionedAt?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issueId?: InputMaybe<SortOrder>;
  pullRequestId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubMentionGroupBy = {
  __typename?: 'GithubMentionGroupBy';
  _avg?: Maybe<GithubMentionAvgAggregate>;
  _count?: Maybe<GithubMentionCountAggregate>;
  _max?: Maybe<GithubMentionMaxAggregate>;
  _min?: Maybe<GithubMentionMinAggregate>;
  _sum?: Maybe<GithubMentionSumAggregate>;
  createdAt: Scalars['DateTime'];
  githubMentionedAt: Scalars['DateTime'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  issueId?: Maybe<Scalars['Int']>;
  pullRequestId?: Maybe<Scalars['Int']>;
  repoId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type GithubMentionListRelationFilter = {
  every?: InputMaybe<GithubMentionWhereInput>;
  none?: InputMaybe<GithubMentionWhereInput>;
  some?: InputMaybe<GithubMentionWhereInput>;
};

export type GithubMentionMaxAggregate = {
  __typename?: 'GithubMentionMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubMentionedAt?: Maybe<Scalars['DateTime']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  issueId?: Maybe<Scalars['Int']>;
  pullRequestId?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubMentionMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubMentionedAt?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issueId?: InputMaybe<SortOrder>;
  pullRequestId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubMentionMinAggregate = {
  __typename?: 'GithubMentionMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubMentionedAt?: Maybe<Scalars['DateTime']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  issueId?: Maybe<Scalars['Int']>;
  pullRequestId?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubMentionMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubMentionedAt?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issueId?: InputMaybe<SortOrder>;
  pullRequestId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubMentionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GithubMentionOrderByWithAggregationInput = {
  _avg?: InputMaybe<GithubMentionAvgOrderByAggregateInput>;
  _count?: InputMaybe<GithubMentionCountOrderByAggregateInput>;
  _max?: InputMaybe<GithubMentionMaxOrderByAggregateInput>;
  _min?: InputMaybe<GithubMentionMinOrderByAggregateInput>;
  _sum?: InputMaybe<GithubMentionSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubMentionedAt?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issueId?: InputMaybe<SortOrder>;
  pullRequestId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubMentionOrderByWithRelationInput = {
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubMentionedAt?: InputMaybe<SortOrder>;
  githubUser?: InputMaybe<GithubUserOrderByWithRelationInput>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issue?: InputMaybe<GithubIssueOrderByWithRelationInput>;
  issueId?: InputMaybe<SortOrder>;
  pullRequest?: InputMaybe<GithubPullRequestOrderByWithRelationInput>;
  pullRequestId?: InputMaybe<SortOrder>;
  repo?: InputMaybe<RepoOrderByWithRelationInput>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubMentionRelationFilter = {
  is?: InputMaybe<GithubMentionWhereInput>;
  isNot?: InputMaybe<GithubMentionWhereInput>;
};

export type GithubMentionRepoIdGithubUserIdIssueIdCompoundUniqueInput = {
  githubUserId: Scalars['Int'];
  issueId: Scalars['Int'];
  repoId: Scalars['Int'];
};

export type GithubMentionRepoIdGithubUserIdPullRequestIdCompoundUniqueInput = {
  githubUserId: Scalars['Int'];
  pullRequestId: Scalars['Int'];
  repoId: Scalars['Int'];
};

export enum GithubMentionScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubMentionedAt = 'githubMentionedAt',
  GithubUserId = 'githubUserId',
  Id = 'id',
  IssueId = 'issueId',
  PullRequestId = 'pullRequestId',
  RepoId = 'repoId',
  UpdatedAt = 'updatedAt',
}

export type GithubMentionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GithubMentionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GithubMentionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GithubMentionScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubMentionedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubUserId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  issueId?: InputMaybe<IntNullableWithAggregatesFilter>;
  pullRequestId?: InputMaybe<IntNullableWithAggregatesFilter>;
  repoId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GithubMentionSumAggregate = {
  __typename?: 'GithubMentionSumAggregate';
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  issueId?: Maybe<Scalars['Int']>;
  pullRequestId?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
};

export type GithubMentionSumOrderByAggregateInput = {
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issueId?: InputMaybe<SortOrder>;
  pullRequestId?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
};

export type GithubMentionWhereInput = {
  AND?: InputMaybe<Array<GithubMentionWhereInput>>;
  NOT?: InputMaybe<Array<GithubMentionWhereInput>>;
  OR?: InputMaybe<Array<GithubMentionWhereInput>>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubMentionedAt?: InputMaybe<DateTimeFilter>;
  githubUser?: InputMaybe<GithubUserRelationFilter>;
  githubUserId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  issue?: InputMaybe<GithubIssueRelationFilter>;
  issueId?: InputMaybe<IntNullableFilter>;
  pullRequest?: InputMaybe<GithubPullRequestRelationFilter>;
  pullRequestId?: InputMaybe<IntNullableFilter>;
  repo?: InputMaybe<RepoRelationFilter>;
  repoId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GithubMentionWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  repoId_githubUserId_issueId?: InputMaybe<GithubMentionRepoIdGithubUserIdIssueIdCompoundUniqueInput>;
  repoId_githubUserId_pullRequestId?: InputMaybe<GithubMentionRepoIdGithubUserIdPullRequestIdCompoundUniqueInput>;
};

export type GithubOrganization = {
  __typename?: 'GithubOrganization';
  _count?: Maybe<GithubOrganizationCount>;
  createdAt: Scalars['DateTime'];
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  repos: Array<Repo>;
  updatedAt: Scalars['DateTime'];
};

export type GithubOrganizationReposArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type GithubOrganizationAvgAggregate = {
  __typename?: 'GithubOrganizationAvgAggregate';
  githubOrgId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type GithubOrganizationAvgOrderByAggregateInput = {
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type GithubOrganizationCount = {
  __typename?: 'GithubOrganizationCount';
  repos: Scalars['Int'];
};

export type GithubOrganizationCountAggregate = {
  __typename?: 'GithubOrganizationCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type GithubOrganizationCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubOrganizationGroupBy = {
  __typename?: 'GithubOrganizationGroupBy';
  _avg?: Maybe<GithubOrganizationAvgAggregate>;
  _count?: Maybe<GithubOrganizationCountAggregate>;
  _max?: Maybe<GithubOrganizationMaxAggregate>;
  _min?: Maybe<GithubOrganizationMinAggregate>;
  _sum?: Maybe<GithubOrganizationSumAggregate>;
  createdAt: Scalars['DateTime'];
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GithubOrganizationMaxAggregate = {
  __typename?: 'GithubOrganizationMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubOrgId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubOrganizationMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubOrganizationMinAggregate = {
  __typename?: 'GithubOrganizationMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubOrgId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubOrganizationMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubOrganizationOrderByWithAggregationInput = {
  _avg?: InputMaybe<GithubOrganizationAvgOrderByAggregateInput>;
  _count?: InputMaybe<GithubOrganizationCountOrderByAggregateInput>;
  _max?: InputMaybe<GithubOrganizationMaxOrderByAggregateInput>;
  _min?: InputMaybe<GithubOrganizationMinOrderByAggregateInput>;
  _sum?: InputMaybe<GithubOrganizationSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubOrganizationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  repos?: InputMaybe<RepoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubOrganizationRelationFilter = {
  is?: InputMaybe<GithubOrganizationWhereInput>;
  isNot?: InputMaybe<GithubOrganizationWhereInput>;
};

export enum GithubOrganizationScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubOrgId = 'githubOrgId',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt',
}

export type GithubOrganizationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GithubOrganizationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GithubOrganizationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GithubOrganizationScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubOrgId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GithubOrganizationSumAggregate = {
  __typename?: 'GithubOrganizationSumAggregate';
  githubOrgId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type GithubOrganizationSumOrderByAggregateInput = {
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type GithubOrganizationWhereInput = {
  AND?: InputMaybe<Array<GithubOrganizationWhereInput>>;
  NOT?: InputMaybe<Array<GithubOrganizationWhereInput>>;
  OR?: InputMaybe<Array<GithubOrganizationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubOrgId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  repos?: InputMaybe<RepoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GithubOrganizationWhereUniqueInput = {
  githubOrgId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type GithubPullRequest = {
  __typename?: 'GithubPullRequest';
  _count?: Maybe<GithubPullRequestCount>;
  claims: Array<Claim>;
  createdAt: Scalars['DateTime'];
  githubCreatedAt: Scalars['DateTime'];
  githubMentions: Array<GithubMention>;
  githubMergeCommitSha?: Maybe<Scalars['String']>;
  githubMergedAt?: Maybe<Scalars['DateTime']>;
  githubPullNumber: Scalars['Int'];
  githubTitle: Scalars['String'];
  githubUser: GithubUser;
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  repo: Repo;
  repoId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type GithubPullRequestClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type GithubPullRequestGithubMentionsArgs = {
  cursor?: InputMaybe<GithubMentionWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubMentionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubMentionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubMentionWhereInput>;
};

export type GithubPullRequestAvgAggregate = {
  __typename?: 'GithubPullRequestAvgAggregate';
  githubPullNumber?: Maybe<Scalars['Float']>;
  githubUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  repoId?: Maybe<Scalars['Float']>;
};

export type GithubPullRequestAvgOrderByAggregateInput = {
  githubPullNumber?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestCount = {
  __typename?: 'GithubPullRequestCount';
  claims: Scalars['Int'];
  githubMentions: Scalars['Int'];
};

export type GithubPullRequestCountAggregate = {
  __typename?: 'GithubPullRequestCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubCreatedAt: Scalars['Int'];
  githubMergeCommitSha: Scalars['Int'];
  githubMergedAt: Scalars['Int'];
  githubPullNumber: Scalars['Int'];
  githubTitle: Scalars['Int'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  repoId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type GithubPullRequestCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubPullRequestGroupBy = {
  __typename?: 'GithubPullRequestGroupBy';
  _avg?: Maybe<GithubPullRequestAvgAggregate>;
  _count?: Maybe<GithubPullRequestCountAggregate>;
  _max?: Maybe<GithubPullRequestMaxAggregate>;
  _min?: Maybe<GithubPullRequestMinAggregate>;
  _sum?: Maybe<GithubPullRequestSumAggregate>;
  createdAt: Scalars['DateTime'];
  githubCreatedAt: Scalars['DateTime'];
  githubMergeCommitSha?: Maybe<Scalars['String']>;
  githubMergedAt?: Maybe<Scalars['DateTime']>;
  githubPullNumber: Scalars['Int'];
  githubTitle: Scalars['String'];
  githubUserId: Scalars['Int'];
  id: Scalars['Int'];
  repoId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type GithubPullRequestListRelationFilter = {
  every?: InputMaybe<GithubPullRequestWhereInput>;
  none?: InputMaybe<GithubPullRequestWhereInput>;
  some?: InputMaybe<GithubPullRequestWhereInput>;
};

export type GithubPullRequestMaxAggregate = {
  __typename?: 'GithubPullRequestMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubCreatedAt?: Maybe<Scalars['DateTime']>;
  githubMergeCommitSha?: Maybe<Scalars['String']>;
  githubMergedAt?: Maybe<Scalars['DateTime']>;
  githubPullNumber?: Maybe<Scalars['Int']>;
  githubTitle?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubPullRequestMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubPullRequestMinAggregate = {
  __typename?: 'GithubPullRequestMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubCreatedAt?: Maybe<Scalars['DateTime']>;
  githubMergeCommitSha?: Maybe<Scalars['String']>;
  githubMergedAt?: Maybe<Scalars['DateTime']>;
  githubPullNumber?: Maybe<Scalars['Int']>;
  githubTitle?: Maybe<Scalars['String']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubPullRequestMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubPullRequestOrderByWithRelationInput = {
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubCreatedAt?: InputMaybe<SortOrder>;
  githubMentions?: InputMaybe<GithubMentionOrderByRelationAggregateInput>;
  githubMergeCommitSha?: InputMaybe<SortOrder>;
  githubMergedAt?: InputMaybe<SortOrder>;
  githubPullNumber?: InputMaybe<SortOrder>;
  githubTitle?: InputMaybe<SortOrder>;
  githubUser?: InputMaybe<GithubUserOrderByWithRelationInput>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repo?: InputMaybe<RepoOrderByWithRelationInput>;
  repoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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
  GithubCreatedAt = 'githubCreatedAt',
  GithubMergeCommitSha = 'githubMergeCommitSha',
  GithubMergedAt = 'githubMergedAt',
  GithubPullNumber = 'githubPullNumber',
  GithubTitle = 'githubTitle',
  GithubUserId = 'githubUserId',
  Id = 'id',
  RepoId = 'repoId',
  UpdatedAt = 'updatedAt',
}

export type GithubPullRequestScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GithubPullRequestScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GithubPullRequestScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GithubPullRequestScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubCreatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubMergeCommitSha?: InputMaybe<StringNullableWithAggregatesFilter>;
  githubMergedAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  githubPullNumber?: InputMaybe<IntWithAggregatesFilter>;
  githubTitle?: InputMaybe<StringWithAggregatesFilter>;
  githubUserId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  repoId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GithubPullRequestSumAggregate = {
  __typename?: 'GithubPullRequestSumAggregate';
  githubPullNumber?: Maybe<Scalars['Int']>;
  githubUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  repoId?: Maybe<Scalars['Int']>;
};

export type GithubPullRequestSumOrderByAggregateInput = {
  githubPullNumber?: InputMaybe<SortOrder>;
  githubUserId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  repoId?: InputMaybe<SortOrder>;
};

export type GithubPullRequestWhereInput = {
  AND?: InputMaybe<Array<GithubPullRequestWhereInput>>;
  NOT?: InputMaybe<Array<GithubPullRequestWhereInput>>;
  OR?: InputMaybe<Array<GithubPullRequestWhereInput>>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubCreatedAt?: InputMaybe<DateTimeFilter>;
  githubMentions?: InputMaybe<GithubMentionListRelationFilter>;
  githubMergeCommitSha?: InputMaybe<StringNullableFilter>;
  githubMergedAt?: InputMaybe<DateTimeNullableFilter>;
  githubPullNumber?: InputMaybe<IntFilter>;
  githubTitle?: InputMaybe<StringFilter>;
  githubUser?: InputMaybe<GithubUserRelationFilter>;
  githubUserId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  repo?: InputMaybe<RepoRelationFilter>;
  repoId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GithubPullRequestWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  repoId_githubPullNumber?: InputMaybe<GithubPullRequestRepoIdGithubPullNumberCompoundUniqueInput>;
};

export type GithubUser = {
  __typename?: 'GithubUser';
  _count?: Maybe<GithubUserCount>;
  addresses: Array<Address>;
  claims: Array<Claim>;
  createdAt: Scalars['DateTime'];
  githubHandle: Scalars['String'];
  githubId: Scalars['Int'];
  githubIssues: Array<GithubIssue>;
  githubMentions: Array<GithubMention>;
  githubPullRequests: Array<GithubPullRequest>;
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type GithubUserAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};

export type GithubUserClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type GithubUserGithubIssuesArgs = {
  cursor?: InputMaybe<GithubIssueWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubIssueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubIssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubIssueWhereInput>;
};

export type GithubUserGithubMentionsArgs = {
  cursor?: InputMaybe<GithubMentionWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubMentionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubMentionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubMentionWhereInput>;
};

export type GithubUserGithubPullRequestsArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type GithubUserAvgAggregate = {
  __typename?: 'GithubUserAvgAggregate';
  githubId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type GithubUserAvgOrderByAggregateInput = {
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type GithubUserCount = {
  __typename?: 'GithubUserCount';
  addresses: Scalars['Int'];
  claims: Scalars['Int'];
  githubIssues: Scalars['Int'];
  githubMentions: Scalars['Int'];
  githubPullRequests: Scalars['Int'];
};

export type GithubUserCountAggregate = {
  __typename?: 'GithubUserCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  githubHandle: Scalars['Int'];
  githubId: Scalars['Int'];
  githubOAuthToken: Scalars['Int'];
  id: Scalars['Int'];
  privyUserId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type GithubUserCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubUserGroupBy = {
  __typename?: 'GithubUserGroupBy';
  _avg?: Maybe<GithubUserAvgAggregate>;
  _count?: Maybe<GithubUserCountAggregate>;
  _max?: Maybe<GithubUserMaxAggregate>;
  _min?: Maybe<GithubUserMinAggregate>;
  _sum?: Maybe<GithubUserSumAggregate>;
  createdAt: Scalars['DateTime'];
  githubHandle: Scalars['String'];
  githubId: Scalars['Int'];
  githubOAuthToken?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  privyUserId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type GithubUserMaxAggregate = {
  __typename?: 'GithubUserMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubHandle?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['Int']>;
  githubOAuthToken?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  privyUserId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubUserMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubUserMinAggregate = {
  __typename?: 'GithubUserMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  githubHandle?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['Int']>;
  githubOAuthToken?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  privyUserId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GithubUserMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubUserOrderByWithAggregationInput = {
  _avg?: InputMaybe<GithubUserAvgOrderByAggregateInput>;
  _count?: InputMaybe<GithubUserCountOrderByAggregateInput>;
  _max?: InputMaybe<GithubUserMaxOrderByAggregateInput>;
  _min?: InputMaybe<GithubUserMinOrderByAggregateInput>;
  _sum?: InputMaybe<GithubUserSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubUserOrderByWithRelationInput = {
  addresses?: InputMaybe<AddressOrderByRelationAggregateInput>;
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  githubIssues?: InputMaybe<GithubIssueOrderByRelationAggregateInput>;
  githubMentions?: InputMaybe<GithubMentionOrderByRelationAggregateInput>;
  githubPullRequests?: InputMaybe<GithubPullRequestOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GithubUserRelationFilter = {
  is?: InputMaybe<GithubUserWhereInput>;
  isNot?: InputMaybe<GithubUserWhereInput>;
};

export enum GithubUserScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubHandle = 'githubHandle',
  GithubId = 'githubId',
  GithubOAuthToken = 'githubOAuthToken',
  Id = 'id',
  PrivyUserId = 'privyUserId',
  UpdatedAt = 'updatedAt',
}

export type GithubUserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GithubUserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GithubUserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GithubUserScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  githubHandle?: InputMaybe<StringWithAggregatesFilter>;
  githubId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GithubUserSumAggregate = {
  __typename?: 'GithubUserSumAggregate';
  githubId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type GithubUserSumOrderByAggregateInput = {
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type GithubUserWhereInput = {
  AND?: InputMaybe<Array<GithubUserWhereInput>>;
  NOT?: InputMaybe<Array<GithubUserWhereInput>>;
  OR?: InputMaybe<Array<GithubUserWhereInput>>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubHandle?: InputMaybe<StringFilter>;
  githubId?: InputMaybe<IntFilter>;
  githubIssues?: InputMaybe<GithubIssueListRelationFilter>;
  githubMentions?: InputMaybe<GithubMentionListRelationFilter>;
  githubPullRequests?: InputMaybe<GithubPullRequestListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GithubUserWhereUniqueInput = {
  githubId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type Holder = {
  __typename?: 'Holder';
  address: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  ensAvatarImageUrl?: Maybe<Scalars['String']>;
  ensName?: Maybe<Scalars['String']>;
  gitPOAPCount: Scalars['Float'];
  githubHandle?: Maybe<Scalars['String']>;
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

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type JsonWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedJsonFilter>;
  _min?: InputMaybe<NestedJsonFilter>;
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type Membership = {
  __typename?: 'Membership';
  acceptanceStatus: MembershipAcceptanceStatus;
  addressId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  joinedOn?: Maybe<Scalars['DateTime']>;
  role: MembershipRole;
  teamId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export enum MembershipAcceptanceStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
}

export type MembershipAvgAggregate = {
  __typename?: 'MembershipAvgAggregate';
  addressId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  teamId?: Maybe<Scalars['Float']>;
};

export type MembershipAvgOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
};

export type MembershipCountAggregate = {
  __typename?: 'MembershipCountAggregate';
  _all: Scalars['Int'];
  acceptanceStatus: Scalars['Int'];
  addressId: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  joinedOn: Scalars['Int'];
  role: Scalars['Int'];
  teamId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type MembershipCountOrderByAggregateInput = {
  acceptanceStatus?: InputMaybe<SortOrder>;
  addressId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joinedOn?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type MembershipGroupBy = {
  __typename?: 'MembershipGroupBy';
  _avg?: Maybe<MembershipAvgAggregate>;
  _count?: Maybe<MembershipCountAggregate>;
  _max?: Maybe<MembershipMaxAggregate>;
  _min?: Maybe<MembershipMinAggregate>;
  _sum?: Maybe<MembershipSumAggregate>;
  acceptanceStatus: MembershipAcceptanceStatus;
  addressId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  joinedOn?: Maybe<Scalars['DateTime']>;
  role: MembershipRole;
  teamId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type MembershipListRelationFilter = {
  every?: InputMaybe<MembershipWhereInput>;
  none?: InputMaybe<MembershipWhereInput>;
  some?: InputMaybe<MembershipWhereInput>;
};

export type MembershipMaxAggregate = {
  __typename?: 'MembershipMaxAggregate';
  acceptanceStatus?: Maybe<MembershipAcceptanceStatus>;
  addressId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  joinedOn?: Maybe<Scalars['DateTime']>;
  role?: Maybe<MembershipRole>;
  teamId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MembershipMaxOrderByAggregateInput = {
  acceptanceStatus?: InputMaybe<SortOrder>;
  addressId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joinedOn?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type MembershipMinAggregate = {
  __typename?: 'MembershipMinAggregate';
  acceptanceStatus?: Maybe<MembershipAcceptanceStatus>;
  addressId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  joinedOn?: Maybe<Scalars['DateTime']>;
  role?: Maybe<MembershipRole>;
  teamId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MembershipMinOrderByAggregateInput = {
  acceptanceStatus?: InputMaybe<SortOrder>;
  addressId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joinedOn?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type MembershipMutationPayload = {
  __typename?: 'MembershipMutationPayload';
  membership?: Maybe<MembershipWithTeam>;
};

export type MembershipOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MembershipOrderByWithAggregationInput = {
  _avg?: InputMaybe<MembershipAvgOrderByAggregateInput>;
  _count?: InputMaybe<MembershipCountOrderByAggregateInput>;
  _max?: InputMaybe<MembershipMaxOrderByAggregateInput>;
  _min?: InputMaybe<MembershipMinOrderByAggregateInput>;
  _sum?: InputMaybe<MembershipSumOrderByAggregateInput>;
  acceptanceStatus?: InputMaybe<SortOrder>;
  addressId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joinedOn?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type MembershipOrderByWithRelationInput = {
  acceptanceStatus?: InputMaybe<SortOrder>;
  address?: InputMaybe<AddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joinedOn?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
  team?: InputMaybe<TeamOrderByWithRelationInput>;
  teamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum MembershipRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Owner = 'OWNER',
}

export enum MembershipScalarFieldEnum {
  AcceptanceStatus = 'acceptanceStatus',
  AddressId = 'addressId',
  CreatedAt = 'createdAt',
  Id = 'id',
  JoinedOn = 'joinedOn',
  Role = 'role',
  TeamId = 'teamId',
  UpdatedAt = 'updatedAt',
}

export type MembershipScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<MembershipScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<MembershipScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<MembershipScalarWhereWithAggregatesInput>>;
  acceptanceStatus?: InputMaybe<EnumMembershipAcceptanceStatusWithAggregatesFilter>;
  addressId?: InputMaybe<IntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  joinedOn?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  role?: InputMaybe<EnumMembershipRoleWithAggregatesFilter>;
  teamId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type MembershipSumAggregate = {
  __typename?: 'MembershipSumAggregate';
  addressId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  teamId?: Maybe<Scalars['Int']>;
};

export type MembershipSumOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  teamId?: InputMaybe<SortOrder>;
};

export type MembershipTeamIdAddressIdCompoundUniqueInput = {
  addressId: Scalars['Int'];
  teamId: Scalars['Int'];
};

export type MembershipWhereInput = {
  AND?: InputMaybe<Array<MembershipWhereInput>>;
  NOT?: InputMaybe<Array<MembershipWhereInput>>;
  OR?: InputMaybe<Array<MembershipWhereInput>>;
  acceptanceStatus?: InputMaybe<EnumMembershipAcceptanceStatusFilter>;
  address?: InputMaybe<AddressRelationFilter>;
  addressId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  joinedOn?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<EnumMembershipRoleFilter>;
  team?: InputMaybe<TeamRelationFilter>;
  teamId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MembershipWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  teamId_addressId?: InputMaybe<MembershipTeamIdAddressIdCompoundUniqueInput>;
};

export type MembershipWithTeam = {
  __typename?: 'MembershipWithTeam';
  acceptanceStatus: MembershipAcceptanceStatus;
  address: Address;
  addressId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  joinedOn?: Maybe<Scalars['DateTime']>;
  role: MembershipRole;
  team: Team;
  teamId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptMembership: MembershipMutationPayload;
  addNewMembership: MembershipMutationPayload;
  removeMembership: MembershipMutationPayload;
  updateTeam: TeamUpdatePayload;
};

export type MutationAcceptMembershipArgs = {
  teamId: Scalars['Float'];
};

export type MutationAddNewMembershipArgs = {
  address: Scalars['String'];
  teamId: Scalars['Float'];
};

export type MutationRemoveMembershipArgs = {
  membershipId: Scalars['Float'];
};

export type MutationUpdateTeamArgs = {
  input: TeamUpdateInput;
  teamId: Scalars['Float'];
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

export type NestedEnumGitPoapTypeFilter = {
  equals?: InputMaybe<GitPoapType>;
  in?: InputMaybe<Array<GitPoapType>>;
  not?: InputMaybe<NestedEnumGitPoapTypeFilter>;
  notIn?: InputMaybe<Array<GitPoapType>>;
};

export type NestedEnumGitPoapTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumGitPoapTypeFilter>;
  _min?: InputMaybe<NestedEnumGitPoapTypeFilter>;
  equals?: InputMaybe<GitPoapType>;
  in?: InputMaybe<Array<GitPoapType>>;
  not?: InputMaybe<NestedEnumGitPoapTypeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<GitPoapType>>;
};

export type NestedEnumMembershipAcceptanceStatusFilter = {
  equals?: InputMaybe<MembershipAcceptanceStatus>;
  in?: InputMaybe<Array<MembershipAcceptanceStatus>>;
  not?: InputMaybe<NestedEnumMembershipAcceptanceStatusFilter>;
  notIn?: InputMaybe<Array<MembershipAcceptanceStatus>>;
};

export type NestedEnumMembershipAcceptanceStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumMembershipAcceptanceStatusFilter>;
  _min?: InputMaybe<NestedEnumMembershipAcceptanceStatusFilter>;
  equals?: InputMaybe<MembershipAcceptanceStatus>;
  in?: InputMaybe<Array<MembershipAcceptanceStatus>>;
  not?: InputMaybe<NestedEnumMembershipAcceptanceStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<MembershipAcceptanceStatus>>;
};

export type NestedEnumMembershipRoleFilter = {
  equals?: InputMaybe<MembershipRole>;
  in?: InputMaybe<Array<MembershipRole>>;
  not?: InputMaybe<NestedEnumMembershipRoleFilter>;
  notIn?: InputMaybe<Array<MembershipRole>>;
};

export type NestedEnumMembershipRoleWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumMembershipRoleFilter>;
  _min?: InputMaybe<NestedEnumMembershipRoleFilter>;
  equals?: InputMaybe<MembershipRole>;
  in?: InputMaybe<Array<MembershipRole>>;
  not?: InputMaybe<NestedEnumMembershipRoleWithAggregatesFilter>;
  notIn?: InputMaybe<Array<MembershipRole>>;
};

export type NestedEnumStaffApprovalStatusFilter = {
  equals?: InputMaybe<StaffApprovalStatus>;
  in?: InputMaybe<Array<StaffApprovalStatus>>;
  not?: InputMaybe<NestedEnumStaffApprovalStatusFilter>;
  notIn?: InputMaybe<Array<StaffApprovalStatus>>;
};

export type NestedEnumStaffApprovalStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumStaffApprovalStatusFilter>;
  _min?: InputMaybe<NestedEnumStaffApprovalStatusFilter>;
  equals?: InputMaybe<StaffApprovalStatus>;
  in?: InputMaybe<Array<StaffApprovalStatus>>;
  not?: InputMaybe<NestedEnumStaffApprovalStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<StaffApprovalStatus>>;
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

export type NestedJsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
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
  ensAvatarImageUrl?: Maybe<Scalars['String']>;
  ensName?: Maybe<Scalars['String']>;
  featuredPOAPs: Array<FeaturedPoap>;
  githubHandle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  isVisibleOnLeaderboard: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type OrganizationData = {
  __typename?: 'OrganizationData';
  _count?: Maybe<GithubOrganizationCount>;
  contributorCount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  gitPOAPCount: Scalars['Float'];
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  mintedGitPOAPCount: Scalars['Float'];
  name: Scalars['String'];
  repoCount: Scalars['Float'];
  repos: Array<Repo>;
  updatedAt: Scalars['DateTime'];
};

export type OrganizationDataReposArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
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

export type Permissions = {
  __typename?: 'Permissions';
  canCreateCGs: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
};

export type Profile = {
  __typename?: 'Profile';
  _count?: Maybe<ProfileCount>;
  address: Address;
  addressId: Scalars['Int'];
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  discordHandle?: Maybe<Scalars['String']>;
  featuredPOAPs: Array<FeaturedPoap>;
  githubHandle?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isVisibleOnLeaderboard: Scalars['Boolean'];
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
  addressId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type ProfileAvgOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type ProfileCount = {
  __typename?: 'ProfileCount';
  featuredPOAPs: Scalars['Int'];
};

export type ProfileCountAggregate = {
  __typename?: 'ProfileCountAggregate';
  _all: Scalars['Int'];
  addressId: Scalars['Int'];
  bannerImageUrl: Scalars['Int'];
  bio: Scalars['Int'];
  createdAt: Scalars['Int'];
  discordHandle: Scalars['Int'];
  githubHandle: Scalars['Int'];
  id: Scalars['Int'];
  isVisibleOnLeaderboard: Scalars['Int'];
  name: Scalars['Int'];
  personalSiteUrl: Scalars['Int'];
  profileImageUrl: Scalars['Int'];
  twitterHandle: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type ProfileCountOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isVisibleOnLeaderboard?: InputMaybe<SortOrder>;
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
  addressId: Scalars['Int'];
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  discordHandle?: Maybe<Scalars['String']>;
  githubHandle?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isVisibleOnLeaderboard: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProfileMaxAggregate = {
  __typename?: 'ProfileMaxAggregate';
  addressId?: Maybe<Scalars['Int']>;
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discordHandle?: Maybe<Scalars['String']>;
  githubHandle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  isVisibleOnLeaderboard?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProfileMaxOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isVisibleOnLeaderboard?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  personalSiteUrl?: InputMaybe<SortOrder>;
  profileImageUrl?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileMinAggregate = {
  __typename?: 'ProfileMinAggregate';
  addressId?: Maybe<Scalars['Int']>;
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discordHandle?: Maybe<Scalars['String']>;
  githubHandle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  isVisibleOnLeaderboard?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProfileMinOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isVisibleOnLeaderboard?: InputMaybe<SortOrder>;
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
  addressId?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isVisibleOnLeaderboard?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  personalSiteUrl?: InputMaybe<SortOrder>;
  profileImageUrl?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileOrderByWithRelationInput = {
  address?: InputMaybe<AddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  discordHandle?: InputMaybe<SortOrder>;
  featuredPOAPs?: InputMaybe<FeaturedPoapOrderByRelationAggregateInput>;
  githubHandle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isVisibleOnLeaderboard?: InputMaybe<SortOrder>;
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
  AddressId = 'addressId',
  BannerImageUrl = 'bannerImageUrl',
  Bio = 'bio',
  CreatedAt = 'createdAt',
  DiscordHandle = 'discordHandle',
  GithubHandle = 'githubHandle',
  Id = 'id',
  IsVisibleOnLeaderboard = 'isVisibleOnLeaderboard',
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
  addressId?: InputMaybe<IntWithAggregatesFilter>;
  bannerImageUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  bio?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  discordHandle?: InputMaybe<StringNullableWithAggregatesFilter>;
  githubHandle?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  isVisibleOnLeaderboard?: InputMaybe<BoolWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  personalSiteUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  profileImageUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  twitterHandle?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ProfileSumAggregate = {
  __typename?: 'ProfileSumAggregate';
  addressId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type ProfileSumOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  address?: InputMaybe<AddressRelationFilter>;
  addressId?: InputMaybe<IntFilter>;
  bannerImageUrl?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  discordHandle?: InputMaybe<StringNullableFilter>;
  featuredPOAPs?: InputMaybe<FeaturedPoapListRelationFilter>;
  githubHandle?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  isVisibleOnLeaderboard?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringNullableFilter>;
  personalSiteUrl?: InputMaybe<StringNullableFilter>;
  profileImageUrl?: InputMaybe<StringNullableFilter>;
  twitterHandle?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProfileWhereUniqueInput = {
  addressId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type ProfileWithClaimsCount = {
  __typename?: 'ProfileWithClaimsCount';
  claimsCount: Scalars['Float'];
  profile: Profile;
};

export type Project = {
  __typename?: 'Project';
  _count?: Maybe<ProjectCount>;
  createdAt: Scalars['DateTime'];
  gitPOAPRequests: Array<GitPoapRequest>;
  gitPOAPs: Array<GitPoap>;
  id: Scalars['Int'];
  repos: Array<Repo>;
  updatedAt: Scalars['DateTime'];
};

export type ProjectGitPoapRequestsArgs = {
  cursor?: InputMaybe<GitPoapRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapRequestWhereInput>;
};

export type ProjectGitPoaPsArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type ProjectReposArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type ProjectAvgAggregate = {
  __typename?: 'ProjectAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type ProjectAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type ProjectCount = {
  __typename?: 'ProjectCount';
  gitPOAPRequests: Scalars['Int'];
  gitPOAPs: Scalars['Int'];
  repos: Scalars['Int'];
};

export type ProjectCountAggregate = {
  __typename?: 'ProjectCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type ProjectCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProjectGroupBy = {
  __typename?: 'ProjectGroupBy';
  _avg?: Maybe<ProjectAvgAggregate>;
  _count?: Maybe<ProjectCountAggregate>;
  _max?: Maybe<ProjectMaxAggregate>;
  _min?: Maybe<ProjectMinAggregate>;
  _sum?: Maybe<ProjectSumAggregate>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectMaxAggregate = {
  __typename?: 'ProjectMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProjectMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProjectMinAggregate = {
  __typename?: 'ProjectMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProjectMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProjectOrderByWithAggregationInput = {
  _avg?: InputMaybe<ProjectAvgOrderByAggregateInput>;
  _count?: InputMaybe<ProjectCountOrderByAggregateInput>;
  _max?: InputMaybe<ProjectMaxOrderByAggregateInput>;
  _min?: InputMaybe<ProjectMinOrderByAggregateInput>;
  _sum?: InputMaybe<ProjectSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProjectOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  gitPOAPRequests?: InputMaybe<GitPoapRequestOrderByRelationAggregateInput>;
  gitPOAPs?: InputMaybe<GitPoapOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  repos?: InputMaybe<RepoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProjectRelationFilter = {
  is?: InputMaybe<ProjectWhereInput>;
  isNot?: InputMaybe<ProjectWhereInput>;
};

export enum ProjectScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt',
}

export type ProjectScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ProjectScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ProjectScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ProjectScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ProjectSumAggregate = {
  __typename?: 'ProjectSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type ProjectSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  gitPOAPRequests?: InputMaybe<GitPoapRequestListRelationFilter>;
  gitPOAPs?: InputMaybe<GitPoapListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  repos?: InputMaybe<RepoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  addresses: Array<Address>;
  aggregateAddress: AggregateAddress;
  aggregateClaim: AggregateClaim;
  aggregateDiscordUser: AggregateDiscordUser;
  aggregateEmail: AggregateEmail;
  aggregateFeaturedPOAP: AggregateFeaturedPoap;
  aggregateGitPOAP: AggregateGitPoap;
  aggregateGitPOAPRequest: AggregateGitPoapRequest;
  aggregateGithubIssue: AggregateGithubIssue;
  aggregateGithubMention: AggregateGithubMention;
  aggregateGithubOrganization: AggregateGithubOrganization;
  aggregateGithubPullRequest: AggregateGithubPullRequest;
  aggregateGithubUser: AggregateGithubUser;
  aggregateMembership: AggregateMembership;
  aggregateProfile: AggregateProfile;
  aggregateProject: AggregateProject;
  aggregateRepo: AggregateRepo;
  aggregateTeam: AggregateTeam;
  allOrganizations?: Maybe<Array<GithubOrganization>>;
  allRepos?: Maybe<Array<Repo>>;
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  discordUser?: Maybe<DiscordUser>;
  discordUsers: Array<DiscordUser>;
  featuredPOAP?: Maybe<FeaturedPoap>;
  featuredPOAPS: Array<FeaturedPoap>;
  findFirstAddress?: Maybe<Address>;
  findFirstClaim?: Maybe<Claim>;
  findFirstDiscordUser?: Maybe<DiscordUser>;
  findFirstFeaturedPOAP?: Maybe<FeaturedPoap>;
  findFirstGitPOAP?: Maybe<GitPoap>;
  findFirstGitPOAPRequest?: Maybe<GitPoapRequest>;
  findFirstGithubIssue?: Maybe<GithubIssue>;
  findFirstGithubMention?: Maybe<GithubMention>;
  findFirstGithubOrganization?: Maybe<GithubOrganization>;
  findFirstGithubPullRequest?: Maybe<GithubPullRequest>;
  findFirstGithubUser?: Maybe<GithubUser>;
  findFirstMembership?: Maybe<Membership>;
  findFirstProfile?: Maybe<Profile>;
  findFirstProject?: Maybe<Project>;
  findFirstRepo?: Maybe<Repo>;
  findFirstTeam?: Maybe<Team>;
  gitPOAP?: Maybe<GitPoap>;
  gitPOAPEvent?: Maybe<FullGitPoapEventData>;
  gitPOAPHolders?: Maybe<Holders>;
  gitPOAPRequest?: Maybe<GitPoapRequest>;
  gitPOAPRequests: Array<GitPoapRequest>;
  gitPOAPS: Array<GitPoap>;
  githubIssue?: Maybe<GithubIssue>;
  githubIssues: Array<GithubIssue>;
  githubMention?: Maybe<GithubMention>;
  githubMentions: Array<GithubMention>;
  githubOrganization?: Maybe<GithubOrganization>;
  githubOrganizations: Array<GithubOrganization>;
  githubPullRequest?: Maybe<GithubPullRequest>;
  githubPullRequests: Array<GithubPullRequest>;
  githubUser?: Maybe<GithubUser>;
  githubUsers: Array<GithubUser>;
  groupByAddress: Array<AddressGroupBy>;
  groupByClaim: Array<ClaimGroupBy>;
  groupByDiscordUser: Array<DiscordUserGroupBy>;
  groupByFeaturedPOAP: Array<FeaturedPoapGroupBy>;
  groupByGitPOAP: Array<GitPoapGroupBy>;
  groupByGitPOAPRequest: Array<GitPoapRequestGroupBy>;
  groupByGithubIssue: Array<GithubIssueGroupBy>;
  groupByGithubMention: Array<GithubMentionGroupBy>;
  groupByGithubOrganization: Array<GithubOrganizationGroupBy>;
  groupByGithubPullRequest: Array<GithubPullRequestGroupBy>;
  groupByGithubUser: Array<GithubUserGroupBy>;
  groupByMembership: Array<MembershipGroupBy>;
  groupByProfile: Array<ProfileGroupBy>;
  groupByProject: Array<ProjectGroupBy>;
  groupByRepo: Array<RepoGroupBy>;
  groupByTeam: Array<TeamGroupBy>;
  lastMonthClaims: Scalars['Float'];
  lastMonthContributors: Scalars['Float'];
  lastMonthGitPOAPs: Scalars['Float'];
  lastMonthRepos: Scalars['Float'];
  membership?: Maybe<Membership>;
  memberships: Array<Membership>;
  mostClaimedGitPOAPs?: Maybe<Array<GitPoapWithClaimsCount>>;
  mostHonoredContributors: Array<ProfileWithClaimsCount>;
  organizationData?: Maybe<OrganizationData>;
  organizationRepos?: Maybe<Array<RepoReturnData>>;
  profile?: Maybe<Profile>;
  profileData?: Maybe<NullableProfile>;
  profileFeaturedPOAPs?: Maybe<UserFeaturedPoaPs>;
  profiles: Array<Profile>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  recentlyAddedRepos: Array<Repo>;
  repo?: Maybe<Repo>;
  repoData?: Maybe<RepoReturnData>;
  repoGitPOAPs?: Maybe<RepoGitPoaPs>;
  repoMostHonoredContributors?: Maybe<Array<ProfileWithClaimsCount>>;
  repoStarCount: Scalars['Float'];
  repos: Array<Repo>;
  search: SearchResults;
  team?: Maybe<Team>;
  teamData: Team;
  teamGitPOAPRequests: Array<GitPoapRequest>;
  teamGitPOAPs: Array<GitPoap>;
  teamMemberships?: Maybe<TeamMemberships>;
  teams: Array<Team>;
  totalClaims: Scalars['Float'];
  totalContributors: Scalars['Float'];
  totalGitPOAPs: Scalars['Float'];
  totalRepos: Scalars['Float'];
  trendingRepos?: Maybe<Array<RepoReturnData>>;
  userClaims?: Maybe<Array<FullClaimData>>;
  userMemberships?: Maybe<UserMemberships>;
  userPOAPs?: Maybe<UserPoaPs>;
  userPermissions: Permissions;
};

export type QueryAddressArgs = {
  where: AddressWhereUniqueInput;
};

export type QueryAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};

export type QueryAggregateAddressArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};

export type QueryAggregateClaimArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryAggregateDiscordUserArgs = {
  cursor?: InputMaybe<DiscordUserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<DiscordUserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DiscordUserWhereInput>;
};

export type QueryAggregateEmailArgs = {
  cursor?: InputMaybe<EmailWhereUniqueInput>;
  orderBy?: InputMaybe<Array<EmailOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EmailWhereInput>;
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

export type QueryAggregateGitPoapRequestArgs = {
  cursor?: InputMaybe<GitPoapRequestWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GitPoapRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapRequestWhereInput>;
};

export type QueryAggregateGithubIssueArgs = {
  cursor?: InputMaybe<GithubIssueWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GithubIssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubIssueWhereInput>;
};

export type QueryAggregateGithubMentionArgs = {
  cursor?: InputMaybe<GithubMentionWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GithubMentionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubMentionWhereInput>;
};

export type QueryAggregateGithubOrganizationArgs = {
  cursor?: InputMaybe<GithubOrganizationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GithubOrganizationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubOrganizationWhereInput>;
};

export type QueryAggregateGithubPullRequestArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type QueryAggregateGithubUserArgs = {
  cursor?: InputMaybe<GithubUserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GithubUserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubUserWhereInput>;
};

export type QueryAggregateMembershipArgs = {
  cursor?: InputMaybe<MembershipWhereUniqueInput>;
  orderBy?: InputMaybe<Array<MembershipOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MembershipWhereInput>;
};

export type QueryAggregateProfileArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryAggregateProjectArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};

export type QueryAggregateRepoArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QueryAggregateTeamArgs = {
  cursor?: InputMaybe<TeamWhereUniqueInput>;
  orderBy?: InputMaybe<Array<TeamOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamWhereInput>;
};

export type QueryAllOrganizationsArgs = {
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  search?: InputMaybe<Scalars['String']>;
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

export type QueryDiscordUserArgs = {
  where: DiscordUserWhereUniqueInput;
};

export type QueryDiscordUsersArgs = {
  cursor?: InputMaybe<DiscordUserWhereUniqueInput>;
  distinct?: InputMaybe<Array<DiscordUserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DiscordUserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DiscordUserWhereInput>;
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

export type QueryFindFirstAddressArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};

export type QueryFindFirstClaimArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryFindFirstDiscordUserArgs = {
  cursor?: InputMaybe<DiscordUserWhereUniqueInput>;
  distinct?: InputMaybe<Array<DiscordUserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DiscordUserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DiscordUserWhereInput>;
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

export type QueryFindFirstGitPoapRequestArgs = {
  cursor?: InputMaybe<GitPoapRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapRequestWhereInput>;
};

export type QueryFindFirstGithubIssueArgs = {
  cursor?: InputMaybe<GithubIssueWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubIssueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubIssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubIssueWhereInput>;
};

export type QueryFindFirstGithubMentionArgs = {
  cursor?: InputMaybe<GithubMentionWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubMentionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubMentionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubMentionWhereInput>;
};

export type QueryFindFirstGithubOrganizationArgs = {
  cursor?: InputMaybe<GithubOrganizationWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubOrganizationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubOrganizationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubOrganizationWhereInput>;
};

export type QueryFindFirstGithubPullRequestArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type QueryFindFirstGithubUserArgs = {
  cursor?: InputMaybe<GithubUserWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubUserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubUserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubUserWhereInput>;
};

export type QueryFindFirstMembershipArgs = {
  cursor?: InputMaybe<MembershipWhereUniqueInput>;
  distinct?: InputMaybe<Array<MembershipScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MembershipOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MembershipWhereInput>;
};

export type QueryFindFirstProfileArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryFindFirstProjectArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};

export type QueryFindFirstRepoArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QueryFindFirstTeamArgs = {
  cursor?: InputMaybe<TeamWhereUniqueInput>;
  distinct?: InputMaybe<Array<TeamScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TeamOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamWhereInput>;
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

export type QueryGitPoapRequestArgs = {
  where: GitPoapRequestWhereUniqueInput;
};

export type QueryGitPoapRequestsArgs = {
  cursor?: InputMaybe<GitPoapRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapRequestWhereInput>;
};

export type QueryGitPoapsArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type QueryGithubIssueArgs = {
  where: GithubIssueWhereUniqueInput;
};

export type QueryGithubIssuesArgs = {
  cursor?: InputMaybe<GithubIssueWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubIssueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubIssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubIssueWhereInput>;
};

export type QueryGithubMentionArgs = {
  where: GithubMentionWhereUniqueInput;
};

export type QueryGithubMentionsArgs = {
  cursor?: InputMaybe<GithubMentionWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubMentionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubMentionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubMentionWhereInput>;
};

export type QueryGithubOrganizationArgs = {
  where: GithubOrganizationWhereUniqueInput;
};

export type QueryGithubOrganizationsArgs = {
  cursor?: InputMaybe<GithubOrganizationWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubOrganizationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubOrganizationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubOrganizationWhereInput>;
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

export type QueryGithubUserArgs = {
  where: GithubUserWhereUniqueInput;
};

export type QueryGithubUsersArgs = {
  cursor?: InputMaybe<GithubUserWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubUserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubUserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubUserWhereInput>;
};

export type QueryGroupByAddressArgs = {
  by: Array<AddressScalarFieldEnum>;
  having?: InputMaybe<AddressScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<AddressOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};

export type QueryGroupByClaimArgs = {
  by: Array<ClaimScalarFieldEnum>;
  having?: InputMaybe<ClaimScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryGroupByDiscordUserArgs = {
  by: Array<DiscordUserScalarFieldEnum>;
  having?: InputMaybe<DiscordUserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<DiscordUserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DiscordUserWhereInput>;
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

export type QueryGroupByGitPoapRequestArgs = {
  by: Array<GitPoapRequestScalarFieldEnum>;
  having?: InputMaybe<GitPoapRequestScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GitPoapRequestOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapRequestWhereInput>;
};

export type QueryGroupByGithubIssueArgs = {
  by: Array<GithubIssueScalarFieldEnum>;
  having?: InputMaybe<GithubIssueScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GithubIssueOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubIssueWhereInput>;
};

export type QueryGroupByGithubMentionArgs = {
  by: Array<GithubMentionScalarFieldEnum>;
  having?: InputMaybe<GithubMentionScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GithubMentionOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubMentionWhereInput>;
};

export type QueryGroupByGithubOrganizationArgs = {
  by: Array<GithubOrganizationScalarFieldEnum>;
  having?: InputMaybe<GithubOrganizationScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GithubOrganizationOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubOrganizationWhereInput>;
};

export type QueryGroupByGithubPullRequestArgs = {
  by: Array<GithubPullRequestScalarFieldEnum>;
  having?: InputMaybe<GithubPullRequestScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type QueryGroupByGithubUserArgs = {
  by: Array<GithubUserScalarFieldEnum>;
  having?: InputMaybe<GithubUserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GithubUserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubUserWhereInput>;
};

export type QueryGroupByMembershipArgs = {
  by: Array<MembershipScalarFieldEnum>;
  having?: InputMaybe<MembershipScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<MembershipOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MembershipWhereInput>;
};

export type QueryGroupByProfileArgs = {
  by: Array<ProfileScalarFieldEnum>;
  having?: InputMaybe<ProfileScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryGroupByProjectArgs = {
  by: Array<ProjectScalarFieldEnum>;
  having?: InputMaybe<ProjectScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};

export type QueryGroupByRepoArgs = {
  by: Array<RepoScalarFieldEnum>;
  having?: InputMaybe<RepoScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<RepoOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QueryGroupByTeamArgs = {
  by: Array<TeamScalarFieldEnum>;
  having?: InputMaybe<TeamScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<TeamOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamWhereInput>;
};

export type QueryMembershipArgs = {
  where: MembershipWhereUniqueInput;
};

export type QueryMembershipsArgs = {
  cursor?: InputMaybe<MembershipWhereUniqueInput>;
  distinct?: InputMaybe<Array<MembershipScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MembershipOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MembershipWhereInput>;
};

export type QueryMostClaimedGitPoaPsArgs = {
  count?: InputMaybe<Scalars['Float']>;
};

export type QueryMostHonoredContributorsArgs = {
  count?: InputMaybe<Scalars['Float']>;
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

export type QueryProjectArgs = {
  where: ProjectWhereUniqueInput;
};

export type QueryProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};

export type QueryRecentlyAddedReposArgs = {
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
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
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

export type QueryTeamArgs = {
  where: TeamWhereUniqueInput;
};

export type QueryTeamDataArgs = {
  teamId: Scalars['Float'];
};

export type QueryTeamGitPoapRequestsArgs = {
  approvalStatus?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  teamId: Scalars['Float'];
};

export type QueryTeamGitPoaPsArgs = {
  approvalStatus?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  teamId: Scalars['Float'];
};

export type QueryTeamMembershipsArgs = {
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
  teamId: Scalars['Float'];
};

export type QueryTeamsArgs = {
  cursor?: InputMaybe<TeamWhereUniqueInput>;
  distinct?: InputMaybe<Array<TeamScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TeamOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamWhereInput>;
};

export type QueryTrendingReposArgs = {
  count?: InputMaybe<Scalars['Float']>;
  numDays?: InputMaybe<Scalars['Float']>;
};

export type QueryUserPoaPsArgs = {
  address: Scalars['String'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
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

export type RedeemCodeGitPoapIdCodeCompoundUniqueInput = {
  code: Scalars['String'];
  gitPOAPId: Scalars['Int'];
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
  gitPOAPId_code?: InputMaybe<RedeemCodeGitPoapIdCodeCompoundUniqueInput>;
  id?: InputMaybe<Scalars['Int']>;
};

export type Repo = {
  __typename?: 'Repo';
  _count?: Maybe<RepoCount>;
  createdAt: Scalars['DateTime'];
  githubIssues: Array<GithubIssue>;
  githubMentions: Array<GithubMention>;
  githubPullRequests: Array<GithubPullRequest>;
  githubRepoId: Scalars['Int'];
  id: Scalars['Int'];
  lastPRUpdatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  organization: GithubOrganization;
  organizationId: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type RepoGithubIssuesArgs = {
  cursor?: InputMaybe<GithubIssueWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubIssueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubIssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubIssueWhereInput>;
};

export type RepoGithubMentionsArgs = {
  cursor?: InputMaybe<GithubMentionWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubMentionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubMentionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubMentionWhereInput>;
};

export type RepoGithubPullRequestsArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export type RepoAvgAggregate = {
  __typename?: 'RepoAvgAggregate';
  githubRepoId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
};

export type RepoAvgOrderByAggregateInput = {
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
};

export type RepoCount = {
  __typename?: 'RepoCount';
  githubIssues: Scalars['Int'];
  githubMentions: Scalars['Int'];
  githubPullRequests: Scalars['Int'];
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
  projectId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type RepoCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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
  projectId: Scalars['Int'];
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
  projectId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RepoMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
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
  projectId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RepoMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
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
  projectId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RepoOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  githubIssues?: InputMaybe<GithubIssueOrderByRelationAggregateInput>;
  githubMentions?: InputMaybe<GithubMentionOrderByRelationAggregateInput>;
  githubPullRequests?: InputMaybe<GithubPullRequestOrderByRelationAggregateInput>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastPRUpdatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organization?: InputMaybe<GithubOrganizationOrderByWithRelationInput>;
  organizationId?: InputMaybe<SortOrder>;
  project?: InputMaybe<ProjectOrderByWithRelationInput>;
  projectId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RepoRelationFilter = {
  is?: InputMaybe<RepoWhereInput>;
  isNot?: InputMaybe<RepoWhereInput>;
};

export type RepoReturnData = {
  __typename?: 'RepoReturnData';
  _count?: Maybe<RepoCount>;
  contributorCount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  gitPOAPCount: Scalars['Float'];
  githubIssues: Array<GithubIssue>;
  githubMentions: Array<GithubMention>;
  githubPullRequests: Array<GithubPullRequest>;
  githubRepoId: Scalars['Int'];
  id: Scalars['Int'];
  lastPRUpdatedAt: Scalars['DateTime'];
  mintedGitPOAPCount: Scalars['Float'];
  name: Scalars['String'];
  organization: GithubOrganization;
  organizationId: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type RepoReturnDataGithubIssuesArgs = {
  cursor?: InputMaybe<GithubIssueWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubIssueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubIssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubIssueWhereInput>;
};

export type RepoReturnDataGithubMentionsArgs = {
  cursor?: InputMaybe<GithubMentionWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubMentionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubMentionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubMentionWhereInput>;
};

export type RepoReturnDataGithubPullRequestsArgs = {
  cursor?: InputMaybe<GithubPullRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<GithubPullRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GithubPullRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GithubPullRequestWhereInput>;
};

export enum RepoScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubRepoId = 'githubRepoId',
  Id = 'id',
  LastPrUpdatedAt = 'lastPRUpdatedAt',
  Name = 'name',
  OrganizationId = 'organizationId',
  ProjectId = 'projectId',
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
  projectId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type RepoSumAggregate = {
  __typename?: 'RepoSumAggregate';
  githubRepoId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  organizationId?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
};

export type RepoSumOrderByAggregateInput = {
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
};

export type RepoWhereInput = {
  AND?: InputMaybe<Array<RepoWhereInput>>;
  NOT?: InputMaybe<Array<RepoWhereInput>>;
  OR?: InputMaybe<Array<RepoWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubIssues?: InputMaybe<GithubIssueListRelationFilter>;
  githubMentions?: InputMaybe<GithubMentionListRelationFilter>;
  githubPullRequests?: InputMaybe<GithubPullRequestListRelationFilter>;
  githubRepoId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  lastPRUpdatedAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  organization?: InputMaybe<GithubOrganizationRelationFilter>;
  organizationId?: InputMaybe<IntFilter>;
  project?: InputMaybe<ProjectRelationFilter>;
  projectId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RepoWhereUniqueInput = {
  githubRepoId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  githubUsers: Array<GithubUser>;
  profiles: Array<Profile>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum StaffApprovalStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

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

export type Team = {
  __typename?: 'Team';
  _count?: Maybe<TeamCount>;
  approvalStatus: StaffApprovalStatus;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logoImageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  ownerAddressId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type TeamAvgAggregate = {
  __typename?: 'TeamAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  ownerAddressId?: Maybe<Scalars['Float']>;
};

export type TeamAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  ownerAddressId?: InputMaybe<SortOrder>;
};

export type TeamCount = {
  __typename?: 'TeamCount';
  gitPOAPRequests: Scalars['Int'];
  gitPOAPs: Scalars['Int'];
  memberships: Scalars['Int'];
};

export type TeamCountAggregate = {
  __typename?: 'TeamCountAggregate';
  _all: Scalars['Int'];
  approvalStatus: Scalars['Int'];
  createdAt: Scalars['Int'];
  description: Scalars['Int'];
  id: Scalars['Int'];
  logoImageUrl: Scalars['Int'];
  name: Scalars['Int'];
  ownerAddressId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type TeamCountOrderByAggregateInput = {
  approvalStatus?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logoImageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  ownerAddressId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TeamGroupBy = {
  __typename?: 'TeamGroupBy';
  _avg?: Maybe<TeamAvgAggregate>;
  _count?: Maybe<TeamCountAggregate>;
  _max?: Maybe<TeamMaxAggregate>;
  _min?: Maybe<TeamMinAggregate>;
  _sum?: Maybe<TeamSumAggregate>;
  approvalStatus: StaffApprovalStatus;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logoImageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  ownerAddressId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type TeamListRelationFilter = {
  every?: InputMaybe<TeamWhereInput>;
  none?: InputMaybe<TeamWhereInput>;
  some?: InputMaybe<TeamWhereInput>;
};

export type TeamMaxAggregate = {
  __typename?: 'TeamMaxAggregate';
  approvalStatus?: Maybe<StaffApprovalStatus>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  logoImageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerAddressId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TeamMaxOrderByAggregateInput = {
  approvalStatus?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logoImageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  ownerAddressId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TeamMemberships = {
  __typename?: 'TeamMemberships';
  memberships: Array<MembershipWithTeam>;
  total: Scalars['Float'];
};

export type TeamMinAggregate = {
  __typename?: 'TeamMinAggregate';
  approvalStatus?: Maybe<StaffApprovalStatus>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  logoImageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerAddressId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TeamMinOrderByAggregateInput = {
  approvalStatus?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logoImageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  ownerAddressId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TeamOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TeamOrderByWithAggregationInput = {
  _avg?: InputMaybe<TeamAvgOrderByAggregateInput>;
  _count?: InputMaybe<TeamCountOrderByAggregateInput>;
  _max?: InputMaybe<TeamMaxOrderByAggregateInput>;
  _min?: InputMaybe<TeamMinOrderByAggregateInput>;
  _sum?: InputMaybe<TeamSumOrderByAggregateInput>;
  approvalStatus?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logoImageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  ownerAddressId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TeamOrderByWithRelationInput = {
  approvalStatus?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  gitPOAPRequests?: InputMaybe<GitPoapRequestOrderByRelationAggregateInput>;
  gitPOAPs?: InputMaybe<GitPoapOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  logoImageUrl?: InputMaybe<SortOrder>;
  memberships?: InputMaybe<MembershipOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  ownerAddress?: InputMaybe<AddressOrderByWithRelationInput>;
  ownerAddressId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TeamRelationFilter = {
  is?: InputMaybe<TeamWhereInput>;
  isNot?: InputMaybe<TeamWhereInput>;
};

export enum TeamScalarFieldEnum {
  ApprovalStatus = 'approvalStatus',
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  LogoImageUrl = 'logoImageUrl',
  Name = 'name',
  OwnerAddressId = 'ownerAddressId',
  UpdatedAt = 'updatedAt',
}

export type TeamScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TeamScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TeamScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TeamScalarWhereWithAggregatesInput>>;
  approvalStatus?: InputMaybe<EnumStaffApprovalStatusWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  logoImageUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  ownerAddressId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type TeamSumAggregate = {
  __typename?: 'TeamSumAggregate';
  id?: Maybe<Scalars['Int']>;
  ownerAddressId?: Maybe<Scalars['Int']>;
};

export type TeamSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  ownerAddressId?: InputMaybe<SortOrder>;
};

export type TeamUpdateInput = {
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TeamUpdatePayload = {
  __typename?: 'TeamUpdatePayload';
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TeamWhereInput = {
  AND?: InputMaybe<Array<TeamWhereInput>>;
  NOT?: InputMaybe<Array<TeamWhereInput>>;
  OR?: InputMaybe<Array<TeamWhereInput>>;
  approvalStatus?: InputMaybe<EnumStaffApprovalStatusFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  gitPOAPRequests?: InputMaybe<GitPoapRequestListRelationFilter>;
  gitPOAPs?: InputMaybe<GitPoapListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  logoImageUrl?: InputMaybe<StringNullableFilter>;
  memberships?: InputMaybe<MembershipListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  ownerAddress?: InputMaybe<AddressRelationFilter>;
  ownerAddressId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TeamWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
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
  contributionCount: Scalars['Float'];
  event: PoapEvent;
};

export type UserMemberships = {
  __typename?: 'UserMemberships';
  memberships: Array<MembershipWithTeam>;
};

export type UserPoaPs = {
  __typename?: 'UserPOAPs';
  gitPOAPs: Array<UserGitPoapData>;
  poaps: Array<PoapToken>;
  totalGitPOAPs: Scalars['Float'];
  totalPOAPs: Scalars['Float'];
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
    profile: {
      __typename?: 'Profile';
      id: number;
      address: {
        __typename?: 'Address';
        ethAddress: string;
        ensAvatarImageUrl?: string | null;
        ensName?: string | null;
      };
    };
  }>;
};

export type RepoLeadersQueryVariables = Exact<{
  repoId: Scalars['Float'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type RepoLeadersQuery = {
  __typename?: 'Query';
  repoMostHonoredContributors?: Array<{
    __typename?: 'ProfileWithClaimsCount';
    claimsCount: number;
    profile: {
      __typename?: 'Profile';
      id: number;
      address: {
        __typename?: 'Address';
        ethAddress: string;
        ensAvatarImageUrl?: string | null;
        ensName?: string | null;
      };
    };
  }> | null;
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
    poapApprovalStatus: GitPoapStatus;
    project?: {
      __typename?: 'Project';
      repos: Array<{ __typename?: 'Repo'; name: string }>;
    } | null;
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
      githubHandle?: string | null;
      gitPOAPCount: number;
      profileId: number;
      bio?: string | null;
      personalSiteUrl?: string | null;
      twitterHandle?: string | null;
      ensAvatarImageUrl?: string | null;
      ensName?: string | null;
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
      project?: {
        __typename?: 'Project';
        repos: Array<{
          __typename?: 'Repo';
          id: number;
          name: string;
          organization: { __typename?: 'GithubOrganization'; name: string };
        }>;
      } | null;
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
    isVisibleOnLeaderboard: boolean;
    ensAvatarImageUrl?: string | null;
  } | null;
};

export type SearchForStringQueryVariables = Exact<{
  text: Scalars['String'];
}>;

export type SearchForStringQuery = {
  __typename?: 'Query';
  search: {
    __typename?: 'SearchResults';
    profiles: Array<{
      __typename?: 'Profile';
      id: number;
      address: {
        __typename?: 'Address';
        ethAddress: string;
        ensAvatarImageUrl?: string | null;
        ensName?: string | null;
      };
    }>;
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
      contributionCount: number;
      claim: {
        __typename?: 'Claim';
        status: ClaimStatus;
        poapTokenId?: string | null;
        pullRequestEarned?: {
          __typename?: 'GithubPullRequest';
          id: number;
          repo: {
            __typename?: 'Repo';
            name: string;
            organization: { __typename?: 'GithubOrganization'; name: string };
          };
        } | null;
        gitPOAP: { __typename?: 'GitPOAP'; id: number };
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
      gitPOAP: {
        __typename?: 'GitPOAP';
        id: number;
        project?: {
          __typename?: 'Project';
          repos: Array<{ __typename?: 'Repo'; name: string }>;
        } | null;
      };
      event: { __typename?: 'POAPEvent'; name: string; image_url: string; description: string };
    }>;
  } | null;
};

export type OpenClaimsQueryVariables = Exact<{ [key: string]: never }>;

export type OpenClaimsQuery = {
  __typename?: 'Query';
  userClaims?: Array<{
    __typename?: 'FullClaimData';
    claim: {
      __typename?: 'Claim';
      id: number;
      status: ClaimStatus;
      pullRequestEarned?: {
        __typename?: 'GithubPullRequest';
        repo: {
          __typename?: 'Repo';
          name: string;
          organization: { __typename?: 'GithubOrganization'; name: string };
        };
      } | null;
      gitPOAP: { __typename?: 'GitPOAP'; id: number };
    };
    event: { __typename?: 'POAPEvent'; name: string; image_url: string; description: string };
  }> | null;
};

export type RecentReposQueryVariables = Exact<{
  count: Scalars['Float'];
}>;

export type RecentReposQuery = {
  __typename?: 'Query';
  recentlyAddedRepos: Array<{
    __typename?: 'Repo';
    id: number;
    name: string;
    createdAt: any;
    organization: { __typename?: 'GithubOrganization'; name: string };
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
      id: number;
      creatorAddress?: { __typename?: 'Address'; ethAddress: string } | null;
      project?: {
        __typename?: 'Project';
        repos: Array<{
          __typename?: 'Repo';
          id: number;
          name: string;
          organization: { __typename?: 'GithubOrganization'; id: number; name: string };
        }>;
      } | null;
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
        pullRequestEarned?: {
          __typename?: 'GithubPullRequest';
          id: number;
          repo: {
            __typename?: 'Repo';
            name: string;
            organization: { __typename?: 'GithubOrganization'; name: string };
          };
        } | null;
        gitPOAP: { __typename?: 'GitPOAP'; id: number };
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
    updatedAt: any;
    createdAt: any;
    mintedAt?: any | null;
    githubUser?: { __typename?: 'GithubUser'; id: number; githubHandle: string } | null;
    mintedAddress?: { __typename?: 'Address'; ethAddress: string } | null;
    pullRequestEarned?: {
      __typename?: 'GithubPullRequest';
      githubPullNumber: number;
      repo: {
        __typename?: 'Repo';
        id: number;
        name: string;
        organization: { __typename?: 'GithubOrganization'; id: number; name: string };
      };
    } | null;
    gitPOAP: { __typename?: 'GitPOAP'; id: number; name: string; year: number; imageUrl: string };
  }>;
};

export type EligibleClaimsQueryVariables = Exact<{
  query: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;

export type EligibleClaimsQuery = {
  __typename?: 'Query';
  claims: Array<{
    __typename?: 'Claim';
    id: number;
    issuedAddress?: { __typename?: 'Address'; ethAddress: string; ensName?: string | null } | null;
    githubUser?: { __typename?: 'GithubUser'; githubHandle: string } | null;
    gitPOAP: {
      __typename?: 'GitPOAP';
      id: number;
      name: string;
      description: string;
      imageUrl: string;
      project?: {
        __typename?: 'Project';
        repos: Array<{
          __typename?: 'Repo';
          name: string;
          organization: { __typename?: 'GithubOrganization'; name: string };
        }>;
      } | null;
    };
  }>;
};

export type RepoDataQueryVariables = Exact<{
  repoId: Scalars['Float'];
}>;

export type RepoDataQuery = {
  __typename?: 'Query';
  repoStarCount: number;
  repoData?: {
    __typename?: 'RepoReturnData';
    id: number;
    name: string;
    githubRepoId: number;
    contributorCount: number;
    mintedGitPOAPCount: number;
    gitPOAPCount: number;
    organization: { __typename?: 'GithubOrganization'; id: number; name: string };
    project: {
      __typename?: 'Project';
      gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number; imageUrl: string; name: string }>;
    };
  } | null;
};

export type RepoSeoByIdQueryVariables = Exact<{
  repoId: Scalars['Float'];
}>;

export type RepoSeoByIdQuery = {
  __typename?: 'Query';
  repoData?: {
    __typename?: 'RepoReturnData';
    id: number;
    name: string;
    organization: { __typename?: 'GithubOrganization'; name: string };
  } | null;
};

export type RepoSeoByNameQueryVariables = Exact<{
  orgName: Scalars['String'];
  repoName: Scalars['String'];
}>;

export type RepoSeoByNameQuery = {
  __typename?: 'Query';
  repoData?: {
    __typename?: 'RepoReturnData';
    id: number;
    name: string;
    organization: { __typename?: 'GithubOrganization'; name: string };
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
    organization: { __typename?: 'GithubOrganization'; name: string };
    project: { __typename?: 'Project'; gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }> };
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
    organization: { __typename?: 'GithubOrganization'; name: string };
    project: { __typename?: 'Project'; gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }> };
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
    organization: { __typename?: 'GithubOrganization'; name: string };
    project: { __typename?: 'Project'; gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }> };
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
    contributorCount: number;
    gitPOAPCount: number;
    mintedGitPOAPCount: number;
    repoCount: number;
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
  search?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type OrganizationsListQuery = {
  __typename?: 'Query';
  allOrganizations?: Array<{
    __typename?: 'GithubOrganization';
    id: number;
    name: string;
    githubOrgId: number;
    repos: Array<{
      __typename?: 'Repo';
      id: number;
      project: { __typename?: 'Project'; gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number }> };
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
    __typename?: 'RepoReturnData';
    id: number;
    name: string;
    contributorCount: number;
    mintedGitPOAPCount: number;
    organization: { __typename?: 'GithubOrganization'; name: string };
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

export type TotalOrganizationCountQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
}>;

export type TotalOrganizationCountQuery = {
  __typename?: 'Query';
  aggregateGithubOrganization: {
    __typename?: 'AggregateGithubOrganization';
    _count?: { __typename?: 'GithubOrganizationCountAggregate'; id: number } | null;
  };
};

export type TotalGitPoapCountQueryVariables = Exact<{ [key: string]: never }>;

export type TotalGitPoapCountQuery = {
  __typename?: 'Query';
  aggregateGitPOAP: {
    __typename?: 'AggregateGitPOAP';
    _count?: { __typename?: 'GitPOAPCountAggregate'; id: number } | null;
  };
};

export type TotalAnnualGitPoapCountQueryVariables = Exact<{ [key: string]: never }>;

export type TotalAnnualGitPoapCountQuery = {
  __typename?: 'Query';
  aggregateGitPOAP: {
    __typename?: 'AggregateGitPOAP';
    _count?: { __typename?: 'GitPOAPCountAggregate'; id: number } | null;
  };
};

export type TotalCustomGitPoapCountQueryVariables = Exact<{ [key: string]: never }>;

export type TotalCustomGitPoapCountQuery = {
  __typename?: 'Query';
  aggregateGitPOAP: {
    __typename?: 'AggregateGitPOAP';
    _count?: { __typename?: 'GitPOAPCountAggregate'; id: number } | null;
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
  githubOrganizations: Array<{ __typename?: 'GithubOrganization'; id: number }>;
};

export type ClaimsCountQueryVariables = Exact<{ [key: string]: never }>;

export type ClaimsCountQuery = {
  __typename?: 'Query';
  aggregateClaim: {
    __typename?: 'AggregateClaim';
    _count?: { __typename?: 'ClaimCountAggregate'; id: number } | null;
  };
};

export type ClaimsWithGithubHandleCountQueryVariables = Exact<{ [key: string]: never }>;

export type ClaimsWithGithubHandleCountQuery = {
  __typename?: 'Query';
  aggregateClaim: {
    __typename?: 'AggregateClaim';
    _count?: { __typename?: 'ClaimCountAggregate'; id: number } | null;
  };
};

export type ClaimsWithEmailCountQueryVariables = Exact<{ [key: string]: never }>;

export type ClaimsWithEmailCountQuery = {
  __typename?: 'Query';
  aggregateClaim: {
    __typename?: 'AggregateClaim';
    _count?: { __typename?: 'ClaimCountAggregate'; id: number } | null;
  };
};

export type ClaimsWithIssuedAddressCountQueryVariables = Exact<{ [key: string]: never }>;

export type ClaimsWithIssuedAddressCountQuery = {
  __typename?: 'Query';
  aggregateClaim: {
    __typename?: 'AggregateClaim';
    _count?: { __typename?: 'ClaimCountAggregate'; id: number } | null;
  };
};

export type TotalAddressesQueryVariables = Exact<{ [key: string]: never }>;

export type TotalAddressesQuery = {
  __typename?: 'Query';
  aggregateAddress: {
    __typename?: 'AggregateAddress';
    _count?: { __typename?: 'AddressCountAggregate'; id: number } | null;
  };
};

export type TotalAddressesWithEnsNamesQueryVariables = Exact<{ [key: string]: never }>;

export type TotalAddressesWithEnsNamesQuery = {
  __typename?: 'Query';
  aggregateAddress: {
    __typename?: 'AggregateAddress';
    _count?: { __typename?: 'AddressCountAggregate'; id: number } | null;
  };
};

export type TotalAddressesWithEnsAvatarsQueryVariables = Exact<{ [key: string]: never }>;

export type TotalAddressesWithEnsAvatarsQuery = {
  __typename?: 'Query';
  aggregateAddress: {
    __typename?: 'AggregateAddress';
    _count?: { __typename?: 'AddressCountAggregate'; id: number } | null;
  };
};

export type TotalEmailsQueryVariables = Exact<{ [key: string]: never }>;

export type TotalEmailsQuery = {
  __typename?: 'Query';
  aggregateEmail: {
    __typename?: 'AggregateEmail';
    _count?: { __typename?: 'EmailCountAggregate'; id: number } | null;
  };
};

export type TotalEmailsValidatedQueryVariables = Exact<{ [key: string]: never }>;

export type TotalEmailsValidatedQuery = {
  __typename?: 'Query';
  aggregateEmail: {
    __typename?: 'AggregateEmail';
    _count?: { __typename?: 'EmailCountAggregate'; id: number } | null;
  };
};

export type TotalUsersQueryVariables = Exact<{ [key: string]: never }>;

export type TotalUsersQuery = {
  __typename?: 'Query';
  aggregateGithubUser: {
    __typename?: 'AggregateGithubUser';
    _count?: { __typename?: 'GithubUserCountAggregate'; githubHandle: number } | null;
  };
};

export type TotalProfilesQueryVariables = Exact<{ [key: string]: never }>;

export type TotalProfilesQuery = {
  __typename?: 'Query';
  aggregateProfile: {
    __typename?: 'AggregateProfile';
    _count?: { __typename?: 'ProfileCountAggregate'; id: number } | null;
  };
};

export type TotalProfilesWithGitHubHandleQueryVariables = Exact<{ [key: string]: never }>;

export type TotalProfilesWithGitHubHandleQuery = {
  __typename?: 'Query';
  aggregateProfile: {
    __typename?: 'AggregateProfile';
    _count?: { __typename?: 'ProfileCountAggregate'; id: number } | null;
  };
};

export type TotalProfilesHiddenQueryVariables = Exact<{ [key: string]: never }>;

export type TotalProfilesHiddenQuery = {
  __typename?: 'Query';
  aggregateProfile: {
    __typename?: 'AggregateProfile';
    _count?: { __typename?: 'ProfileCountAggregate'; id: number } | null;
  };
};

export type TotalAddressesWithClaimsQueryVariables = Exact<{ [key: string]: never }>;

export type TotalAddressesWithClaimsQuery = {
  __typename?: 'Query';
  claims: Array<{ __typename?: 'Claim'; id: number }>;
};

export type TotalDistinctUsersWithClaimsQueryVariables = Exact<{ [key: string]: never }>;

export type TotalDistinctUsersWithClaimsQuery = {
  __typename?: 'Query';
  claims: Array<{ __typename?: 'Claim'; id: number }>;
};

export type TotalEmailsWithClaimsQueryVariables = Exact<{ [key: string]: never }>;

export type TotalEmailsWithClaimsQuery = {
  __typename?: 'Query';
  claims: Array<{ __typename?: 'Claim'; id: number }>;
};

export type MintedClaimsCountQueryVariables = Exact<{ [key: string]: never }>;

export type MintedClaimsCountQuery = {
  __typename?: 'Query';
  aggregateClaim: {
    __typename?: 'AggregateClaim';
    _count?: { __typename?: 'ClaimCountAggregate'; id: number } | null;
  };
};

export type UnverifiedClaimsCountQueryVariables = Exact<{ [key: string]: never }>;

export type UnverifiedClaimsCountQuery = {
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
    organization: { __typename?: 'GithubOrganization'; name: string };
  }>;
};

export type OrgsGetStaticPathsQueryVariables = Exact<{ [key: string]: never }>;

export type OrgsGetStaticPathsQuery = {
  __typename?: 'Query';
  githubOrganizations: Array<{ __typename?: 'GithubOrganization'; id: number; name: string }>;
};

export type CountClaimsWithPullRequestEarnedQueryVariables = Exact<{ [key: string]: never }>;

export type CountClaimsWithPullRequestEarnedQuery = {
  __typename?: 'Query';
  aggregateClaim: {
    __typename?: 'AggregateClaim';
    _count?: { __typename?: 'ClaimCountAggregate'; id: number } | null;
  };
};

export type RepoSearchByNameQueryVariables = Exact<{
  search: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
}>;

export type RepoSearchByNameQuery = {
  __typename?: 'Query';
  repos: Array<{
    __typename?: 'Repo';
    id: number;
    name: string;
    githubRepoId: number;
    organization: { __typename?: 'GithubOrganization'; name: string };
    project: {
      __typename?: 'Project';
      id: number;
      gitPOAPs: Array<{
        __typename?: 'GitPOAP';
        id: number;
        name: string;
        description: string;
        imageUrl: string;
      }>;
    };
  }>;
};

export type OrgSearchByNameQueryVariables = Exact<{
  search: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
}>;

export type OrgSearchByNameQuery = {
  __typename?: 'Query';
  githubOrganizations: Array<{
    __typename?: 'GithubOrganization';
    id: number;
    name: string;
    githubOrgId: number;
    repos: Array<{
      __typename?: 'Repo';
      id: number;
      name: string;
      lastPRUpdatedAt: any;
      project: {
        __typename?: 'Project';
        gitPOAPs: Array<{
          __typename?: 'GitPOAP';
          id: number;
          name: string;
          description: string;
          imageUrl: string;
        }>;
      };
    }>;
  }>;
};

export type GitPoapSearchByNameQueryVariables = Exact<{
  search: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
}>;

export type GitPoapSearchByNameQuery = {
  __typename?: 'Query';
  gitPOAPS: Array<{
    __typename?: 'GitPOAP';
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    project?: {
      __typename?: 'Project';
      repos: Array<{
        __typename?: 'Repo';
        name: string;
        organization: { __typename?: 'GithubOrganization'; name: string };
      }>;
    } | null;
  }>;
};

export type GitPoaPsWithClaimCountQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput> | GitPoapOrderByWithRelationInput>;
}>;

export type GitPoaPsWithClaimCountQuery = {
  __typename?: 'Query';
  gitPOAPS: Array<{
    __typename?: 'GitPOAP';
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    _count?: { __typename?: 'GitPOAPCount'; claims: number } | null;
    project?: {
      __typename?: 'Project';
      id: number;
      repos: Array<{
        __typename?: 'Repo';
        name: string;
        organization: { __typename?: 'GithubOrganization'; name: string };
      }>;
    } | null;
  }>;
};

export type TrendingReposQueryVariables = Exact<{
  count: Scalars['Float'];
  numDays: Scalars['Float'];
}>;

export type TrendingReposQuery = {
  __typename?: 'Query';
  trendingRepos?: Array<{
    __typename?: 'RepoReturnData';
    id: number;
    name: string;
    githubRepoId: number;
    contributorCount: number;
    mintedGitPOAPCount: number;
    organization: { __typename?: 'GithubOrganization'; id: number; name: string };
    project: {
      __typename?: 'Project';
      gitPOAPs: Array<{ __typename?: 'GitPOAP'; id: number; imageUrl: string }>;
    };
  }> | null;
};

export type GitPoapRequestQueryVariables = Exact<{
  gitPOAPRequestId: Scalars['Int'];
}>;

export type GitPoapRequestQuery = {
  __typename?: 'Query';
  gitPOAPRequest?: {
    __typename?: 'GitPOAPRequest';
    name: string;
    contributors: any;
    description: string;
    startDate: any;
    endDate: any;
    imageUrl: string;
    staffApprovalStatus: StaffApprovalStatus;
    gitPOAPId?: number | null;
    teamId?: number | null;
    creatorEmail: { __typename?: 'Email'; emailAddress: string };
    address: { __typename?: 'Address'; ethAddress: string };
  } | null;
};

export type GitPoapRequestsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  approvalStatus?: InputMaybe<StaffApprovalStatus>;
  search?: InputMaybe<Scalars['Int']>;
}>;

export type GitPoapRequestsQuery = {
  __typename?: 'Query';
  gitPOAPRequests: Array<{
    __typename?: 'GitPOAPRequest';
    id: number;
    createdAt: any;
    updatedAt: any;
    name: string;
    description: string;
    imageUrl: string;
    startDate: any;
    endDate: any;
    numRequestedCodes: number;
    contributors: any;
    staffApprovalStatus: StaffApprovalStatus;
    creatorEmail: { __typename?: 'Email'; emailAddress: string };
    address: { __typename?: 'Address'; ethAddress: string; ensName?: string | null };
    project?: {
      __typename?: 'Project';
      repos: Array<{
        __typename?: 'Repo';
        id: number;
        name: string;
        organization: { __typename?: 'GithubOrganization'; id: number; name: string };
      }>;
    } | null;
  }>;
};

export type TotalGitPoapRequestsCountQueryVariables = Exact<{
  approvalStatus?: InputMaybe<StaffApprovalStatus>;
}>;

export type TotalGitPoapRequestsCountQuery = {
  __typename?: 'Query';
  aggregateGitPOAPRequest: {
    __typename?: 'AggregateGitPOAPRequest';
    _count?: { __typename?: 'GitPOAPRequestCountAggregate'; id: number } | null;
  };
};

export type UserGitPoapRequestsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  approvalStatus?: InputMaybe<StaffApprovalStatus>;
  address?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;

export type UserGitPoapRequestsQuery = {
  __typename?: 'Query';
  gitPOAPRequests: Array<{
    __typename?: 'GitPOAPRequest';
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    startDate: any;
    endDate: any;
    numRequestedCodes: number;
    createdAt: any;
    contributors: any;
    staffApprovalStatus: StaffApprovalStatus;
    creatorEmail: { __typename?: 'Email'; emailAddress: string };
    gitPOAP?: { __typename?: 'GitPOAP'; id: number } | null;
    project?: {
      __typename?: 'Project';
      repos: Array<{
        __typename?: 'Repo';
        id: number;
        name: string;
        organization: { __typename?: 'GithubOrganization'; id: number; name: string };
      }>;
    } | null;
  }>;
};

export type TotalUserGitPoapRequestsCountQueryVariables = Exact<{
  approvalStatus?: InputMaybe<StaffApprovalStatus>;
  address?: InputMaybe<Scalars['String']>;
}>;

export type TotalUserGitPoapRequestsCountQuery = {
  __typename?: 'Query';
  aggregateGitPOAPRequest: {
    __typename?: 'AggregateGitPOAPRequest';
    _count?: { __typename?: 'GitPOAPRequestCountAggregate'; id: number } | null;
  };
};

export type GitPoapWithClaimsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput> | ClaimOrderByWithRelationInput>;
  search?: InputMaybe<Scalars['String']>;
}>;

export type GitPoapWithClaimsQuery = {
  __typename?: 'Query';
  gitPOAP?: {
    __typename?: 'GitPOAP';
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    type: GitPoapType;
    _count?: { __typename?: 'GitPOAPCount'; claims: number } | null;
    creatorAddress?: { __typename?: 'Address'; ethAddress: string } | null;
    claims: Array<{
      __typename?: 'Claim';
      id: number;
      status: ClaimStatus;
      mintedAt?: any | null;
      createdAt: any;
      mintedAddress?: {
        __typename?: 'Address';
        ensName?: string | null;
        ethAddress: string;
        ensAvatarImageUrl?: string | null;
      } | null;
      githubUser?: { __typename?: 'GithubUser'; githubHandle: string } | null;
      email?: { __typename?: 'Email'; emailAddress: string } | null;
      issuedAddress?: {
        __typename?: 'Address';
        ethAddress: string;
        ensName?: string | null;
        ensAvatarImageUrl?: string | null;
      } | null;
    }>;
    project?: {
      __typename?: 'Project';
      id: number;
      repos: Array<{
        __typename?: 'Repo';
        name: string;
        organization: { __typename?: 'GithubOrganization'; name: string };
      }>;
    } | null;
  } | null;
};

export type UserTeamsQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type UserTeamsQuery = {
  __typename?: 'Query';
  teams: Array<{
    __typename?: 'Team';
    id: number;
    name: string;
    description?: string | null;
    logoImageUrl?: string | null;
  }>;
};

export type TeamDataQueryVariables = Exact<{
  teamId: Scalars['Int'];
}>;

export type TeamDataQuery = {
  __typename?: 'Query';
  team?: {
    __typename?: 'Team';
    id: number;
    name: string;
    description?: string | null;
    logoImageUrl?: string | null;
  } | null;
};

export type UpdateTeamMutationVariables = Exact<{
  teamId: Scalars['Float'];
  input: TeamUpdateInput;
}>;

export type UpdateTeamMutation = {
  __typename?: 'Mutation';
  updateTeam: { __typename?: 'TeamUpdatePayload'; name: string; description?: string | null };
};

export type TeamGitPoaPsQueryVariables = Exact<{
  teamId: Scalars['Float'];
  approvalStatus?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
}>;

export type TeamGitPoaPsQuery = {
  __typename?: 'Query';
  teamGitPOAPs: Array<{
    __typename?: 'GitPOAP';
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: any;
    poapApprovalStatus: GitPoapStatus;
    claims: Array<{ __typename?: 'Claim'; id: number }>;
  }>;
};

export type TeamMembershipsQueryVariables = Exact<{
  teamId: Scalars['Float'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
}>;

export type TeamMembershipsQuery = {
  __typename?: 'Query';
  teamMemberships?: {
    __typename?: 'TeamMemberships';
    total: number;
    memberships: Array<{
      __typename?: 'MembershipWithTeam';
      id: number;
      addressId: number;
      joinedOn?: any | null;
      role: MembershipRole;
      acceptanceStatus: MembershipAcceptanceStatus;
      createdAt: any;
      address: { __typename?: 'Address'; ethAddress: string; ensName?: string | null };
      team: { __typename?: 'Team'; name: string };
    }>;
  } | null;
};

export type TeamGitPoapRequestsQueryVariables = Exact<{
  teamId: Scalars['Float'];
  approvalStatus?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
}>;

export type TeamGitPoapRequestsQuery = {
  __typename?: 'Query';
  teamGitPOAPRequests: Array<{
    __typename?: 'GitPOAPRequest';
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: any;
    staffApprovalStatus: StaffApprovalStatus;
    contributors: any;
  }>;
};

export type UserMembershipsQueryVariables = Exact<{ [key: string]: never }>;

export type UserMembershipsQuery = {
  __typename?: 'Query';
  userMemberships?: {
    __typename?: 'UserMemberships';
    memberships: Array<{
      __typename?: 'MembershipWithTeam';
      id: number;
      teamId: number;
      addressId: number;
      joinedOn?: any | null;
      role: MembershipRole;
      acceptanceStatus: MembershipAcceptanceStatus;
      createdAt: any;
      team: { __typename?: 'Team'; name: string; logoImageUrl?: string | null };
      address: { __typename?: 'Address'; ethAddress: string; ensName?: string | null };
    }>;
  } | null;
};

export type AddMembershipMutationVariables = Exact<{
  teamId: Scalars['Float'];
  address: Scalars['String'];
}>;

export type AddMembershipMutation = {
  __typename?: 'Mutation';
  addNewMembership: {
    __typename?: 'MembershipMutationPayload';
    membership?: {
      __typename?: 'MembershipWithTeam';
      acceptanceStatus: MembershipAcceptanceStatus;
      role: MembershipRole;
    } | null;
  };
};

export type RemoveMembershipMutationVariables = Exact<{
  membershipId: Scalars['Float'];
}>;

export type RemoveMembershipMutation = {
  __typename?: 'Mutation';
  removeMembership: {
    __typename?: 'MembershipMutationPayload';
    membership?: {
      __typename?: 'MembershipWithTeam';
      id: number;
      teamId: number;
      role: MembershipRole;
    } | null;
  };
};

export type AcceptMembershipMutationVariables = Exact<{
  teamId: Scalars['Float'];
}>;

export type AcceptMembershipMutation = {
  __typename?: 'Mutation';
  acceptMembership: {
    __typename?: 'MembershipMutationPayload';
    membership?: {
      __typename?: 'MembershipWithTeam';
      acceptanceStatus: MembershipAcceptanceStatus;
      role: MembershipRole;
    } | null;
  };
};

export type UserPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type UserPermissionsQuery = {
  __typename?: 'Query';
  userPermissions: { __typename?: 'Permissions'; canCreateCGs: boolean; isStaff: boolean };
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
  return Urql.useQuery<GetAllStatsQuery, GetAllStatsQueryVariables>({
    query: GetAllStatsDocument,
    ...options,
  });
}
export const LeadersDocument = gql`
  query leaders($count: Float!) {
    mostHonoredContributors(count: $count) {
      profile {
        id
        address {
          ethAddress
          ensAvatarImageUrl
          ensName
        }
      }
      claimsCount
    }
  }
`;

export function useLeadersQuery(options: Omit<Urql.UseQueryArgs<LeadersQueryVariables>, 'query'>) {
  return Urql.useQuery<LeadersQuery, LeadersQueryVariables>({ query: LeadersDocument, ...options });
}
export const RepoLeadersDocument = gql`
  query repoLeaders($repoId: Float!, $page: Float, $perPage: Float) {
    repoMostHonoredContributors(repoId: $repoId, page: $page, perPage: $perPage) {
      profile {
        id
        address {
          ethAddress
          ensAvatarImageUrl
          ensName
        }
      }
      claimsCount
    }
  }
`;

export function useRepoLeadersQuery(
  options: Omit<Urql.UseQueryArgs<RepoLeadersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoLeadersQuery, RepoLeadersQueryVariables>({
    query: RepoLeadersDocument,
    ...options,
  });
}
export const GitpoapByPoapEventIdDocument = gql`
  query gitpoapByPoapEventId($poapEventId: Int!) {
    gitPOAP(where: { poapEventId: $poapEventId }) {
      id
      poapEventId
      poapApprovalStatus
      project {
        repos {
          name
        }
      }
    }
  }
`;

export function useGitpoapByPoapEventIdQuery(
  options: Omit<Urql.UseQueryArgs<GitpoapByPoapEventIdQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitpoapByPoapEventIdQuery, GitpoapByPoapEventIdQueryVariables>({
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
        ensAvatarImageUrl
        ensName
      }
    }
  }
`;

export function useGitPoapHoldersQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapHoldersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapHoldersQuery, GitPoapHoldersQueryVariables>({
    query: GitPoapHoldersDocument,
    ...options,
  });
}
export const MostClaimedGitPoapsDocument = gql`
  query mostClaimedGitPoaps($count: Float!) {
    mostClaimedGitPOAPs(count: $count) {
      claimsCount
      gitPOAP {
        id
        project {
          repos {
            id
            name
            organization {
              name
            }
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
  return Urql.useQuery<MostClaimedGitPoapsQuery, MostClaimedGitPoapsQueryVariables>({
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
      isVisibleOnLeaderboard
      ensAvatarImageUrl
      ensName
    }
  }
`;

export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<ProfileQuery, ProfileQueryVariables>({ query: ProfileDocument, ...options });
}
export const SearchForStringDocument = gql`
  query searchForString($text: String!) {
    search(text: $text) {
      profiles {
        id
        address {
          ethAddress
          ensAvatarImageUrl
          ensName
        }
      }
    }
  }
`;

export function useSearchForStringQuery(
  options: Omit<Urql.UseQueryArgs<SearchForStringQueryVariables>, 'query'>,
) {
  return Urql.useQuery<SearchForStringQuery, SearchForStringQueryVariables>({
    query: SearchForStringDocument,
    ...options,
  });
}
export const GitPoapsDocument = gql`
  query gitPoaps($address: String!, $sort: String, $page: Float, $perPage: Float) {
    userPOAPs(address: $address, sort: $sort, page: $page, perPage: $perPage) {
      totalGitPOAPs
      gitPOAPs {
        claim {
          pullRequestEarned {
            id
            repo {
              name
              organization {
                name
              }
            }
          }
          gitPOAP {
            id
          }
          status
          poapTokenId
        }
        event {
          name
          image_url
          description
        }
        contributionCount
      }
    }
  }
`;

export function useGitPoapsQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapsQuery, GitPoapsQueryVariables>({
    query: GitPoapsDocument,
    ...options,
  });
}
export const RepoGitPoapsDocument = gql`
  query repoGitPoaps($repoId: Float!, $sort: String, $page: Float, $perPage: Float) {
    repoGitPOAPs(repoId: $repoId, sort: $sort, page: $page, perPage: $perPage) {
      totalGitPOAPs
      gitPOAPs {
        gitPOAP {
          id
          project {
            repos {
              name
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
  }
`;

export function useRepoGitPoapsQuery(
  options: Omit<Urql.UseQueryArgs<RepoGitPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoGitPoapsQuery, RepoGitPoapsQueryVariables>({
    query: RepoGitPoapsDocument,
    ...options,
  });
}
export const OpenClaimsDocument = gql`
  query openClaims {
    userClaims {
      claim {
        id
        pullRequestEarned {
          repo {
            name
            organization {
              name
            }
          }
        }
        status
        gitPOAP {
          id
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
  options?: Omit<Urql.UseQueryArgs<OpenClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OpenClaimsQuery, OpenClaimsQueryVariables>({
    query: OpenClaimsDocument,
    ...options,
  });
}
export const RecentReposDocument = gql`
  query recentRepos($count: Float!) {
    recentlyAddedRepos(count: $count) {
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
  return Urql.useQuery<RecentReposQuery, RecentReposQueryVariables>({
    query: RecentReposDocument,
    ...options,
  });
}
export const GitPoapEventDocument = gql`
  query gitPoapEvent($id: Float!) {
    gitPOAPEvent(id: $id) {
      gitPOAP {
        id
        creatorAddress {
          ethAddress
        }
        project {
          repos {
            id
            name
            organization {
              id
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

export function useGitPoapEventQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapEventQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapEventQuery, GitPoapEventQueryVariables>({
    query: GitPoapEventDocument,
    ...options,
  });
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
  return Urql.useQuery<AllPoapsQuery, AllPoapsQueryVariables>({
    query: AllPoapsDocument,
    ...options,
  });
}
export const FeaturedPoapsDocument = gql`
  query featuredPoaps($address: String!) {
    profileFeaturedPOAPs(address: $address) {
      gitPOAPs {
        claim {
          id
          pullRequestEarned {
            id
            repo {
              name
              organization {
                name
              }
            }
          }
          gitPOAP {
            id
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
  return Urql.useQuery<FeaturedPoapsQuery, FeaturedPoapsQueryVariables>({
    query: FeaturedPoapsDocument,
    ...options,
  });
}
export const AdminClaimsDocument = gql`
  query adminClaims($count: Int!) {
    claims(take: $count, orderBy: { mintedAt: desc }, where: { status: { equals: CLAIMED } }) {
      id
      githubUser {
        id
        githubHandle
      }
      status
      poapTokenId
      mintedAddress {
        ethAddress
      }
      updatedAt
      createdAt
      mintedAt
      pullRequestEarned {
        githubPullNumber
        repo {
          id
          name
          organization {
            id
            name
          }
        }
      }
      gitPOAP {
        id
        name
        year
        imageUrl
      }
    }
  }
`;

export function useAdminClaimsQuery(
  options: Omit<Urql.UseQueryArgs<AdminClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AdminClaimsQuery, AdminClaimsQueryVariables>({
    query: AdminClaimsDocument,
    ...options,
  });
}
export const EligibleClaimsDocument = gql`
  query eligibleClaims($query: String!, $skip: Int, $take: Int) {
    claims(
      take: $take
      skip: $skip
      where: {
        mintedAddressId: { equals: null }
        gitPOAP: {
          is: { isEnabled: { equals: true }, NOT: { poapApprovalStatus: { equals: UNAPPROVED } } }
        }
        OR: [
          { githubUser: { is: { githubHandle: { contains: $query, mode: insensitive } } } }
          { issuedAddress: { is: { ethAddress: { contains: $query, mode: insensitive } } } }
          { issuedAddress: { is: { ensName: { contains: $query, mode: insensitive } } } }
          { gitPOAP: { is: { name: { contains: $query, mode: insensitive } } } }
          { gitPOAP: { is: { description: { contains: $query, mode: insensitive } } } }
        ]
      }
    ) {
      id
      issuedAddress {
        ethAddress
        ensName
      }
      githubUser {
        githubHandle
      }
      gitPOAP {
        id
        name
        description
        imageUrl
        project {
          repos(take: 1) {
            name
            organization {
              name
            }
          }
        }
      }
    }
  }
`;

export function useEligibleClaimsQuery(
  options: Omit<Urql.UseQueryArgs<EligibleClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<EligibleClaimsQuery, EligibleClaimsQueryVariables>({
    query: EligibleClaimsDocument,
    ...options,
  });
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
      }
      project {
        gitPOAPs {
          id
          imageUrl
          name
        }
      }
      contributorCount
      mintedGitPOAPCount
      gitPOAPCount
    }
    repoStarCount(repoId: $repoId)
  }
`;

export function useRepoDataQuery(
  options: Omit<Urql.UseQueryArgs<RepoDataQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoDataQuery, RepoDataQueryVariables>({
    query: RepoDataDocument,
    ...options,
  });
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
  return Urql.useQuery<RepoSeoByIdQuery, RepoSeoByIdQueryVariables>({
    query: RepoSeoByIdDocument,
    ...options,
  });
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
  return Urql.useQuery<RepoSeoByNameQuery, RepoSeoByNameQueryVariables>({
    query: RepoSeoByNameDocument,
    ...options,
  });
}
export const RepoStarCountDocument = gql`
  query repoStarCount($repoId: Float!) {
    repoStarCount(repoId: $repoId)
  }
`;

export function useRepoStarCountQuery(
  options: Omit<Urql.UseQueryArgs<RepoStarCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoStarCountQuery, RepoStarCountQueryVariables>({
    query: RepoStarCountDocument,
    ...options,
  });
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
      project {
        gitPOAPs {
          id
        }
      }
    }
  }
`;

export function useAllReposQuery(
  options: Omit<Urql.UseQueryArgs<AllReposQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AllReposQuery, AllReposQueryVariables>({
    query: AllReposDocument,
    ...options,
  });
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
      project {
        gitPOAPs {
          id
        }
      }
    }
  }
`;

export function useAllReposOnRepoPageQuery(
  options?: Omit<Urql.UseQueryArgs<AllReposOnRepoPageQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AllReposOnRepoPageQuery, AllReposOnRepoPageQueryVariables>({
    query: AllReposOnRepoPageDocument,
    ...options,
  });
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
      project {
        gitPOAPs {
          id
        }
      }
    }
  }
`;

export function useRepoSearchOnRepoPageQuery(
  options?: Omit<Urql.UseQueryArgs<RepoSearchOnRepoPageQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoSearchOnRepoPageQuery, RepoSearchOnRepoPageQueryVariables>({
    query: RepoSearchOnRepoPageDocument,
    ...options,
  });
}
export const OrganizationDataDocument = gql`
  query organizationData($orgId: Float!) {
    organizationData(orgId: $orgId) {
      id
      name
      contributorCount
      gitPOAPCount
      mintedGitPOAPCount
      repoCount
    }
  }
`;

export function useOrganizationDataQuery(
  options: Omit<Urql.UseQueryArgs<OrganizationDataQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrganizationDataQuery, OrganizationDataQueryVariables>({
    query: OrganizationDataDocument,
    ...options,
  });
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
  return Urql.useQuery<OrganizationSeoByIdQuery, OrganizationSeoByIdQueryVariables>({
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
  return Urql.useQuery<OrganizationSeoByNameQuery, OrganizationSeoByNameQueryVariables>({
    query: OrganizationSeoByNameDocument,
    ...options,
  });
}
export const OrganizationsListDocument = gql`
  query organizationsList($sort: String, $search: String, $page: Float, $perPage: Float) {
    allOrganizations(sort: $sort, page: $page, perPage: $perPage, search: $search) {
      id
      name
      githubOrgId
      repos {
        id
        project {
          gitPOAPs {
            id
          }
        }
      }
    }
  }
`;

export function useOrganizationsListQuery(
  options?: Omit<Urql.UseQueryArgs<OrganizationsListQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrganizationsListQuery, OrganizationsListQueryVariables>({
    query: OrganizationsListDocument,
    ...options,
  });
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
  return Urql.useQuery<OrganizationReposQuery, OrganizationReposQueryVariables>({
    query: OrganizationReposDocument,
    ...options,
  });
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
  return Urql.useQuery<TotalRepoCountQuery, TotalRepoCountQueryVariables>({
    query: TotalRepoCountDocument,
    ...options,
  });
}
export const TotalOrganizationCountDocument = gql`
  query totalOrganizationCount($search: String) {
    aggregateGithubOrganization(where: { name: { contains: $search, mode: insensitive } }) {
      _count {
        id
      }
    }
  }
`;

export function useTotalOrganizationCountQuery(
  options?: Omit<Urql.UseQueryArgs<TotalOrganizationCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalOrganizationCountQuery, TotalOrganizationCountQueryVariables>({
    query: TotalOrganizationCountDocument,
    ...options,
  });
}
export const TotalGitPoapCountDocument = gql`
  query totalGitPOAPCount {
    aggregateGitPOAP {
      _count {
        id
      }
    }
  }
`;

export function useTotalGitPoapCountQuery(
  options?: Omit<Urql.UseQueryArgs<TotalGitPoapCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalGitPoapCountQuery, TotalGitPoapCountQueryVariables>({
    query: TotalGitPoapCountDocument,
    ...options,
  });
}
export const TotalAnnualGitPoapCountDocument = gql`
  query totalAnnualGitPOAPCount {
    aggregateGitPOAP(where: { type: { equals: ANNUAL } }) {
      _count {
        id
      }
    }
  }
`;

export function useTotalAnnualGitPoapCountQuery(
  options?: Omit<Urql.UseQueryArgs<TotalAnnualGitPoapCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalAnnualGitPoapCountQuery, TotalAnnualGitPoapCountQueryVariables>({
    query: TotalAnnualGitPoapCountDocument,
    ...options,
  });
}
export const TotalCustomGitPoapCountDocument = gql`
  query totalCustomGitPOAPCount {
    aggregateGitPOAP(where: { type: { equals: CUSTOM } }) {
      _count {
        id
      }
    }
  }
`;

export function useTotalCustomGitPoapCountQuery(
  options?: Omit<Urql.UseQueryArgs<TotalCustomGitPoapCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalCustomGitPoapCountQuery, TotalCustomGitPoapCountQueryVariables>({
    query: TotalCustomGitPoapCountDocument,
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
  return Urql.useQuery<ClaimsSinceQuery, ClaimsSinceQueryVariables>({
    query: ClaimsSinceDocument,
    ...options,
  });
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
  return Urql.useQuery<ReposSinceQuery, ReposSinceQueryVariables>({
    query: ReposSinceDocument,
    ...options,
  });
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
  return Urql.useQuery<GitPoaPsSinceQuery, GitPoaPsSinceQueryVariables>({
    query: GitPoaPsSinceDocument,
    ...options,
  });
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
  return Urql.useQuery<ProfilesSinceQuery, ProfilesSinceQueryVariables>({
    query: ProfilesSinceDocument,
    ...options,
  });
}
export const OrgsSinceDocument = gql`
  query orgsSince($date: DateTime) {
    githubOrganizations(where: { createdAt: { gt: $date } }) {
      id
    }
  }
`;

export function useOrgsSinceQuery(
  options?: Omit<Urql.UseQueryArgs<OrgsSinceQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrgsSinceQuery, OrgsSinceQueryVariables>({
    query: OrgsSinceDocument,
    ...options,
  });
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
  return Urql.useQuery<ClaimsCountQuery, ClaimsCountQueryVariables>({
    query: ClaimsCountDocument,
    ...options,
  });
}
export const ClaimsWithGithubHandleCountDocument = gql`
  query claimsWithGithubHandleCount {
    aggregateClaim(where: { githubUserId: { not: { equals: null } } }) {
      _count {
        id
      }
    }
  }
`;

export function useClaimsWithGithubHandleCountQuery(
  options?: Omit<Urql.UseQueryArgs<ClaimsWithGithubHandleCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ClaimsWithGithubHandleCountQuery, ClaimsWithGithubHandleCountQueryVariables>(
    { query: ClaimsWithGithubHandleCountDocument, ...options },
  );
}
export const ClaimsWithEmailCountDocument = gql`
  query claimsWithEmailCount {
    aggregateClaim(where: { emailId: { not: { equals: null } } }) {
      _count {
        id
      }
    }
  }
`;

export function useClaimsWithEmailCountQuery(
  options?: Omit<Urql.UseQueryArgs<ClaimsWithEmailCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ClaimsWithEmailCountQuery, ClaimsWithEmailCountQueryVariables>({
    query: ClaimsWithEmailCountDocument,
    ...options,
  });
}
export const ClaimsWithIssuedAddressCountDocument = gql`
  query claimsWithIssuedAddressCount {
    aggregateClaim(where: { issuedAddressId: { not: { equals: null } } }) {
      _count {
        id
      }
    }
  }
`;

export function useClaimsWithIssuedAddressCountQuery(
  options?: Omit<Urql.UseQueryArgs<ClaimsWithIssuedAddressCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    ClaimsWithIssuedAddressCountQuery,
    ClaimsWithIssuedAddressCountQueryVariables
  >({ query: ClaimsWithIssuedAddressCountDocument, ...options });
}
export const TotalAddressesDocument = gql`
  query totalAddresses {
    aggregateAddress {
      _count {
        id
      }
    }
  }
`;

export function useTotalAddressesQuery(
  options?: Omit<Urql.UseQueryArgs<TotalAddressesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalAddressesQuery, TotalAddressesQueryVariables>({
    query: TotalAddressesDocument,
    ...options,
  });
}
export const TotalAddressesWithEnsNamesDocument = gql`
  query totalAddressesWithEnsNames {
    aggregateAddress(where: { ensName: { not: { equals: null } } }) {
      _count {
        id
      }
    }
  }
`;

export function useTotalAddressesWithEnsNamesQuery(
  options?: Omit<Urql.UseQueryArgs<TotalAddressesWithEnsNamesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalAddressesWithEnsNamesQuery, TotalAddressesWithEnsNamesQueryVariables>({
    query: TotalAddressesWithEnsNamesDocument,
    ...options,
  });
}
export const TotalAddressesWithEnsAvatarsDocument = gql`
  query totalAddressesWithEnsAvatars {
    aggregateAddress(where: { ensAvatarImageUrl: { not: { equals: null } } }) {
      _count {
        id
      }
    }
  }
`;

export function useTotalAddressesWithEnsAvatarsQuery(
  options?: Omit<Urql.UseQueryArgs<TotalAddressesWithEnsAvatarsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    TotalAddressesWithEnsAvatarsQuery,
    TotalAddressesWithEnsAvatarsQueryVariables
  >({ query: TotalAddressesWithEnsAvatarsDocument, ...options });
}
export const TotalEmailsDocument = gql`
  query totalEmails {
    aggregateEmail {
      _count {
        id
      }
    }
  }
`;

export function useTotalEmailsQuery(
  options?: Omit<Urql.UseQueryArgs<TotalEmailsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalEmailsQuery, TotalEmailsQueryVariables>({
    query: TotalEmailsDocument,
    ...options,
  });
}
export const TotalEmailsValidatedDocument = gql`
  query totalEmailsValidated {
    aggregateEmail {
      _count {
        id
      }
    }
  }
`;

export function useTotalEmailsValidatedQuery(
  options?: Omit<Urql.UseQueryArgs<TotalEmailsValidatedQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalEmailsValidatedQuery, TotalEmailsValidatedQueryVariables>({
    query: TotalEmailsValidatedDocument,
    ...options,
  });
}
export const TotalUsersDocument = gql`
  query totalUsers {
    aggregateGithubUser {
      _count {
        githubHandle
      }
    }
  }
`;

export function useTotalUsersQuery(
  options?: Omit<Urql.UseQueryArgs<TotalUsersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalUsersQuery, TotalUsersQueryVariables>({
    query: TotalUsersDocument,
    ...options,
  });
}
export const TotalProfilesDocument = gql`
  query totalProfiles {
    aggregateProfile {
      _count {
        id
      }
    }
  }
`;

export function useTotalProfilesQuery(
  options?: Omit<Urql.UseQueryArgs<TotalProfilesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalProfilesQuery, TotalProfilesQueryVariables>({
    query: TotalProfilesDocument,
    ...options,
  });
}
export const TotalProfilesWithGitHubHandleDocument = gql`
  query totalProfilesWithGitHubHandle {
    aggregateProfile(where: { githubHandle: { not: { equals: "" } } }) {
      _count {
        id
      }
    }
  }
`;

export function useTotalProfilesWithGitHubHandleQuery(
  options?: Omit<Urql.UseQueryArgs<TotalProfilesWithGitHubHandleQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    TotalProfilesWithGitHubHandleQuery,
    TotalProfilesWithGitHubHandleQueryVariables
  >({ query: TotalProfilesWithGitHubHandleDocument, ...options });
}
export const TotalProfilesHiddenDocument = gql`
  query totalProfilesHidden {
    aggregateProfile(where: { isVisibleOnLeaderboard: { equals: false } }) {
      _count {
        id
      }
    }
  }
`;

export function useTotalProfilesHiddenQuery(
  options?: Omit<Urql.UseQueryArgs<TotalProfilesHiddenQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalProfilesHiddenQuery, TotalProfilesHiddenQueryVariables>({
    query: TotalProfilesHiddenDocument,
    ...options,
  });
}
export const TotalAddressesWithClaimsDocument = gql`
  query totalAddressesWithClaims {
    claims(where: { status: { equals: CLAIMED }, issuedAddressId: { not: { equals: null } } }) {
      id
    }
  }
`;

export function useTotalAddressesWithClaimsQuery(
  options?: Omit<Urql.UseQueryArgs<TotalAddressesWithClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalAddressesWithClaimsQuery, TotalAddressesWithClaimsQueryVariables>({
    query: TotalAddressesWithClaimsDocument,
    ...options,
  });
}
export const TotalDistinctUsersWithClaimsDocument = gql`
  query totalDistinctUsersWithClaims {
    claims(distinct: githubUserId, where: { status: { equals: CLAIMED } }) {
      id
    }
  }
`;

export function useTotalDistinctUsersWithClaimsQuery(
  options?: Omit<Urql.UseQueryArgs<TotalDistinctUsersWithClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    TotalDistinctUsersWithClaimsQuery,
    TotalDistinctUsersWithClaimsQueryVariables
  >({ query: TotalDistinctUsersWithClaimsDocument, ...options });
}
export const TotalEmailsWithClaimsDocument = gql`
  query totalEmailsWithClaims {
    claims(where: { status: { equals: CLAIMED }, emailId: { not: { equals: null } } }) {
      id
    }
  }
`;

export function useTotalEmailsWithClaimsQuery(
  options?: Omit<Urql.UseQueryArgs<TotalEmailsWithClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalEmailsWithClaimsQuery, TotalEmailsWithClaimsQueryVariables>({
    query: TotalEmailsWithClaimsDocument,
    ...options,
  });
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
  return Urql.useQuery<MintedClaimsCountQuery, MintedClaimsCountQueryVariables>({
    query: MintedClaimsCountDocument,
    ...options,
  });
}
export const UnverifiedClaimsCountDocument = gql`
  query unverifiedClaimsCount {
    aggregateClaim(where: { needsRevalidation: { equals: true } }) {
      _count {
        id
      }
    }
  }
`;

export function useUnverifiedClaimsCountQuery(
  options?: Omit<Urql.UseQueryArgs<UnverifiedClaimsCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UnverifiedClaimsCountQuery, UnverifiedClaimsCountQueryVariables>({
    query: UnverifiedClaimsCountDocument,
    ...options,
  });
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
  return Urql.useQuery<AllGitPoapIdsQuery, AllGitPoapIdsQueryVariables>({
    query: AllGitPoapIdsDocument,
    ...options,
  });
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
  return Urql.useQuery<ReposGetStaticPathsQuery, ReposGetStaticPathsQueryVariables>({
    query: ReposGetStaticPathsDocument,
    ...options,
  });
}
export const OrgsGetStaticPathsDocument = gql`
  query orgsGetStaticPaths {
    githubOrganizations {
      id
      name
    }
  }
`;

export function useOrgsGetStaticPathsQuery(
  options?: Omit<Urql.UseQueryArgs<OrgsGetStaticPathsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrgsGetStaticPathsQuery, OrgsGetStaticPathsQueryVariables>({
    query: OrgsGetStaticPathsDocument,
    ...options,
  });
}
export const CountClaimsWithPullRequestEarnedDocument = gql`
  query countClaimsWithPullRequestEarned {
    aggregateClaim(where: { pullRequestEarned: { isNot: null } }) {
      _count {
        id
      }
    }
  }
`;

export function useCountClaimsWithPullRequestEarnedQuery(
  options?: Omit<Urql.UseQueryArgs<CountClaimsWithPullRequestEarnedQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    CountClaimsWithPullRequestEarnedQuery,
    CountClaimsWithPullRequestEarnedQueryVariables
  >({ query: CountClaimsWithPullRequestEarnedDocument, ...options });
}
export const RepoSearchByNameDocument = gql`
  query repoSearchByName($search: String!, $take: Int = 4) {
    repos(
      take: $take
      where: { name: { contains: $search, mode: insensitive } }
      orderBy: { lastPRUpdatedAt: desc }
    ) {
      id
      name
      githubRepoId
      organization {
        name
      }
      project {
        id
        gitPOAPs(take: 1, where: { isEnabled: { equals: true } }) {
          id
          name
          description
          imageUrl
        }
      }
    }
  }
`;

export function useRepoSearchByNameQuery(
  options: Omit<Urql.UseQueryArgs<RepoSearchByNameQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RepoSearchByNameQuery, RepoSearchByNameQueryVariables>({
    query: RepoSearchByNameDocument,
    ...options,
  });
}
export const OrgSearchByNameDocument = gql`
  query orgSearchByName($search: String!, $take: Int = 4) {
    githubOrganizations(take: $take, where: { name: { contains: $search, mode: insensitive } }) {
      id
      name
      githubOrgId
      repos(orderBy: { lastPRUpdatedAt: desc }) {
        id
        name
        lastPRUpdatedAt
        project {
          gitPOAPs(take: 1, where: { isEnabled: { equals: true } }) {
            id
            name
            description
            imageUrl
          }
        }
      }
    }
  }
`;

export function useOrgSearchByNameQuery(
  options: Omit<Urql.UseQueryArgs<OrgSearchByNameQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OrgSearchByNameQuery, OrgSearchByNameQueryVariables>({
    query: OrgSearchByNameDocument,
    ...options,
  });
}
export const GitPoapSearchByNameDocument = gql`
  query gitPOAPSearchByName($search: String!, $take: Int = 4) {
    gitPOAPS(
      take: $take
      where: { name: { contains: $search, mode: insensitive }, isEnabled: { equals: true } }
    ) {
      id
      name
      description
      imageUrl
      project {
        repos(take: 1) {
          name
          organization {
            name
          }
        }
      }
    }
  }
`;

export function useGitPoapSearchByNameQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapSearchByNameQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapSearchByNameQuery, GitPoapSearchByNameQueryVariables>({
    query: GitPoapSearchByNameDocument,
    ...options,
  });
}
export const GitPoaPsWithClaimCountDocument = gql`
  query gitPOAPsWithClaimCount(
    $skip: Int
    $take: Int
    $orderBy: [GitPOAPOrderByWithRelationInput!]
  ) {
    gitPOAPS(skip: $skip, take: $take, orderBy: $orderBy) {
      id
      name
      description
      imageUrl
      _count {
        claims
      }
      project {
        id
        repos {
          name
          organization {
            name
          }
        }
      }
    }
  }
`;

export function useGitPoaPsWithClaimCountQuery(
  options?: Omit<Urql.UseQueryArgs<GitPoaPsWithClaimCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoaPsWithClaimCountQuery, GitPoaPsWithClaimCountQueryVariables>({
    query: GitPoaPsWithClaimCountDocument,
    ...options,
  });
}
export const TrendingReposDocument = gql`
  query trendingRepos($count: Float!, $numDays: Float!) {
    trendingRepos(count: $count, numDays: $numDays) {
      id
      name
      githubRepoId
      organization {
        id
        name
      }
      project {
        gitPOAPs {
          id
          imageUrl
        }
      }
      contributorCount
      mintedGitPOAPCount
    }
  }
`;

export function useTrendingReposQuery(
  options: Omit<Urql.UseQueryArgs<TrendingReposQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TrendingReposQuery, TrendingReposQueryVariables>({
    query: TrendingReposDocument,
    ...options,
  });
}
export const GitPoapRequestDocument = gql`
  query gitPOAPRequest($gitPOAPRequestId: Int!) {
    gitPOAPRequest(where: { id: $gitPOAPRequestId }) {
      name
      contributors
      description
      startDate
      endDate
      creatorEmail {
        emailAddress
      }
      imageUrl
      staffApprovalStatus
      address {
        ethAddress
      }
      gitPOAPId
      teamId
    }
  }
`;

export function useGitPoapRequestQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapRequestQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapRequestQuery, GitPoapRequestQueryVariables>({
    query: GitPoapRequestDocument,
    ...options,
  });
}
export const GitPoapRequestsDocument = gql`
  query gitPOAPRequests(
    $take: Int
    $skip: Int
    $approvalStatus: StaffApprovalStatus
    $search: Int
  ) {
    gitPOAPRequests(
      take: $take
      skip: $skip
      where: { staffApprovalStatus: { equals: $approvalStatus }, id: { equals: $search } }
      orderBy: { createdAt: desc }
    ) {
      id
      createdAt
      updatedAt
      name
      description
      imageUrl
      startDate
      endDate
      numRequestedCodes
      creatorEmail {
        emailAddress
      }
      contributors
      staffApprovalStatus
      address {
        ethAddress
        ensName
      }
      project {
        repos(take: 1) {
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

export function useGitPoapRequestsQuery(
  options?: Omit<Urql.UseQueryArgs<GitPoapRequestsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapRequestsQuery, GitPoapRequestsQueryVariables>({
    query: GitPoapRequestsDocument,
    ...options,
  });
}
export const TotalGitPoapRequestsCountDocument = gql`
  query totalGitPOAPRequestsCount($approvalStatus: StaffApprovalStatus) {
    aggregateGitPOAPRequest(where: { staffApprovalStatus: { equals: $approvalStatus } }) {
      _count {
        id
      }
    }
  }
`;

export function useTotalGitPoapRequestsCountQuery(
  options?: Omit<Urql.UseQueryArgs<TotalGitPoapRequestsCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TotalGitPoapRequestsCountQuery, TotalGitPoapRequestsCountQueryVariables>({
    query: TotalGitPoapRequestsCountDocument,
    ...options,
  });
}
export const UserGitPoapRequestsDocument = gql`
  query userGitPOAPRequests(
    $take: Int
    $skip: Int
    $approvalStatus: StaffApprovalStatus
    $address: String
    $search: String
  ) {
    gitPOAPRequests(
      take: $take
      skip: $skip
      where: {
        staffApprovalStatus: { equals: $approvalStatus }
        address: { is: { ethAddress: { equals: $address, mode: insensitive } } }
        OR: [
          { name: { contains: $search, mode: insensitive } }
          { description: { contains: $search, mode: insensitive } }
        ]
      }
      orderBy: { createdAt: desc }
    ) {
      id
      name
      description
      imageUrl
      startDate
      endDate
      numRequestedCodes
      createdAt
      creatorEmail {
        emailAddress
      }
      gitPOAP {
        id
      }
      contributors
      staffApprovalStatus
      project {
        repos(take: 1) {
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

export function useUserGitPoapRequestsQuery(
  options?: Omit<Urql.UseQueryArgs<UserGitPoapRequestsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserGitPoapRequestsQuery, UserGitPoapRequestsQueryVariables>({
    query: UserGitPoapRequestsDocument,
    ...options,
  });
}
export const TotalUserGitPoapRequestsCountDocument = gql`
  query totalUserGitPOAPRequestsCount($approvalStatus: StaffApprovalStatus, $address: String) {
    aggregateGitPOAPRequest(
      where: {
        staffApprovalStatus: { equals: $approvalStatus }
        address: { is: { ethAddress: { equals: $address, mode: insensitive } } }
      }
    ) {
      _count {
        id
      }
    }
  }
`;

export function useTotalUserGitPoapRequestsCountQuery(
  options?: Omit<Urql.UseQueryArgs<TotalUserGitPoapRequestsCountQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    TotalUserGitPoapRequestsCountQuery,
    TotalUserGitPoapRequestsCountQueryVariables
  >({ query: TotalUserGitPoapRequestsCountDocument, ...options });
}
export const GitPoapWithClaimsDocument = gql`
  query gitPOAPWithClaims(
    $id: Int
    $take: Int
    $skip: Int
    $orderBy: [ClaimOrderByWithRelationInput!]
    $search: String
  ) {
    gitPOAP(where: { id: $id }) {
      id
      name
      description
      imageUrl
      type
      _count {
        claims
      }
      creatorAddress {
        ethAddress
      }
      claims(
        take: $take
        skip: $skip
        orderBy: $orderBy
        where: {
          OR: [
            { mintedAddress: { is: { ethAddress: { contains: $search, mode: insensitive } } } }
            { mintedAddress: { is: { ensName: { contains: $search, mode: insensitive } } } }
            { issuedAddress: { is: { ensName: { contains: $search, mode: insensitive } } } }
            { issuedAddress: { is: { ensName: { contains: $search, mode: insensitive } } } }
            { email: { is: { emailAddress: { contains: $search, mode: insensitive } } } }
            { githubUser: { is: { githubHandle: { contains: $search, mode: insensitive } } } }
          ]
        }
      ) {
        id
        status
        mintedAt
        createdAt
        mintedAddress {
          ensName
          ethAddress
          ensAvatarImageUrl
        }
        githubUser {
          githubHandle
        }
        email {
          emailAddress
        }
        issuedAddress {
          ethAddress
          ensName
          ensAvatarImageUrl
        }
      }
      project {
        id
        repos {
          name
          organization {
            name
          }
        }
      }
    }
  }
`;

export function useGitPoapWithClaimsQuery(
  options?: Omit<Urql.UseQueryArgs<GitPoapWithClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapWithClaimsQuery, GitPoapWithClaimsQueryVariables>({
    query: GitPoapWithClaimsDocument,
    ...options,
  });
}
export const UserTeamsDocument = gql`
  query userTeams($address: String!) {
    teams(
      where: {
        memberships: {
          some: {
            AND: [
              { address: { is: { ethAddress: { equals: $address } } } }
              { acceptanceStatus: { equals: ACCEPTED } }
            ]
          }
        }
      }
    ) {
      id
      name
      description
      logoImageUrl
    }
  }
`;

export function useUserTeamsQuery(
  options: Omit<Urql.UseQueryArgs<UserTeamsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserTeamsQuery, UserTeamsQueryVariables>({
    query: UserTeamsDocument,
    ...options,
  });
}
export const TeamDataDocument = gql`
  query teamData($teamId: Int!) {
    team(where: { id: $teamId }) {
      id
      name
      description
      logoImageUrl
    }
  }
`;

export function useTeamDataQuery(
  options: Omit<Urql.UseQueryArgs<TeamDataQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TeamDataQuery, TeamDataQueryVariables>({
    query: TeamDataDocument,
    ...options,
  });
}
export const UpdateTeamDocument = gql`
  mutation updateTeam($teamId: Float!, $input: TeamUpdateInput!) {
    updateTeam(teamId: $teamId, input: $input) {
      name
      description
    }
  }
`;

export function useUpdateTeamMutation() {
  return Urql.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument);
}
export const TeamGitPoaPsDocument = gql`
  query teamGitPOAPs($teamId: Float!, $approvalStatus: String, $sort: String) {
    teamGitPOAPs(teamId: $teamId, approvalStatus: $approvalStatus, sort: $sort) {
      id
      name
      description
      imageUrl
      createdAt
      poapApprovalStatus
      claims {
        id
      }
    }
  }
`;

export function useTeamGitPoaPsQuery(
  options: Omit<Urql.UseQueryArgs<TeamGitPoaPsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TeamGitPoaPsQuery, TeamGitPoaPsQueryVariables>({
    query: TeamGitPoaPsDocument,
    ...options,
  });
}
export const TeamMembershipsDocument = gql`
  query teamMemberships($teamId: Float!, $page: Float, $perPage: Float, $sort: String) {
    teamMemberships(teamId: $teamId, page: $page, perPage: $perPage, sort: $sort) {
      total
      memberships {
        id
        addressId
        address {
          ethAddress
          ensName
        }
        joinedOn
        role
        acceptanceStatus
        createdAt
        team {
          name
        }
      }
    }
  }
`;

export function useTeamMembershipsQuery(
  options: Omit<Urql.UseQueryArgs<TeamMembershipsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TeamMembershipsQuery, TeamMembershipsQueryVariables>({
    query: TeamMembershipsDocument,
    ...options,
  });
}
export const TeamGitPoapRequestsDocument = gql`
  query teamGitPOAPRequests($teamId: Float!, $approvalStatus: String, $sort: String) {
    teamGitPOAPRequests(teamId: $teamId, approvalStatus: $approvalStatus, sort: $sort) {
      id
      name
      description
      imageUrl
      createdAt
      staffApprovalStatus
      contributors
    }
  }
`;

export function useTeamGitPoapRequestsQuery(
  options: Omit<Urql.UseQueryArgs<TeamGitPoapRequestsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<TeamGitPoapRequestsQuery, TeamGitPoapRequestsQueryVariables>({
    query: TeamGitPoapRequestsDocument,
    ...options,
  });
}
export const UserMembershipsDocument = gql`
  query userMemberships {
    userMemberships {
      memberships {
        id
        teamId
        team {
          name
          logoImageUrl
        }
        addressId
        address {
          ethAddress
          ensName
        }
        joinedOn
        role
        acceptanceStatus
        createdAt
      }
    }
  }
`;

export function useUserMembershipsQuery(
  options?: Omit<Urql.UseQueryArgs<UserMembershipsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserMembershipsQuery, UserMembershipsQueryVariables>({
    query: UserMembershipsDocument,
    ...options,
  });
}
export const AddMembershipDocument = gql`
  mutation addMembership($teamId: Float!, $address: String!) {
    addNewMembership(teamId: $teamId, address: $address) {
      membership {
        acceptanceStatus
        role
      }
    }
  }
`;

export function useAddMembershipMutation() {
  return Urql.useMutation<AddMembershipMutation, AddMembershipMutationVariables>(
    AddMembershipDocument,
  );
}
export const RemoveMembershipDocument = gql`
  mutation removeMembership($membershipId: Float!) {
    removeMembership(membershipId: $membershipId) {
      membership {
        id
        teamId
        role
      }
    }
  }
`;

export function useRemoveMembershipMutation() {
  return Urql.useMutation<RemoveMembershipMutation, RemoveMembershipMutationVariables>(
    RemoveMembershipDocument,
  );
}
export const AcceptMembershipDocument = gql`
  mutation acceptMembership($teamId: Float!) {
    acceptMembership(teamId: $teamId) {
      membership {
        acceptanceStatus
        role
      }
    }
  }
`;

export function useAcceptMembershipMutation() {
  return Urql.useMutation<AcceptMembershipMutation, AcceptMembershipMutationVariables>(
    AcceptMembershipDocument,
  );
}
export const UserPermissionsDocument = gql`
  query userPermissions {
    userPermissions {
      canCreateCGs
      isStaff
    }
  }
`;

export function useUserPermissionsQuery(
  options?: Omit<Urql.UseQueryArgs<UserPermissionsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserPermissionsQuery, UserPermissionsQueryVariables>({
    query: UserPermissionsDocument,
    ...options,
  });
}
