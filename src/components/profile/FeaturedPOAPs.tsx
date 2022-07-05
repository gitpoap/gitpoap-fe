import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { POAP } from '../../types';
import { POAPBadge as POAPBadgeUI } from '../shared/elements/POAPBadge';
import { TextAccent, TextDarkGray } from '../../colors';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { useFeaturedPOAPs, GitPOAP as GitPOAPType } from './FeaturedPOAPsContext';
import { Text } from '@mantine/core';
import { Text as TextUI } from '../shared/elements/Text';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { FaHeartBroken } from 'react-icons/fa';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const POAPs = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${rem(50)};
  align-items: flex-start;
  flex: 1;
`;

const POAPBadge = styled(POAPBadgeUI)`
  margin-top: ${rem(30)};
`;

const SectionTitle = styled(Text)`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(30)};
  line-height: ${rem(42)};
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
`;

const StyledGitPOAP = styled(GitPOAP)`
  margin: ${rem(30)} ${rem(20)} 0;
`;

const StyledPOAP = styled(POAPBadge)`
  margin: ${rem(30)} ${rem(20)} 0;
`;

const isGitPOAP = (poap: POAP | GitPOAPType): poap is GitPOAPType => {
  return 'claim' in poap;
};

export const FeaturedPOAPs = () => {
  const {
    featuredPOAPsState: { featuredPOAPsFull },
    hasFetched,
    isLoading,
  } = useFeaturedPOAPs();

  return (
    <Container>
      <SectionTitle>{'Featured POAPs'}</SectionTitle>
      <POAPs>
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
                <StyledGitPOAP
                  key={featuredPOAP.claim.id}
                  gitPOAPId={featuredPOAP.claim.gitPOAP.id}
                  name={featuredPOAP.poap.event.name}
                  imgSrc={featuredPOAP.poap.event.image_url}
                  repoName={featuredPOAP.claim.gitPOAP.repo.organization.name}
                  description={featuredPOAP.poap.event.description}
                  poapTokenId={featuredPOAP.poap.tokenId}
                />
              );
            }

            return (
              <StyledPOAP
                key={featuredPOAP.tokenId}
                poapTokenId={featuredPOAP.tokenId}
                name={featuredPOAP.event.name}
                imgSrc={featuredPOAP.event.image_url}
                href={`https://poap.gallery/event/${featuredPOAP.event.id}`}
              />
            );
          })}
      </POAPs>
    </Container>
  );
};
