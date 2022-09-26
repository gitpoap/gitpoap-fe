import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Exact, SearchForStringQuery } from '../../graphql/generated-gql';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { isAddress } from 'ethers/lib/utils';
import { UseQueryState } from 'urql';

type ProfileResult = {
  id: number;
  address: string;
  href: string;
  ensName: string | null;
  ensAvatarUrl: string | null;
  useDefaultImageTag?: boolean;
};

export const useGeneratedProfileResult = (
  searchQuery: string,
  result: UseQueryState<SearchForStringQuery, Exact<{ text: string }>>,
): [ProfileResult[], Dispatch<SetStateAction<ProfileResult[]>>, boolean] => {
  const { web3Provider, infuraProvider } = useWeb3Context();
  const [profileResults, setProfileResults] = useState<ProfileResult[]>([]);
  const [generatedProfileResult, setGeneratedProfileResult] = useState<ProfileResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /* This hook is used to transform the search results into a list of SearchItems & store the results in state */
  useEffect(() => {
    if (searchQuery.length > 0 && result.data && !result.fetching) {
      let results: ProfileResult[] = [];
      const addresses = new Set<string>();
      if (result.data?.search.profilesByAddress) {
        const profilesByAddress: ProfileResult[] = result.data.search.profilesByAddress
          .filter((profile) => {
            if (profile && profile.oldAddress && !addresses.has(profile.oldAddress)) {
              addresses.add(profile.oldAddress);
              return true;
            }
            return false;
          })
          .map((profile) => ({
            id: profile.id,
            address: profile.oldAddress,
            href: `/p/${profile.oldAddress}`,
            ensName: profile.oldEnsName ?? null,
            ensAvatarUrl: profile.oldEnsAvatarImageUrl ?? null,
          }));

        results = [...profilesByAddress];
      }
      if (result.data?.search.profilesByENS) {
        const profilesByENSData: ProfileResult[] = result.data?.search.profilesByENS
          .filter((profile) => {
            if (profile && profile.oldAddress && !addresses.has(profile.oldAddress)) {
              addresses.add(profile.oldAddress);
              return true;
            }
            return false;
          })
          .map((profile) => ({
            id: profile.id,
            address: profile.oldAddress,
            href: `/p/${profile.oldAddress}`,
            ensName: profile.oldEnsName ?? null,
            ensAvatarUrl: profile.oldEnsAvatarImageUrl ?? null,
          }));

        results = [...profilesByENSData, ...results];
      }

      /* If we don't get any results via graphql, but we have a generated profile result, add it here */
      if (results.length === 0 && generatedProfileResult) {
        results = [generatedProfileResult, ...results];
      }

      setProfileResults(results);
    }
  }, [searchQuery, result, generatedProfileResult]);

  useEffect(() => {
    const prepareResultsEns = async () => {
      /* Deal with the situation of an .eth name OR address that isn't explicitly found in the search results */
      if (searchQuery.endsWith('.eth')) {
        setIsLoading(true);
        const [address, avatar] = await Promise.all([
          await (web3Provider ?? infuraProvider)?.resolveName(searchQuery),
          await (web3Provider ?? infuraProvider)?.getAvatar(searchQuery),
        ]);

        const ensName = searchQuery;
        if (address) {
          setGeneratedProfileResult({
            id: 0,
            address,
            ensName: ensName,
            href: `/p/${ensName}`,
            ensAvatarUrl: avatar ?? null,
            /*
             * IMPORTANT: This is required since we don't know what URL will be returned & NextJS Images
             * require whitelisted addresses for optimization purposes
             */
            useDefaultImageTag: true,
          });
        }
      } else if (isAddress(searchQuery)) {
        const address = searchQuery;
        setGeneratedProfileResult({
          id: 0,
          address,
          href: `/p/${address}`,
          ensAvatarUrl: null,
          ensName: null,
        });
      } else {
        setGeneratedProfileResult(null);
      }
      setIsLoading(false);
    };

    prepareResultsEns();
  }, [searchQuery, web3Provider, infuraProvider]);

  return [profileResults, setProfileResults, isLoading];
};
