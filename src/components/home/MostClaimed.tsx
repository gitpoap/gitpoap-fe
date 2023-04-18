import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Stack } from '@mantine/core';
import { Header } from '../shared/elements/Header';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { BREAKPOINTS } from '../../constants';
import { useMostClaimedGitPoapsQuery } from '../../graphql/generated-gql';
import { Link } from '../shared/compounds/Link';

const Container = styled(Stack)`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    align-items: center;
  }
`;

const MostClaimedList = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: ${rem(25)};
  margin-top: ${rem(12)};

  // justify-content: center;
  // align-content: center;
  // align-items: flex-start;

  // @media (max-width: ${BREAKPOINTS.sm}px) {
  // }

  grid-template-columns: repeat(auto-fit, minmax(${rem(162)}, 1fr));
  column-gap: ${rem(24)};
  row-gap: ${rem(24)};
`;

export const MostClaimed = () => {
  const [result] = useMostClaimedGitPoapsQuery({
    variables: {
      count: 8,
    },
  });

  return (
    <Container>
      <Header>{'Most minted GitPOAPs'}</Header>
      <MostClaimedList>
        {result.fetching && !result.operation && (
          <>
            {[...Array(4)].map((_, i) => {
              return <POAPBadgeSkeleton key={i} sx={{ margin: 'auto' }} />;
            })}
          </>
        )}

        {result.data?.mostClaimedGitPOAPs &&
          result.data?.mostClaimedGitPOAPs.map((item, i) => (
            <GitPOAP
              gitPOAPId={item.gitPOAP.id}
              imgSrc={item.event.image_url}
              name={item.event.name}
              repoName={item.gitPOAP.project?.repos[0].name}
              orgName={item.gitPOAP.project?.repos[0].organization.name}
              key={item.gitPOAP.id + '-' + i}
            />
          ))}
      </MostClaimedList>
      <Link href={'/gitpoaps'}>
        <Button variant="outline" rightIcon={<FaArrowRight />}>
          {'ALL GITPOAPS'}
        </Button>
      </Link>
    </Container>
  );
};
