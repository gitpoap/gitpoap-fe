import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { Header } from '../shared/elements/Header';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { BREAKPOINTS } from '../../constants';
import { useMostClaimedGitPoapsQuery } from '../../graphql/generated-gql';
import { Link } from '../shared/compounds/Link';

const Container = styled.div`
  padding: ${rem(10)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    align-items: center;
    padding: 0;
    max-width: 100%;
  }
`;

export const MostClaimed = () => {
  const [result] = useMostClaimedGitPoapsQuery({
    variables: {
      count: 12,
    },
  });

  return (
    <Container>
      <Header>{'Most minted GitPOAPs'}</Header>
      <Grid align="flex-start" mb={`${rem(25)}`} mt={`${rem(50)}`} gutter="xl">
        {result.fetching && !result.operation && (
          <>
            {[...Array(6)].map((_, i) => {
              return (
                <POAPBadgeSkeleton key={i} style={{ marginTop: rem(30), marginRight: rem(40) }} />
              );
            })}
          </>
        )}

        {result.data?.mostClaimedGitPOAPs &&
          result.data?.mostClaimedGitPOAPs.map((item, i) => (
            <Grid.Col key={item.gitPOAP.id + '-' + i} xs={6} sm={3} md={4} lg={3} xl={2}>
              <GitPOAP
                gitPOAPId={item.gitPOAP.id}
                imgSrc={item.event.image_url}
                name={item.event.name}
                repoName={item.gitPOAP.project?.repos[0].name}
                orgName={item.gitPOAP.project?.repos[0].organization.name}
              />
            </Grid.Col>
          ))}
      </Grid>
      <Link href={'/gitpoaps'}>
        <Button variant="outline" rightIcon={<FaArrowRight />}>
          {'ALL GITPOAPS'}
        </Button>
      </Link>
    </Container>
  );
};
