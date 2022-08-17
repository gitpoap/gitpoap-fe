import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../../shared/elements';
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

const SearchResultsContainer = styled.div`
  padding: ${rem(20)};
`;
const SortingTabs = styled.div``;
const SortSection = styled.div``;

type Props = {
  searchQuery: string;
  className?: string;
};

export const SearchResults = ({ searchQuery }: Props) => {
  return (
    <>
      <SearchHeading>
        <Header>{searchQuery ? 'Search results for ' + `"${searchQuery}"` : 'Search'}</Header>
      </SearchHeading>
      <SearchResultsContainer>
        <SortingTabs>
          <SortSection>
            <OrgResults searchQuery={searchQuery} />
          </SortSection>
          <SortSection>
            <RepoResults searchQuery={searchQuery} />
          </SortSection>
          <SortSection>
            <GitPOAPResults searchQuery={searchQuery} />
          </SortSection>
          <SortSection>
            <ProfileResults searchQuery={searchQuery} />
          </SortSection>
        </SortingTabs>
      </SearchResultsContainer>
    </>
  );
};
