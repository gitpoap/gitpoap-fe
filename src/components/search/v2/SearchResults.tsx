import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { isAddress } from 'ethers/lib/utils';
import { rem } from 'polished';
import {
  useOrgSearchByNameQuery,
  useRepoSearchByNameQuery,
  useGitPoapSearchByNameQuery,
  useSearchForStringQuery,
} from '../../../graphql/generated-gql';
import { useWeb3Context } from '../../wallet/Web3ContextProvider';
import { Header } from '../../shared/elements';
import { SearchResultList } from './SearchResultList';
import { OrgList as OrgListContainer } from '../../shared/compounds/OrgList';
import { OrganizationHex, OrganizationHexSkeleton } from '../../orgs/OrgHex';
import { RepoHex, RepoHexSkeleton } from '../../repos/RepoHex';
import { RepoList } from '../../shared/compounds/RepoList';
import { GitPOAP } from '../../shared/compounds/GitPOAP';
import { POAPBadgeSkeleton } from '../../shared/elements/Skeletons';
import { ProfileResultItem } from './ProfileResultItem';

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

type ProfileResult = {
  id: number;
  address: string;
  href: string;
  ensName?: string;
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
  const { web3Provider, infuraProvider } = useWeb3Context();

  const [profileResults, setProfileResults] = useState<ProfileResult[]>([]);
  const [areResultsLoading, setAreResultsLoading] = useState(false);

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
    areResultsLoading;
  const hasAnyResults =
    orgsLength > 0 || reposLength > 0 || gitPoapsLength > 0 || profilesLength > 0;

  /* This hook is used to transform the search results into a list of SearchItems & store the results in state */
  useEffect(() => {
    const prepareResults = async () => {
      if (searchQuery?.length > 0) {
        setAreResultsLoading(true);
        let results: ProfileResult[] = [];
        if (profileResult.data?.search.profilesByAddress) {
          const profilesByAddress = profileResult.data.search.profilesByAddress.map((profile) => ({
            id: profile.id,
            address: profile.address,
            href: `/p/${profile.address}`,
          }));

          results = [...profilesByAddress];
        }
        if (profileResult.data?.search.profileByENS) {
          const profileByENSData = profileResult.data?.search.profileByENS;
          const profileByENS = {
            id: profileByENSData.profile.id,
            address: profileByENSData.profile.address,
            href: `/p/${profileByENSData.ens}`,
            ensName: profileByENSData.ens,
          };

          results = [profileByENS, ...results];
        }

        /* Deal with the situation of an .eth name OR address that isn't explicitly found in the search results */
        if (results.length === 0) {
          if (searchQuery.endsWith('.eth')) {
            const address = await (web3Provider ?? infuraProvider)?.resolveName(searchQuery);
            const ensName = searchQuery;
            if (address) {
              results = [
                {
                  id: 0,
                  address,
                  ensName: ensName,
                  href: `/p/${ensName}`,
                },
              ];
            }
          } else if (isAddress(searchQuery)) {
            const address = searchQuery;
            results = [
              {
                id: 0,
                address,
                href: `/p/${address}`,
              },
            ];
          }
        }
        setAreResultsLoading(false);
        setProfileResults(results);
      }
    };

    prepareResults();
  }, [searchQuery, profileResult.data, web3Provider, infuraProvider]);

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
