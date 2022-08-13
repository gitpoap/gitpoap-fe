import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isAddress } from 'ethers/lib/utils';
import { OrgList as OrgListContainer } from '../../shared/compounds/OrgList';
import { useSearchForStringQuery } from '../../../graphql/generated-gql';
import { SearchResultList } from './SearchResultList';
import { OrganizationHex, OrganizationHexSkeleton } from '../../orgs/OrgHex';
import { useWeb3Context } from '../../wallet/Web3ContextProvider';

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  className?: string;
  searchQuery: string;
};

type ProfileResult = {
  id: number;
  address: string;
  href: string;
  ensName?: string;
};

export const ProfileResults = ({ searchQuery }: Props) => {
  const { web3Provider, infuraProvider } = useWeb3Context();

  const [profileResults, setProfileResults] = useState<ProfileResult[]>([]);
  const [areResultsLoading, setAreResultsLoading] = useState(false);

  const [result] = useSearchForStringQuery({ variables: { text: searchQuery } });

  /* This hook is used to transform the search results into a list of SearchItems & store the results in state */
  useEffect(() => {
    const prepareResults = async () => {
      if (searchQuery?.length > 0) {
        setAreResultsLoading(true);
        let results: ProfileResult[] = [];
        if (result.data?.search.profilesByAddress) {
          const profilesByAddress = result.data.search.profilesByAddress.map((profile) => ({
            id: profile.id,
            address: profile.address,
            href: `/p/${profile.address}`,
          }));

          results = [...profilesByAddress];
        }
        if (result.data?.search.profileByENS) {
          const profileByENSData = result.data?.search.profileByENS;
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
  }, [searchQuery, result.data, web3Provider, infuraProvider]);

  if (result.error) {
    return null;
  }

  console.log('profileResults', profileResults);

  return (
    <Wrapper>
      <SearchResultList title={`${profileResults?.length ?? ''} contributors`}>
        <OrgListContainer>
          {/* {result.fetching && !result.operation && (
            <>
              {[...Array(4)].map((_, i) => (
                <OrganizationHexSkeleton key={i} />
              ))}
            </>
          )}
          {orgs &&
            orgs.map((org, i) => {
              return <OrganizationHex key={'org-' + i} org={org} />;
            })} */}
        </OrgListContainer>
      </SearchResultList>
    </Wrapper>
  );
};
