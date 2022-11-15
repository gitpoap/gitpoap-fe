import React from 'react';
import styled from 'styled-components';
import { useClaimContext } from '../claims/ClaimContext';
import { rem } from 'polished';
import { Button, ClaimCircle } from '../shared/elements';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { GitPOAP } from '../shared/elements/icons';
import { useGetEmail } from '../../hooks/useGetEmail';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
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

export const ConnectionButton = ({ className, hideText }: Props) => {
  const { claimedIds, userClaims, setIsOpen } = useClaimContext();
  const user = useUser();
  const userClaimCount = userClaims?.length;
  const router = useRouter();
  const email = useGetEmail({ showNotification: false });

  if (user === null) {
    return (
      <Content className={className}>
        <Button onClick={() => router.push('/eligibility')} leftIcon={!hideText && <GitPOAPIcon />}>
          {hideText ? <GitPOAPIcon /> : 'Check Eligibility'}
        </Button>
      </Content>
    );
  }

  /* If user has any claims at all, then render the following regardless of connections */
  if (userClaimCount && userClaimCount > 0 && userClaimCount - claimedIds.length > 0) {
    /* Connected to GitHub, but HAS open claims */
    const netClaims = userClaimCount - claimedIds.length;
    return (
      <Content className={className}>
        <Button
          onClick={() => setIsOpen(true)}
          leftIcon={!hideText && <GitPOAPIcon />}
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

  /* User has no connected accounts */
  if (!user?.capabilities.hasGithub && !email) {
    return (
      <Content className={className}>
        <Button
          onClick={() => router.push(`/settings#integrations`)}
          leftIcon={!hideText && <GitPOAPIcon />}
        >
          {hideText ? <GitPOAPIcon /> : 'Connect Accounts'}
        </Button>
      </Content>
    );
  }

  /* Has at least ONE connection, but NO open claims */
  return (
    <Content className={className}>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        leftIcon={!hideText && <GitPOAPIcon />}
        sx={{ minWidth: hideText ? 0 : rem(125) }}
      >
        {hideText ? <GitPOAPIcon /> : 'NONE TO MINT'}
      </Button>
    </Content>
  );
};
