import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Modal, Center, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { Pagination } from '../shared/elements/Pagination';
import {
  ExtraHover,
  ExtraPressed,
  TextAccent,
  TextDarkGray,
  TextGray,
  TextLight,
} from '../../colors';
import { Button } from '../shared/elements/Button';
import { TwitterShareButton } from '../shared/elements/TwitterShareButton';
import { ClaimBlock } from '../shared/compounds/ClaimBlock';
import { useFeatures } from '../FeaturesContext';
import { useWeb3Context } from '../wallet/Web3Context';
import { BREAKPOINTS } from '../../constants';
import { OpenClaimsQuery } from '../../graphql/generated-gql';
import { Link } from '../shared/compounds/Link';

type Props = {
  isConnected: boolean;
  hasGithub: boolean;
  isOpen: boolean;
  claims: Exclude<OpenClaimsQuery['userClaims'], null | undefined>;
  claimedIds: number[];
  loadingClaimIds?: number[];
  onClose: () => void;
  onClickClaim: (claimIds: number[]) => void;
};

const StyledModal = styled(Modal)`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
  }
`;

const Content = styled(Center)`
  flex-direction: column;
  padding: ${rem(30)} ${rem(30)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: ${rem(30)} ${rem(0)};
  }
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
  padding: ${rem(0)} ${rem(30)};
  line-height: ${rem(24)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0;
  }
`;

const ClaimTextLink = styled(Link)`
  color: ${TextAccent};
  &:hover:not([disabled]) {
    color: ${ExtraHover};
  }
  &:active:not([disabled]) {
    color: ${ExtraPressed};
  }
  &[disabled] {
    color: ${TextDarkGray};
    cursor: not-allowed;
  }
`;

const getClaimText = (
  isConnected: boolean,
  numClaims: number,
  numClaimed: number,
  hasGithub: boolean,
): string => {
  const netClaims = numClaims - numClaimed;
  if (!hasGithub) return 'Connect your GitHub to mint!';
  if (!isConnected && netClaims > 0) return 'Connect your wallet to mint!';

  if (netClaims < 1) {
    return 'You have no new GitPOAPs to mint.';
  } else if (netClaims === 1) {
    return 'You have a new GitPOAP to mint!';
  }

  return `You have ${netClaims} new GitPOAPs to mint!`;
};

export const ClaimModal = ({
  isConnected,
  hasGithub,
  isOpen,
  claims,
  claimedIds,
  loadingClaimIds,
  onClose,
  onClickClaim,
}: Props) => {
  const [page, setPage] = useState(1);
  const matchesBreakpoint750 = useMediaQuery(`(min-width: ${rem(750)})`, false);
  const matchesBreakpoint500 = useMediaQuery(`(min-width: ${rem(500)})`, false);
  const perPage = matchesBreakpoint750 ? 3 : matchesBreakpoint500 ? 2 : 1;
  const numPages = Math.ceil(claims.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const { connect, address, ensName } = useWeb3Context();
  const hasClaimedAll = claimedIds.length === claims.length;
  const isClaimingAll = !!loadingClaimIds && loadingClaimIds.length === claims.length;
  const claimText = getClaimText(isConnected, claims.length, claimedIds.length, hasGithub);
  const allClaimIds = claims.map((userClaim) => userClaim.claim.id);

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
        {claims.length > 0 && (
          <>
            <GitPOAPClaims>
              {claims
                /* Sort by id DESC */
                .sort((a, b) => b.claim.id - a.claim.id)
                .slice(start, end)
                .map((userClaim) => {
                  return (
                    <ClaimBlock
                      key={userClaim.claim.id}
                      gitPOAPId={userClaim.claim.gitPOAP.id}
                      imgSrc={userClaim.event.image_url}
                      name={userClaim.event.name}
                      orgName={userClaim.claim.pullRequestEarned?.repo.organization.name}
                      description={userClaim.event.description}
                      onClickClaim={() =>
                        isConnected ? onClickClaim([userClaim.claim.id]) : connect()
                      }
                      onClickBadge={onClose}
                      isClaimed={claimedIds?.includes(userClaim.claim.id)}
                      isClaimingAll={isClaimingAll}
                      isLoading={!isClaimingAll && loadingClaimIds?.includes(userClaim.claim.id)}
                      isConnected={isConnected}
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
          </>
        )}

        {claims.length > 1 && !hasClaimedAll && (
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
        {claims.length === 0 && (
          <Group style={{ marginTop: rem(50), marginBottom: rem(50) }}>
            <BsFillMoonStarsFill color={TextDarkGray} size={rem(74)} />
          </Group>
        )}
        <ClaimText>
          {claims.length > 0 ? (
            'Minting is free, no transaction fee required'
          ) : (
            <>
              {'Earn GitPOAPs by contributing to a supported '}
              <ClaimTextLink href="/repos">{'repo'}</ClaimTextLink>
              {', or submit yours for onboarding '}
              <ClaimTextLink href="/onboard">{'here'}</ClaimTextLink>
              {'!'}
            </>
          )}
        </ClaimText>
        {claimedIds?.length > 0 && (
          <TwitterShareButton
            claimedCount={claimedIds.length}
            address={address}
            ensName={ensName}
            claims={claims}
          />
        )}
      </Content>
    </StyledModal>
  );
};
