import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { Header } from '../shared/elements/Header';
import { GitPOAP as GitPOAPUI } from '../shared/compounds/GitPOAP';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useFeatures } from '../FeaturesContext';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${rem(10)};
`;

const Poaps = styled.div`
  display: inline-flex;
  flex-direction: row;
  max-width: ${rem(1000)};
  flex-wrap: wrap;
  margin-top: ${rem(50)};
  margin-bottom: ${rem(50)};
`;

const GitPOAPBadge = styled(GitPOAPUI)`
  margin-right: ${rem(36)};
  margin-bottom: ${rem(36)};
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
  query mostClaimedGitPoaps {
    mostClaimedGitPOAPs(count: 10) {
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

export const MostClaimed = () => {
  const { hasGitPOAPsPage } = useFeatures();
  const [result] = useQuery<{
    mostClaimedGitPOAPs: MostClaimedItem[];
  } | null>({
    query: MostClaimedQuery,
  });

  if (!result.data) {
    return null;
  }

  return (
    <Container>
      <Header>{'Most claimed GitPOAPs'}</Header>

      <Poaps>
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
      {hasGitPOAPsPage && (
        <Button variant="outline" rightIcon={<FaArrowRight />}>
          {'ALL GitPOAPS'}
        </Button>
      )}
    </Container>
  );
};
