import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { Header, Input } from '../../shared/elements';
import { RepoResults } from './RepoResults';
import { OrgResults } from './OrgResults';

const SearchHeading = styled.div`
  margin-bottom: ${rem(20)};
  margin-top: ${rem(50)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBox = styled(Input)`
  margin-top: ${rem(40)};
  width: ${rem(550)};
`;
const SearchResultsContainer = styled.div``;
const SortingTabs = styled.div``;
const SortSection = styled.div``;

type Props = {
  className?: string;
};

export const SearchResults = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);

  const router = useRouter();

  useEffect(() => {
    if (router.query.q !== debouncedSearch) {
      router.push({
        query: {
          q: debouncedSearch,
        },
      });
    }
  }, [debouncedSearch, router]);

  const searchQuery = router.query.q as string;

  return (
    <>
      <SearchHeading>
        <Header>
          {debouncedSearch ? 'Search results for ' + `"${debouncedSearch}"` : 'Search'}
        </Header>
        <SearchBox
          placeholder={'SEARCH FOR REPOS, GITPOAPS, PEOPLE, & ORGS...'}
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          icon={<FaSearch />}
        />
      </SearchHeading>
      <SearchResultsContainer>
        <SortingTabs>
          <SortSection>
            <RepoResults searchQuery={debouncedSearch} />
          </SortSection>
          <SortSection>
            <OrgResults searchQuery={debouncedSearch} />
          </SortSection>
          <SortSection></SortSection>
        </SortingTabs>
      </SearchResultsContainer>
    </>
  );
};
