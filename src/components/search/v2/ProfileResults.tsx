import React from 'react';
import styled from 'styled-components';
import { OrgList as OrgListContainer } from '../../shared/compounds/OrgList';
import { useOrgSearchByNameQuery } from '../../../graphql/generated-gql';
import { SearchResultList } from './SearchResultList';
import { OrganizationHex, OrganizationHexSkeleton } from '../../orgs/OrgHex';

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

export const ProfileResults = ({ searchQuery }: Props) => {
  const [result] = useOrgSearchByNameQuery({ variables: { search: searchQuery, take: 6 } });

  const orgs = result.data?.organizations;

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      <SearchResultList title={`${orgs?.length ?? ''} orgs`}>
        <OrgListContainer>
          {result.fetching && !result.operation && (
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
    </Wrapper>
  );
};
