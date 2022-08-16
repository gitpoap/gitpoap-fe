import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { SearchResultList } from './SearchResultList';
import { POAPBadgeSkeleton } from '../../shared/elements/Skeletons';
import { useGitPoapSearchByNameQuery } from '../../../graphql/generated-gql';
import { GitPOAP } from '../../shared/compounds/GitPOAP';
import { OrgList as OrgListContainer } from '../../shared/compounds/OrgList';

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

export const GitPOAPResults = ({ searchQuery }: Props) => {
  const [result] = useGitPoapSearchByNameQuery({ variables: { search: searchQuery, take: 12 } });

  const gitPOAPS = result.data?.gitPOAPS;
  const length = gitPOAPS?.length ?? 0;

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      <SearchResultList title={`${length} ${length === 1 ? 'GitPOAP' : 'GitPOAPs'}`}>
        <OrgListContainer>
          {result.fetching && !result.operation && gitPOAPS && gitPOAPS.length === 0 && (
            <>
              {[...Array(4)].map((_, i) => (
                <POAPBadgeSkeleton key={i} style={{ marginTop: rem(30), marginRight: rem(40) }} />
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
        </OrgListContainer>
      </SearchResultList>
    </Wrapper>
  );
};
