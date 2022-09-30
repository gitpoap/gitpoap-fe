import React, { useState } from 'react';
import styled from 'styled-components';
import { useClaimContext } from '../ClaimModal/ClaimContext';
import { useAuthContext } from './AuthContext';
import { rem } from 'polished';
import { GoMarkGithub } from 'react-icons/go';
import { DisconnectPopover } from '../shared/compounds/DisconnectPopover';
import { Button, ClaimCircle } from '../shared/elements';
import { useRouter } from 'next/router';
import { useFeatures } from '../FeaturesContext';

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

type Props = {
  className?: string;
  hideText?: boolean;
};

export const GitHub = ({ className, hideText }: Props) => {
  const { claimedIds, userClaims, setIsOpen } = useClaimContext();
  const { handleLogout, authorizeGitHub, isLoggedIntoGitHub } = useAuthContext();
  const { hasSettingsPage } = useFeatures();
  const [isGHPopoverOpen, setIsGHPopoverOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const userClaimCount = userClaims?.length;
  const router = useRouter();

  /* Not connected to GitHub */
  if (!isLoggedIntoGitHub) {
    return (
      <Content className={className}>
        <Button
          onClick={hasSettingsPage ? () => router.push(`/settings#integrations`) : authorizeGitHub}
          leftIcon={!hideText && <GoMarkGithub size={16} />}
        >
          {hideText ? <GoMarkGithub size={16} /> : 'CONNECT TO MINT'}
        </Button>
      </Content>
    );
  }

  if (userClaimCount && userClaimCount > 0 && userClaimCount - claimedIds.length > 0) {
    /* Connected to GitHub, but HAS open claims */
    const netClaims = userClaimCount - claimedIds.length;
    return (
      <Content className={className}>
        <DisconnectPopover
          isOpen={isGHPopoverOpen}
          setIsOpen={setIsGHPopoverOpen}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClose={() => setIsGHPopoverOpen(false)}
          handleOnClick={handleLogout}
          icon={<GoMarkGithub size={16} />}
          buttonText={'DISCONNECT'}
          isHovering={isHovering}
          target={
            <Button
              onClick={() => {
                setIsOpen(true);
                setIsGHPopoverOpen(false);
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
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
          }
        />
      </Content>
    );
  }

  /* Connected to GitHub, but NO open claims */
  return (
    <Content className={className}>
      <DisconnectPopover
        isOpen={isGHPopoverOpen}
        setIsOpen={setIsGHPopoverOpen}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClose={() => setIsGHPopoverOpen(false)}
        handleOnClick={handleLogout}
        icon={<GoMarkGithub size={16} />}
        buttonText={'DISCONNECT'}
        isHovering={isHovering}
        target={
          <ConnectedButton
            onClick={() => {
              setIsOpen(true);
              setIsGHPopoverOpen(false);
            }}
            variant="outline"
            leftIcon={!hideText && <GoMarkGithub size={16} />}
            hideText={hideText}
          >
            {hideText ? <GoMarkGithub size={16} /> : 'NONE TO MINT'}
          </ConnectedButton>
        }
      />
    </Content>
  );
};
