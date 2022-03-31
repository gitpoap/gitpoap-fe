import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Modal, Center, Pagination } from '@mantine/core';
import { BackgroundPanel, TextGray, TextLight } from '../colors';
import { Button } from './shared/elements/Button';
import { TwitterShareButton } from './shared/elements/TwitterShareButton';
import { ClaimBlock } from './shared/compounds/ClaimBlock';
import { UserClaim } from '../types';
import { useFeatures } from './FeaturesContext';

type Props = {
  isOpen: boolean;
  claims: UserClaim[];
  claimedIds?: number[];
  loadingClaimIds?: number[];
  onClose: () => void;
  onClickClaim: (claimIds: number[]) => void;
};

const StyledModal = styled(Modal)`
  .mantine-Modal-modal {
    background-color: ${BackgroundPanel};
  }
`;

const Content = styled(Center)`
  flex-direction: column;
  padding: ${rem(30)} ${rem(70)};
`;

const Header = styled.div`
  font-family: VT323;
  font-size: ${rem(48)};
  text-align: center;
  color: ${TextLight};
`;

const GitPOAPClaims = styled.div`
  display: flex;
  margin-top: ${rem(60)};
  margin-bottom: ${rem(20)};

  > div:not(:last-child) {
    margin-right: ${rem(30)};
  }
`;

const ClaimAll = styled(Center)`
  display: inline-flex;
  flex-direction: column;
  margin-top: ${rem(30)};
`;

const ClaimText = styled.div`
  font-size: ${rem(12)};
  text-align: center;
  letter-spacing: ${rem(0.5)};
  color: ${TextGray};
  margin-top: ${rem(18)};
`;

const getClaimText = (numClaims: number): string => {
  if (numClaims < 1) {
    return 'You have no new POAPs to mint.';
  } else if (numClaims === 1) {
    return 'You have a new POAP to mint!';
  }

  return `You have ${numClaims} new POAPs to mint!`;
};

export const ClaimModal = ({
  isOpen,
  claims,
  claimedIds,
  loadingClaimIds,
  onClose,
  onClickClaim,
}: Props) => {
  const [page, setPage] = useState(1);
  const claimText = getClaimText(claims.length);
  const { hasClaimAllButton } = useFeatures();
  const perPage = 3;
  const numPages = Math.ceil(claims.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const hasClaimedAll = claimedIds && claimedIds.length === claims.length;
  const isClaimingAll = loadingClaimIds && loadingClaimIds.length === claims.length;

  /* All claimIds in view, not all */
  const allClaimIds = claims.slice(start, end).map((userClaim) => userClaim.claim.id);

  return (
    <StyledModal
      onClose={onClose}
      opened={isOpen}
      centered
      size="xl"
      closeButtonLabel="Close GitPOAP mint modal"
    >
      <Content>
        <Header>{claimText}</Header>
        <GitPOAPClaims>
          {claims.slice(start, end).map((userClaim: UserClaim) => {
            return (
              <ClaimBlock
                key={userClaim.claim.id}
                gitPOAPId={userClaim.claim.id}
                imgSrc={userClaim.event.image_url}
                name={userClaim.event.name}
                orgName={userClaim.claim.gitPOAP.repo.organization.name}
                description={userClaim.event.description}
                onClickClaim={() => onClickClaim([userClaim.claim.id])}
                isClaimed={claimedIds?.includes(userClaim.claim.id)}
                isLoading={loadingClaimIds?.includes(userClaim.claim.id)}
              />
            );
          })}
        </GitPOAPClaims>
        {claims.length > perPage && (
          <Pagination
            style={{ padding: rem(5) }}
            page={page}
            onChange={setPage}
            total={numPages}
            withControls={false}
          />
        )}

        {hasClaimAllButton && claims.length > 1 && !hasClaimedAll && (
          <ClaimAll>
            <Button
              onClick={() => onClickClaim(allClaimIds)}
              disabled={
                loadingClaimIds &&
                loadingClaimIds.length > 0 &&
                loadingClaimIds.length < allClaimIds.length
              }
              loading={isClaimingAll}
            >
              {'Mint all'}
            </Button>
          </ClaimAll>
        )}
        <ClaimText>{'Minting is free, no transaction fee required'}</ClaimText>
        {claimedIds && <TwitterShareButton gitPOAPCount={claimedIds.length} />}
      </Content>
    </StyledModal>
  );
};
