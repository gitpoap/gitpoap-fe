import React, { useEffect, useState } from 'react';
import { rem, tint } from 'polished';
import { Button } from '../elements/Button';
import { PrimaryBlue } from '../../../colors';
import { GitPOAP } from './GitPOAP';
import { FaCheckCircle, FaCoins, FaEthereum } from 'react-icons/fa';
import { useReward } from 'react-rewards';
import { Badge, Stack, Tooltip } from '@mantine/core';

type Props = {
  gitPOAPId: number;
  imgSrc: string;
  name: string;
  orgName?: string;
  description: string;
  onClickClaim: () => void;
  onClickBadge?: () => void;
  isClaimingAll: boolean;
  isClaimed?: boolean;
  isLoading?: boolean;
  isConnected?: boolean;
  issuedVia?: 'github' | 'email' | 'eth';
};

const getButtonText = (isClaimed: boolean | undefined, isConnected: boolean | undefined) => {
  if (isClaimed) {
    return 'Minted';
  }

  if (!isConnected) {
    return 'Connect';
  }

  return 'Mint';
};

export const ClaimBlock = ({
  gitPOAPId,
  imgSrc,
  name,
  orgName,
  description,
  onClickClaim,
  onClickBadge,
  isClaimed,
  isLoading,
  isClaimingAll,
  isConnected,
  issuedVia,
}: Props) => {
  const [isClaimedPrev, setIsClaimedPrev] = useState<boolean>(!!isClaimed);
  const rewardId = 'rewardId-' + gitPOAPId;
  const { reward } = useReward(rewardId, 'confetti', {
    colors: [
      tint(1.0, PrimaryBlue),
      tint(0.8, PrimaryBlue),
      tint(0.6, PrimaryBlue),
      tint(0.4, PrimaryBlue),
      tint(0.2, PrimaryBlue),
      tint(0.0, PrimaryBlue),
    ],
    elementCount: 100,
    spread: 60,
  });

  useEffect(() => {
    if (isClaimed && !isClaimedPrev) {
      reward();
      setIsClaimedPrev(true);
    }
  }, [isClaimed, isClaimedPrev, reward]);

  return (
    <Stack align="center">
      <GitPOAP
        gitPOAPId={gitPOAPId}
        imgSrc={imgSrc}
        name={name}
        repoName={orgName}
        description={description}
        onClick={onClickBadge}
      />
      {issuedVia && (
        <Tooltip label={`Issued via ${issuedVia}`}>
          <Badge size="sm" variant="filled" style={{ letterSpacing: rem(1) }}>
            {issuedVia}
          </Badge>
        </Tooltip>
      )}
      <Button
        id={rewardId}
        onClick={onClickClaim}
        loading={isLoading}
        leftIcon={isClaimed ? <FaCheckCircle /> : !isConnected ? <FaEthereum /> : <FaCoins />}
        disabled={isClaimed || isClaimingAll}
      >
        {getButtonText(isClaimed, isConnected)}
      </Button>
    </Stack>
  );
};
