import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Exact, SearchForStringQuery } from '../../graphql/generated-gql';
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
  searchQuery: string | undefined,
  result: UseQueryState<SearchForStringQuery, Exact<{ text: string }>>,
): [ProfileResult[], Dispatch<SetStateAction<ProfileResult[]>>] => {
  const [profileResults, setProfileResults] = useState<ProfileResult[]>([]);
  const [generatedProfileResult, setGeneratedProfileResult] = useState<ProfileResult | null>(null);

  /* This hook is used to transform the search results into a list of SearchItems & store the results in state */
  useEffect(() => {
    if (searchQuery && searchQuery.length > 0 && result.data && !result.fetching) {
      const results: ProfileResult[] = result.data.search.profiles.map((profile) => ({
        id: profile.id,
        address: profile.oldAddress,
        href: `/p/${profile.oldAddress}`,
        ensName: profile.oldEnsName ?? null,
        ensAvatarUrl: profile.oldEnsAvatarImageUrl ?? null,
      }));

      setProfileResults(results);
    }
  }, [searchQuery, result, generatedProfileResult]);

  useEffect(() => {
    const prepareGeneratedResult = async () => {
      if (searchQuery && isAddress(searchQuery)) {
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
    };

    prepareGeneratedResult();
  }, [searchQuery]);

  return [profileResults, setProfileResults];
};
