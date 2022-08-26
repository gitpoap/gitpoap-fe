import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { POAP } from '../../types';
import { POAPBadge } from '../shared/elements/POAPBadge';
import { POAPList } from '../shared/compounds/POAPList';
import { TextAccent, TextDarkGray } from '../../colors';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { useFeaturedPOAPs, GitPOAP as GitPOAPType } from './FeaturedPOAPsContext';
import { Text } from '@mantine/core';
import { Text as TextUI } from '../shared/elements/Text';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { FaHeartBroken } from 'react-icons/fa';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { useProfileContext } from './ProfileContext';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const SectionTitle = styled(Text)`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(30)};
  line-height: ${rem(42)};
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
  margin-bottom: ${rem(30)};
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
  const { address: walletAddress } = useWeb3Context();
  const isViewerOwner =
    profileData && walletAddress && profileData.address === walletAddress.toLowerCase();

  if (featuredPOAPsFull.length === 0 && !isViewerOwner) {
    return null;
  }

  return (
    <Container>
      <SectionTitle>{'Featured POAPs'}</SectionTitle>
      <POAPList>
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
                <GitPOAP
                  key={featuredPOAP.claim.id}
                  gitPOAPId={featuredPOAP.claim.gitPOAP.id}
                  name={featuredPOAP.poap.event.name}
                  imgSrc={featuredPOAP.poap.event.image_url}
                  repoName={featuredPOAP.claim.pullRequestEarned?.repo.name}
                  orgName={featuredPOAP.claim.pullRequestEarned?.repo.organization.name}
                  poapTokenId={featuredPOAP.poap.tokenId}
                />
              );
            }

            return (
              <POAPBadge
                key={featuredPOAP.tokenId}
                poapTokenId={featuredPOAP.tokenId}
                name={featuredPOAP.event.name}
                imgSrc={featuredPOAP.event.image_url}
                href={`https://poap.gallery/event/${featuredPOAP.event.id}`}
                isFeatured={!!featuredPOAPTokenIDs[featuredPOAP.tokenId]}
                isFeaturedLoading={!!loadingIds[featuredPOAP.tokenId]}
                showHeart={showHearts}
              />
            );
          })}
      </POAPList>
    </Container>
  );
};
