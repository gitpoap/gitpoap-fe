import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem, tint } from 'polished';
import { Button } from '../elements/Button';
import { PrimaryBlue } from '../../../colors';
import { GitPOAP } from './GitPOAP';
import { FaCheckCircle, FaCoins, FaEthereum } from 'react-icons/fa';
import { useReward } from 'react-rewards';

type Props = {
  gitPOAPId: number;
  imgSrc: string;
  name: string;
  orgName: string;
  description: string;
  onClickClaim: () => void;
  onClickBadge?: () => void;
  isClaimed?: boolean;
  isLoading?: boolean;
  isConnected?: boolean;
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: ${rem(340)};
`;

const ButtonWrapper = styled.div`
  flex: 1;
  margin-top: ${rem(14)};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

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
  isConnected,
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
    <Wrapper>
      <GitPOAP
        gitPOAPId={gitPOAPId}
        imgSrc={imgSrc}
        name={name}
        repoName={orgName}
        description={description}
        onClick={onClickBadge}
      />
      <ButtonWrapper>
        <Button
          id={rewardId}
          onClick={onClickClaim}
          loading={isLoading}
          leftIcon={isClaimed ? <FaCheckCircle /> : !isConnected ? <FaEthereum /> : <FaCoins />}
          disabled={isClaimed}
        >
          {getButtonText(isClaimed, isConnected)}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
