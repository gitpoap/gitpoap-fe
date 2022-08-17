import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { SearchResultList } from './SearchResultList';
import { POAPBadgeSkeleton } from '../../shared/elements/Skeletons';
import { useGitPoapSearchByNameQuery } from '../../../graphql/generated-gql';
import { GitPOAP } from '../../shared/compounds/GitPOAP';
import { RepoList } from '../../shared/compounds/RepoList';

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GitPoapList = styled(RepoList)`
  grid-template-columns: repeat(auto-fill, ${rem(160)});
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
        <GitPoapList>
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
        </GitPoapList>
      </SearchResultList>
    </Wrapper>
  );
};
