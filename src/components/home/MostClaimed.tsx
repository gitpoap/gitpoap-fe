import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../shared/elements/Header';
import { GitPOAP as GitPOAPBadge } from '../shared/compounds/GitPOAP';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useFeatures } from '../FeaturesContext';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { BREAKPOINTS } from '../../constants';
import { useMostClaimedGitPoapsQuery } from '../../graphql/generated-gql';

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
  margin-bottom: ${rem(25)};
  column-gap: ${rem(36)};
  row-gap: ${rem(36)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    justify-content: center;
  }
`;

export const MostClaimed = () => {
  const { hasGitPOAPsPage } = useFeatures();
  const [result] = useMostClaimedGitPoapsQuery({
    variables: {
      count: 10,
    },
  });

  return (
    <Container>
      <Header>{'Most minted GitPOAPs'}</Header>
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
              repoName={item.gitPOAP.project.repos[0].name}
              orgName={item.gitPOAP.project.repos[0].organization.name}
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
