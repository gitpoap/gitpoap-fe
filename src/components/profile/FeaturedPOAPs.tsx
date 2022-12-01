import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Text, Grid, Group, TextProps, Box, BoxProps } from '@mantine/core';
import { FaHeartBroken } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';
import { POAP } from '../../types';
import { POAPBadge } from '../shared/elements/POAPBadge';
import { TextAccent, TextDarkGray } from '../../colors';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { useFeaturedPOAPs, GitPOAP as GitPOAPType } from './FeaturedPOAPsContext';
import { Text as TextUI } from '../shared/elements/Text';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { useProfileContext } from './ProfileContext';

const Container = styled(Box)<BoxProps>`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const SectionTitle = styled(Text)<TextProps>`
  font-family: VT323;
  line-height: ${rem(42)};
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
`;

const isGitPOAP = (poap: POAP | GitPOAPType): poap is GitPOAPType => {
  return 'claim' in poap;
};

export const FeaturedPOAPs = () => {
  const {
    featuredPOAPsState: { featuredPOAPsFull, featuredPOAPTokenIDs },
    hasFetched,
    isLoading,
    loadingIds,
    showHearts,
  } = useFeaturedPOAPs();
  const { profileData } = useProfileContext();
  const { account } = useWeb3React();
  const isViewerOwner = profileData && account && profileData.address === account.toLowerCase();

  if (featuredPOAPsFull.length === 0 && !isViewerOwner) {
    return null;
  }

  return (
    <Container mb={rem(50)}>
      <SectionTitle size={30} mb={rem(30)}>
        {'Featured POAPs'}
      </SectionTitle>
      <Grid align="start" mb={rem(50)}>
        {isLoading && !hasFetched && (
          <>
            {[...Array(5)].map((_, i) => {
              return (
                <POAPBadgeSkeleton key={i} style={{ marginTop: rem(30), marginRight: rem(40) }} />
              );
            })}
          </>
        )}
        {hasFetched && featuredPOAPsFull.length === 0 && (
          <EmptyState icon={<FaHeartBroken color={TextDarkGray} size={rem(74)} />}>
            <TextUI style={{ marginTop: rem(20) }}>{'No featured POAPs :( '}</TextUI>
          </EmptyState>
        )}

        {featuredPOAPsFull.length > 0 &&
          featuredPOAPsFull.map((featuredPOAP) => {
            if (isGitPOAP(featuredPOAP)) {
              return (
                <Grid.Col key={featuredPOAP.claim.id} xs={6} sm={4} md={3} lg={3} xl={2}>
                  <Group position="center">
                    <GitPOAP
                      gitPOAPId={featuredPOAP.claim.gitPOAP.id}
                      name={featuredPOAP.poap.event.name}
                      imgSrc={featuredPOAP.poap.event.image_url}
                      repoName={featuredPOAP.claim.pullRequestEarned?.repo.name}
                      orgName={featuredPOAP.claim.pullRequestEarned?.repo.organization.name}
                      poapTokenId={featuredPOAP.poap.tokenId}
                    />
                  </Group>
                </Grid.Col>
              );
            }

            return (
              <Grid.Col key={featuredPOAP.tokenId} xs={6} sm={4} md={3} lg={3} xl={2}>
                <Group position="center">
                  <POAPBadge
                    poapTokenId={featuredPOAP.tokenId}
                    name={featuredPOAP.event.name}
                    imgSrc={featuredPOAP.event.image_url}
                    href={`https://poap.gallery/event/${featuredPOAP.event.id}`}
                    isFeatured={!!featuredPOAPTokenIDs[featuredPOAP.tokenId]}
                    isFeaturedLoading={!!loadingIds[featuredPOAP.tokenId]}
                    showHeart={showHearts}
                  />
                </Group>
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
};
