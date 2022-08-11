import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { Header, Input } from '../../shared/elements';
import { ProfileResults } from './ProfileResults';
import { RepoResults } from './RepoResults';
import { OrgResults } from './OrgResults';
import { GitPOAPResults } from './GitPOAPResults';

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
  searchQuery: string;
  className?: string;
};

export const SearchResults = ({ searchQuery }: Props) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(searchQuery);
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery !== debouncedSearch) {
      router.push(`/s/${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    e.preventDefault();
  };

  return (
    <>
      <SearchHeading>
        <Header>
          {debouncedSearch ? 'Search results for ' + `"${debouncedSearch}"` : 'Search'}
        </Header>
        <SearchBox
          placeholder={'SEARCH FOR REPOS, GITPOAPS, PEOPLE, & ORGS...'}
          value={searchValue}
          onChange={handleChange}
          icon={<FaSearch />}
        />
      </SearchHeading>
      <SearchResultsContainer>
        <SortingTabs>
          <SortSection>
            <ProfileResults searchQuery={debouncedSearch} />
          </SortSection>
          <SortSection>
            <RepoResults searchQuery={debouncedSearch} />
          </SortSection>
          <SortSection>
            <OrgResults searchQuery={debouncedSearch} />
          </SortSection>
          <SortSection>
            <GitPOAPResults searchQuery={debouncedSearch} />
          </SortSection>
        </SortingTabs>
      </SearchResultsContainer>
    </>
  );
};
