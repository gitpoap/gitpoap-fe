import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { getHotkeyHandler, useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { isAddress } from 'ethers/lib/utils';
import { Text } from '@mantine/core';
import { rem } from 'polished';
import { Loader, Input, Tooltip } from '../shared/elements';
import { GitPOAPBadgeSearchItem, NoResultsSearchItem, ProfileSearchItem } from './SearchItem';
import { BackgroundPanel2, TextGray, DarkGray } from '../../colors';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import {
  useOrgSearchByNameQuery,
  useRepoSearchByNameQuery,
  useSearchForStringQuery,
  useGitPoapSearchByNameQuery,
} from '../../graphql/generated-gql';
import { BREAKPOINTS } from '../../constants';

const Container = styled.div<{ isActive: boolean }>`
  margin-right: ${rem(25)};
  width: ${rem(300)};
  position: relative;
  min-width: ${rem(240)};
  transition: width 200ms ease-in-out;

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    width: ${rem(240)};
  }

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    width: 100%;
  }

  /* Any screen width ABOVE breakpoint XL */
  @media (min-width: ${rem(BREAKPOINTS.xl)}) {
    ${({ isActive }) => (isActive ? `width: ${rem(400)};` : null)}
  }
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
  padding: ${rem(10)} 0;
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  top: ${rem(45)};
  left: 0;
  width: inherit;
  min-width: inherit;
  background-color: ${BackgroundPanel2};
  z-index: 1;
  border-radius: ${rem(6)};
`;

const ResultsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:not(:first-child) {
    margin-top: ${rem(15)};
  }
`;

const SectionTitle = styled(Text)`
  padding-left: ${rem(10)};
  font-family: 'PT Mono';
  line-height: ${rem(15)};
  color: ${TextGray};
  font-size: ${rem(11)};
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: ${rem(5)};
  letter-spacing: ${rem(2)};
`;

const InputHintText = styled(Text)`
  width: ${rem(25)};
  text-align: center;
  font-size: ${rem(10)};
  border-radius: ${rem(4)};
  padding: ${rem(3)};
  background-color: ${DarkGray};
  color: ${TextGray};
  cursor: help;
`;

type ProfileResult = {
  id: number;
  address: string;
  href: string;
  ensName?: string;
  ensAvatarImageUrl: string | null;
};

type Props = {
  className?: string;
};

type InputHintSectionProps = {
  isFocused: boolean;
};

const InputHintSection = ({ isFocused }: InputHintSectionProps) => (
  <Tooltip
    label={
      isFocused
        ? 'Press ESC to get out of the search box'
        : 'Press / to set focus on the search box'
    }
    position="top"
    withArrow
    transition="pop-bottom-right"
  >
    <InputHintText>{isFocused ? 'ESC' : '/'}</InputHintText>
  </Tooltip>
);

export const SearchBox = ({ className }: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { web3Provider, infuraProvider } = useWeb3Context();
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [profileResults, setProfileResults] = useState<ProfileResult[]>([]);
  const [areResultsLoading, setAreResultsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number>(-1);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const isSlashPressed = useKeyPress({ targetKey: '/' });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([inputRef, resultsRef], () => setIsSearchActive(false));
  const [result, refetchProfiles] = useSearchForStringQuery({
    pause: true,
    variables: {
      text: debouncedQuery.trim(),
    },
  });
  const [repoResults] = useRepoSearchByNameQuery({
    variables: { search: debouncedQuery.trim() },
  });
  const [orgResults, refetchOrgs] = useOrgSearchByNameQuery({
    pause: true,
    variables: { search: debouncedQuery.trim() },
  });
  const [gitPOAPResults, refetchGitPoaps] = useGitPoapSearchByNameQuery({
    pause: true,
    variables: {
      search: debouncedQuery.trim(),
    },
  });

  const repos = repoResults.data?.repos;
  const orgs = orgResults.data?.organizations;
  const gitPOAPs = gitPOAPResults.data?.gitPOAPS;
  const isLoading =
    result.fetching ||
    repoResults.fetching ||
    orgResults.fetching ||
    gitPOAPResults.fetching ||
    areResultsLoading;
  const hasAnyResults =
    profileResults.length > 0 ||
    (repos && repos?.length > 0) ||
    (orgs && orgs?.length > 0) ||
    (gitPOAPs && gitPOAPs?.length > 0);

  /* Sort orgs based on the most recent repo update time */
  const sortedOrgs = orgs?.sort((a, b) => {
    if (a.repos[0].lastPRUpdatedAt < b.repos[0].lastPRUpdatedAt) {
      return 1;
    }
    if (a.repos[0].lastPRUpdatedAt > b.repos[0].lastPRUpdatedAt) {
      return -1;
    }
    return 0;
  });

  /* auto complete list counts */
  const profilesCount = profileResults.length < 4 ? profileResults.length : 4;
  const reposCount = repos?.length ?? 0;
  const orgsCount = orgs?.length ?? 0;
  const gitPOAPCount = gitPOAPs?.length ?? 0;
  const repoStartIndex = profilesCount + gitPOAPCount;
  const orgStartIndex = profilesCount + gitPOAPCount + reposCount;
  const totalCount = profilesCount + gitPOAPCount + reposCount + orgsCount;

  /* This hook is used to transform the search results into a list of SearchItems & store the results in state */
  useEffect(() => {
    const prepareResults = async () => {
      if (debouncedQuery.length > 0) {
        setAreResultsLoading(true);
        let results: ProfileResult[] = [];
        if (result.data?.search.profilesByAddress) {
          const profilesByAddress = result.data.search.profilesByAddress.map((profile) => ({
            id: profile.id,
            address: profile.address,
            href: `/p/${profile.address}`,
            ensAvatarImageUrl: profile.ensAvatarImageUrl ?? null,
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
            ensAvatarImageUrl: profileByENSData.profile.ensAvatarImageUrl ?? null,
          };

          results = [profileByENS, ...results];
        }

        /* Deal with the situation of an .eth name OR address that isn't explicitly found in the search results */
        if (results.length === 0) {
          if (debouncedQuery.endsWith('.eth')) {
            const [address, avatar] = await Promise.all([
              await (web3Provider ?? infuraProvider)?.resolveName(debouncedQuery),
              await (web3Provider ?? infuraProvider)?.getAvatar(debouncedQuery),
            ]);
            const ensName = debouncedQuery;
            if (address) {
              results = [
                {
                  id: 0,
                  address,
                  ensName: ensName,
                  href: `/p/${ensName}`,
                  ensAvatarImageUrl: avatar ?? null,
                },
              ];
            }
          } else if (isAddress(debouncedQuery)) {
            const address = debouncedQuery;
            results = [
              {
                id: 0,
                address,
                href: `/p/${address}`,
                ensAvatarImageUrl: null,
              },
            ];
          }
        }
        setAreResultsLoading(false);
        setProfileResults(results);
      }
    };

    prepareResults();
  }, [debouncedQuery, result.data, web3Provider, infuraProvider]);

  /* This hook is used to refetch search data when the debounced query changes */
  useEffect(() => {
    if (debouncedQuery.length >= 1) {
      if (refetchProfiles) {
        refetchProfiles();
      }
      if (refetchOrgs) {
        refetchOrgs();
      }
      if (refetchGitPoaps) {
        refetchGitPoaps();
      }
    }
  }, [debouncedQuery, refetchProfiles, refetchOrgs, refetchGitPoaps]);

  /* This hook is used to clear stored results to ensure no random autocomplete flashes - urql caches results ~ so 🤪 */
  useEffect(() => {
    setProfileResults([]);
    setCursor(-1);
  }, [query, debouncedQuery]);

  /* This hook is used to set focus on search input */
  useEffect(() => {
    if (isSlashPressed) {
      setCursor(-1);
      inputRef.current?.focus();
    }
  }, [isSlashPressed]);

  /* Handle keydown on search input box */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // arrow up/down button should select next/previous list element
      if (e.code === 'ArrowUp' && cursor > -1) {
        setCursor((prevCursor) => prevCursor - 1);
        e.preventDefault();
      } else if (e.code === 'ArrowDown' && cursor < totalCount - 1) {
        setCursor((prevCursor) => prevCursor + 1);
        e.preventDefault();
      } else if (e.code === 'Enter' && cursor > -1) {
        setQuery('');
        setIsSearchActive(false);
        setProfileResults([]);

        if (cursor < profilesCount) {
          /* profile is selected */
          inputRef.current?.blur();
          router.push(profileResults[cursor].href);
        } else if (cursor < repoStartIndex) {
          /* gitPOAP is selected */
          inputRef.current?.blur();
          const gitPOAPIndex = cursor - profilesCount;
          const gitPOAP = gitPOAPs && gitPOAPs[gitPOAPIndex];
          router.push(`/gp/${gitPOAP?.id}`);
        } else if (cursor < orgStartIndex) {
          /* repo is selected */
          inputRef.current?.blur();
          const repoIndex = cursor - repoStartIndex;
          const repo = repos && repos[repoIndex];
          router.push(`/gh/${repo?.organization.name}/${repo?.name}`);
        } else {
          /* org is selected */
          inputRef.current?.blur();
          const orgIndex = cursor - orgStartIndex;
          const org = orgs && orgs[orgIndex];
          router.push(`/gh/${org?.name}`);
        }
        e.preventDefault();
      }
    },
    [cursor, profilesCount, orgStartIndex, totalCount],
  );

  return (
    <Container
      className={className}
      onFocus={() => setIsSearchActive(true)}
      onKeyDown={getHotkeyHandler([
        [
          'Escape',
          () => {
            setIsSearchActive(false);
            inputRef.current?.blur();
          },
        ],
        [
          'Enter',
          () => {
            if (!query) return;
            setIsSearchActive(false);
            inputRef.current?.blur();
            router.push(`/s/${query}`);
          },
        ],
      ])}
      isActive={isSearchActive}
    >
      <SearchInput
        inputRef={inputRef}
        placeholder={'POAP.ETH OR 0xf6B6...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={isLoading ? <Loader size={18} /> : <FaSearch />}
        onKeyDown={handleKeyDown}
        rightSection={<InputHintSection isFocused={isSearchInputFocused} />}
        onFocus={() => setIsSearchInputFocused(true)}
        onBlur={() => setIsSearchInputFocused(false)}
      />

      {isSearchActive && (
        <Results ref={resultsRef}>
          {profileResults.length > 0 && (
            <ResultsSection>
              <SectionTitle>{'Profiles:'}</SectionTitle>
              {profileResults.slice(0, 4).map((profile, index) => {
                return (
                  <ProfileSearchItem
                    key={profile.id}
                    href={profile.href}
                    address={profile.address}
                    ensName={profile.ensName}
                    ensAvatarImageUrl={profile.ensAvatarImageUrl}
                    onClick={() => {
                      setQuery('');
                      setIsSearchActive(false);
                      setProfileResults([]);
                    }}
                    isSelected={cursor === index}
                  />
                );
              })}
            </ResultsSection>
          )}
          {gitPOAPs && gitPOAPs?.length > 0 && (
            <ResultsSection>
              <SectionTitle>{'GitPOAPs:'}</SectionTitle>
              {gitPOAPs.map((gitPOAP, index) => {
                return (
                  <GitPOAPBadgeSearchItem
                    key={gitPOAP.id}
                    href={`/gp/${gitPOAP.id}`}
                    text={
                      gitPOAP.name.startsWith('GitPOAP: ') ? gitPOAP.name.slice(8) : gitPOAP.name
                    }
                    onClick={() => {
                      setQuery('');
                      setIsSearchActive(false);
                      setProfileResults([]);
                    }}
                    imageUrl={gitPOAP.imageUrl}
                    isSelected={cursor === profilesCount + index}
                  />
                );
              })}
            </ResultsSection>
          )}
          {repos && repos?.length > 0 && (
            <ResultsSection>
              <SectionTitle>{'Repos:'}</SectionTitle>
              {repos.map((repo, index) => {
                return (
                  <GitPOAPBadgeSearchItem
                    key={repo.id}
                    href={`/gh/${repo.organization.name}/${repo.name}`}
                    text={repo.name}
                    subText={repo.organization.name}
                    imageUrl={repo.project.gitPOAPs[0].imageUrl}
                    onClick={() => {
                      setQuery('');
                      setIsSearchActive(false);
                      setProfileResults([]);
                    }}
                    isSelected={cursor === repoStartIndex + index}
                  />
                );
              })}
            </ResultsSection>
          )}
          {sortedOrgs && sortedOrgs?.length > 0 && (
            <ResultsSection>
              <SectionTitle>{'Orgs:'}</SectionTitle>
              {sortedOrgs.map((org, index) => {
                return (
                  <GitPOAPBadgeSearchItem
                    key={org.id}
                    href={`/gh/${org.name}`}
                    text={org.name}
                    onClick={() => {
                      setQuery('');
                      setIsSearchActive(false);
                      setProfileResults([]);
                    }}
                    imageUrl={org.repos[0].project.gitPOAPs[0].imageUrl}
                    isSelected={cursor === orgStartIndex + index}
                  />
                );
              })}
            </ResultsSection>
          )}
          {!isLoading && !hasAnyResults && debouncedQuery.length > 1 && (
            <ResultsSection>
              <NoResultsSearchItem />
            </ResultsSection>
          )}
        </Results>
      )}
    </Container>
  );
};
