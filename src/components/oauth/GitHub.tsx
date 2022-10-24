import React from 'react';
import styled from 'styled-components';
import { useClaimContext } from '../claims/ClaimContext';
import { rem } from 'polished';
import { GoMarkGithub } from 'react-icons/go';
import { Button, ClaimCircle } from '../shared/elements';
import { useRouter } from 'next/router';
import { useFeatures } from '../FeaturesContext';
import { useUser } from '../../hooks/useUser';
import { GitPOAP } from '../shared/elements/icons';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ConnectedButton = styled(Button)<{ hideText?: boolean }>`
  min-width: ${(props) => (props.hideText ? 0 : rem(125))};
`;

const GitPOAPIcon = styled(GitPOAP)`
  path {
    fill: white;
  }
`;

type Props = {
  className?: string;
  hideText?: boolean;
};

export const GitHub = ({ className, hideText }: Props) => {
  const { claimedIds, userClaims, setIsOpen } = useClaimContext();
  const user = useUser();
  const { hasCheckEligibility } = useFeatures();
  const userClaimCount = userClaims?.length;
  const router = useRouter();

  /* User has no connected GitHub account */
  if (!user?.capabilities.hasGithub) {
    return user === null && hasCheckEligibility ? (
      <Content className={className}>
        <Button onClick={() => router.push('/eligibility')} leftIcon={!hideText && <GitPOAPIcon />}>
          {hideText ? <GitPOAPIcon /> : 'Check Eligibility'}
        </Button>
      </Content>
    ) : (
      <Content className={className}>
        <Button
          onClick={() => router.push(`/settings#integrations`)}
          leftIcon={!hideText && <GoMarkGithub size={16} />}
        >
          {hideText ? <GoMarkGithub size={16} /> : 'Connect GitHub'}
        </Button>
      </Content>
    );
  }

  if (userClaimCount && userClaimCount > 0 && userClaimCount - claimedIds.length > 0) {
    /* Connected to GitHub, but HAS open claims */
    const netClaims = userClaimCount - claimedIds.length;
    return (
      <Content className={className}>
        <Button
          onClick={() => setIsOpen(true)}
          leftIcon={!hideText && <GoMarkGithub size={16} />}
          rightIcon={
            !hideText && <ClaimCircle key={`claim-circle-${netClaims}`} value={netClaims} />
          }
        >
          {hideText ? (
            <ClaimCircle key={`claim-circle-${netClaims}`} value={netClaims} />
          ) : (
            'VIEW & MINT'
          )}
        </Button>
      </Content>
    );
  }

  /* Connected to GitHub, but NO open claims */
  return (
    <Content className={className}>
      <ConnectedButton
        onClick={() => setIsOpen(true)}
        variant="outline"
        leftIcon={!hideText && <GoMarkGithub size={16} />}
        hideText={hideText}
      >
        {hideText ? <GoMarkGithub size={16} /> : 'NONE TO MINT'}
      </ConnectedButton>
    </Content>
  );
};
