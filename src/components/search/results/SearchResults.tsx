import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  useOrgSearchByNameQuery,
  useRepoSearchByNameQuery,
  useGitPoapSearchByNameQuery,
  useSearchForStringQuery,
} from '../../../graphql/generated-gql';
import { Header } from '../../shared/elements';
import { SearchResultList } from './SearchResultList';
import { OrgList as OrgListContainer } from '../../shared/compounds/OrgList';
import { OrganizationHex, OrganizationHexSkeleton } from '../../orgs/OrgHex';
import { RepoHex, RepoHexSkeleton } from '../../repos/RepoHex';
import { RepoList } from '../../shared/compounds/RepoList';
import { GitPOAP } from '../../shared/compounds/GitPOAP';
import { POAPBadgeSkeleton } from '../../shared/elements/Skeletons';
import { ProfileResultItem } from './ProfileResultItem';
import { useGeneratedProfileResult } from '../useGeneratedProfileResult';

const SearchHeading = styled.div`
  margin-bottom: ${rem(20)};
  margin-top: ${rem(50)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SearchResultsContainer = styled.div`
  padding: ${rem(20)};
`;
const SortingTabs = styled.div``;
const SortSection = styled.div``;

type Props = {
  searchQuery: string;
  className?: string;
};

export const GitPoapList = styled(RepoList)`
  grid-template-columns: repeat(auto-fill, ${rem(160)});
`;

export const SearchResults = ({ searchQuery }: Props) => {
  const [orgResult] = useOrgSearchByNameQuery({ variables: { search: searchQuery, take: 12 } });
  const [repoResult] = useRepoSearchByNameQuery({ variables: { search: searchQuery, take: 8 } });
  const [gitPoapResult] = useGitPoapSearchByNameQuery({
    variables: { search: searchQuery, take: 12 },
  });
  const [profileResult] = useSearchForStringQuery({ variables: { text: searchQuery } });
  const [profileResults, _, areProfileResultsLoading] = useGeneratedProfileResult(
    searchQuery,
    profileResult,
  );

  const orgs = orgResult.data?.organizations;
  const repos = repoResult.data?.repos;
  const gitPOAPS = gitPoapResult.data?.gitPOAPS;

  const orgsLength = orgs?.length ?? 0;
  const reposLength = repos?.length ?? 0;
  const gitPoapsLength = gitPOAPS?.length ?? 0;
  const profilesLength = profileResults?.length ?? 0;

  const isLoading =
    orgResult.fetching ||
    repoResult.fetching ||
    gitPoapResult.fetching ||
    profileResult.fetching ||
    areProfileResultsLoading;
  const hasAnyResults =
    orgsLength > 0 || reposLength > 0 || gitPoapsLength > 0 || profilesLength > 0;

  return (
    <>
      <SearchHeading>
        <Header>
          {!isLoading && !hasAnyResults
            ? `No results found for "${searchQuery}"`
            : `Search results for "${searchQuery}"`}
        </Header>
      </SearchHeading>
      <SearchResultsContainer>
        <SortingTabs>
          <SortSection>
            <SearchResultList
              title={
                profilesLength > 0
                  ? `${profilesLength} ${profilesLength === 1 ? 'profile' : 'profiles'}`
                  : ''
              }
            >
              <OrgListContainer>
                {profileResults &&
                  profileResults.map((profile, i) => {
                    return <ProfileResultItem key={profile.id} addressOrEns={profile.address} />;
                  })}
              </OrgListContainer>
            </SearchResultList>
          </SortSection>
          <SortSection>
            <SearchResultList
              title={
                gitPoapsLength > 0
                  ? `${gitPoapsLength} ${gitPoapsLength === 1 ? 'GitPOAP' : 'GitPOAPs'}`
                  : ''
              }
            >
              <GitPoapList>
                {gitPoapResult.fetching &&
                  !gitPoapResult.operation &&
                  gitPOAPS &&
                  gitPOAPS.length === 0 && (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <POAPBadgeSkeleton
                          key={i}
                          style={{ marginTop: rem(30), marginRight: rem(40) }}
                        />
                      ))}
                    </>
                  )}
                {gitPOAPS &&
                  gitPOAPS.map((gitPOAP, i) => (
                    <GitPOAP
                      key={gitPOAP.id + '-' + i}
                      gitPOAPId={gitPOAP.id}
                      imgSrc={gitPOAP.imageUrl}
                      name={gitPOAP.name}
                      repoName={gitPOAP.project.repos[0].name}
                      orgName={gitPOAP.project.repos[0].organization.name}
                    />
                  ))}
              </GitPoapList>
            </SearchResultList>
          </SortSection>
          <SortSection>
            <SearchResultList
              title={
                reposLength > 0 ? `${reposLength} ${reposLength === 1 ? 'repo' : 'repos'}` : ''
              }
            >
              <OrgListContainer>
                {repoResult.fetching && !repoResult.operation && repos && repos.length === 0 && (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <RepoHexSkeleton key={i} />
                    ))}
                  </>
                )}
                {repos &&
                  repos.map((repo, i) => {
                    return <RepoHex key={'repo-' + i} repo={repo} />;
                  })}
              </OrgListContainer>
            </SearchResultList>
          </SortSection>
          <SortSection>
            <SearchResultList
              title={
                orgsLength > 0
                  ? `${orgsLength} ${orgsLength === 1 ? 'organization' : 'organizations'}`
                  : ''
              }
            >
              <OrgListContainer>
                {orgResult.fetching && !orgResult.operation && (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <OrganizationHexSkeleton key={i} />
                    ))}
                  </>
                )}
                {orgs &&
                  orgs.map((org, i) => {
                    return <OrganizationHex key={'org-' + i} org={org} />;
                  })}
              </OrgListContainer>
            </SearchResultList>
          </SortSection>
        </SortingTabs>
      </SearchResultsContainer>
    </>
  );
};
