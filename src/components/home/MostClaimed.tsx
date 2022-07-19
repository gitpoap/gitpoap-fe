import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useMediaQuery } from '@mantine/hooks';
import { Header } from '../shared/elements/Header';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { POAPList } from '../shared/compounds/POAPList';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useFeatures } from '../FeaturesContext';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { BREAKPOINTS } from '../../constants';
import { useMostClaimedGitPoapsQuery } from '../../graphql/generated-gql';

const Container = styled.div`
  padding: ${rem(10)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    align-items: center;
    padding: 0;
    max-width: 100%;
  }
`;

const Poaps = styled(POAPList)`
  max-width: ${rem(1000)};
  margin-top: ${rem(50)};
  margin-bottom: ${rem(25)};
`;

export const MostClaimed = () => {
  const { hasGitPOAPsPage } = useFeatures();
  const matchesBreakpointSm = useMediaQuery(`(min-width: ${rem(BREAKPOINTS.sm)})`, false);
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
        {result.data?.mostClaimedGitPOAPs?.slice(0, matchesBreakpointSm ? 10 : 6).map((item, i) => {
          return (
            <GitPOAP
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
