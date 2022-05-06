import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { Header } from '../shared/elements/Header';
import { GitPOAP as GitPOAPBadge } from '../shared/compounds/GitPOAP';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useFeatures } from '../FeaturesContext';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { BREAKPOINTS } from '../../constants';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${rem(10)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    align-items: center;
  }
`;

const Poaps = styled.div`
  display: inline-flex;
  flex-direction: row;
  max-width: ${rem(1000)};
  flex-wrap: wrap;
  margin-top: ${rem(50)};
  margin-bottom: ${rem(50)};
  column-gap: ${rem(36)};
  row-gap: ${rem(36)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    justify-content: center;
  }
`;

export type MostClaimedItem = {
  claimsCount: number;
  gitPOAP: {
    id: number;
    repo: {
      name: string;
    };
  };
  event: {
    name: string;
    image_url: string;
  };
};

const MostClaimedQuery = gql`
  query mostClaimedGitPoaps($repoId: Float!) {
    mostClaimedGitPOAPs(count: 10, repoId: $repoId) {
      claimsCount
      gitPOAP {
        id
        repo {
          name
        }
      }
      event {
        name
        image_url
      }
    }
  }
`;

export type GitPOAPsProps = {
  repoId: number;
};

export const GitPOAPs = ({ repoId }: GitPOAPsProps) => {
  const [result] = useQuery<{
    mostClaimedGitPOAPs: MostClaimedItem[];
  } | null>({
    query: MostClaimedQuery,
    variables: {
      repoId,
    },
  });

  return (
    <Container>
      <Header>{'GitPOAPs'}</Header>
      <Poaps>
        {result.fetching && !result.operation && (
          <>
            {[...Array(5)].map((_, i) => {
              return (
                <POAPBadgeSkeleton key={i} style={{ marginTop: rem(30), marginRight: rem(40) }} />
              );
            })}
          </>
        )}
        {result.data?.mostClaimedGitPOAPs?.map((item, i) => {
          return (
            <GitPOAPBadge
              key={item.gitPOAP.id + '-' + i}
              gitPOAPId={item.gitPOAP.id}
              imgSrc={item.event.image_url}
              name={item.event.name}
              orgName={item.gitPOAP.repo.name}
            />
          );
        })}
      </Poaps>
    </Container>
  );
};
