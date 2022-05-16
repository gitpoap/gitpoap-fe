import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDebouncedValue } from '@mantine/hooks';
import { isAddress } from 'ethers/lib/utils';
import { FaSearch } from 'react-icons/fa';
import { Loader } from '../shared/elements/Loader';
import { rem } from 'polished';
import { Input } from '../shared/elements/Input';
import { SearchItem } from './SearchItem';
import { BackgroundPanel, TextGray } from '../../colors';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { useSearchForStringQuery } from '../../graphql/generated-gql';

type Props = {
  className?: string;
};

type Result = {
  id: number;
  text: string;
  href: string;
  name?: string;
};

const Container = styled.div`
  position: relative;
  min-width: ${rem(240)};
`;

const SearchInput = styled(Input)`
  width: inherit;
  min-width: inherit;
  .mantine-TextInput-input {
    &::placeholder {
      color: ${TextGray};
      text-transform: uppercase;
    }
  }
`;

const Results = styled.div`
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  top: ${rem(45)};
  left: 0;
  width: inherit;
  min-width: inherit;
  padding: ${rem(6)} ${rem(6)} ${rem(6)} ${rem(6)};
  background-color: ${BackgroundPanel};
  z-index: 1;
  border-radius: ${rem(6)};
`;

export const SearchBox = ({ className }: Props) => {
  const maxResults = 5;
  const [query, setQuery] = useState('');
  const { web3Provider, infuraProvider } = useWeb3Context();
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [areResultsLoading, setAreResultsLoading] = useState(false);
  const [areResultsVisible, setAreResultsVisible] = useState<boolean>(false);
  const [result, refetch] = useSearchForStringQuery({
    pause: true,
    variables: {
      text: debouncedQuery,
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([inputRef, resultsRef], () => setAreResultsVisible(false));

  /* This hook is used to transform the search results into a list of SearchItems & store the results in state */
  useEffect(() => {
    const prepareResults = async () => {
      if (debouncedQuery.length > 0) {
        setAreResultsLoading(true);
        let results: Result[] = [];
        if (result.data?.search.profilesByAddress) {
          const profilesByAddress = result.data.search.profilesByAddress.map((profile) => ({
            id: profile.id,
            text: profile.address,
            href: `/p/${profile.address}`,
          }));

          results = [...profilesByAddress];
        }
        if (result.data?.search.profileByENS) {
          const profileByENSData = result.data?.search.profileByENS;
          const profileByENS = {
            id: profileByENSData.profile.id,
            text: profileByENSData.profile.address,
            href: `/p/${profileByENSData.ens}`,
            name: profileByENSData.ens,
          };

          results = [profileByENS, ...results];
        }

        if (results.length === 0) {
          if (debouncedQuery.endsWith('.eth')) {
            const address = await (web3Provider ?? infuraProvider)?.resolveName(debouncedQuery);
            if (address) {
              results = [
                {
                  id: 0,
                  text: debouncedQuery,
                  name: debouncedQuery,
                  href: `/p/${debouncedQuery}`,
                },
              ];
            }
          } else if (isAddress(debouncedQuery)) {
            results = [
              {
                id: 0,
                text: debouncedQuery,
                href: `/p/${debouncedQuery}`,
              },
            ];
          }
        }
        setAreResultsLoading(false);
        setSearchResults(results);
      }
    };

    prepareResults();
  }, [debouncedQuery, result.data, web3Provider, infuraProvider]);

  /* This hook is used to refetch data when the debounced query changes */
  useEffect(() => {
    if (debouncedQuery.length > 1 && refetch) {
      refetch();
    }
  }, [debouncedQuery, refetch]);

  /* This hook is used to clear stored results to ensure no random autocomplete flashes - urql caches results ~ so 🤪 */
  useEffect(() => {
    setSearchResults([]);
  }, [query, debouncedQuery]);

  return (
    <Container className={className} onFocus={() => setAreResultsVisible(true)}>
      <SearchInput
        inputRef={inputRef}
        placeholder={'POAP.ETH OR 0xf6B6...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={result.fetching || areResultsLoading ? <Loader size={18} /> : <FaSearch />}
      />

      {areResultsVisible && searchResults.length > 0 && debouncedQuery.length > 0 && (
        <Results ref={resultsRef}>
          {searchResults.slice(0, maxResults).map((profile, i) => {
            return (
              <SearchItem
                key={i}
                href={profile.href}
                text={profile.name ?? profile.text}
                onClick={() => {
                  setQuery('');
                  setAreResultsVisible(false);
                  setSearchResults([]);
                }}
              />
            );
          })}
        </Results>
      )}
    </Container>
  );
};
