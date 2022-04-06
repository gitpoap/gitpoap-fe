import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { GoMarkGithub } from 'react-icons/go';
import { Group, Popover } from '@mantine/core';
import { useQuery, gql } from 'urql';
import { useAuthContext } from './AuthContext';
import { Button } from '../shared/elements/Button';
import { ClaimCircle } from '../shared/elements/ClaimCircle';
import { ClaimModal } from '../ClaimModal';
import { UserClaim } from '../../types';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { GITPOAP_API_URL } from '../../constants';
import { showNotification } from '@mantine/notifications';
import { NotificationFactory } from '../../notifications';

const POPOVER_HOVER_TIME = 400;

const OpenClaimsQuery = gql`
  query openClaims($githubId: Float!) {
    userClaims(githubId: $githubId) {
      claim {
        id
        gitPOAP {
          id
          repo {
            organization {
              name
            }
          }
        }
      }
      event {
        name
        image_url
        description
      }
    }
  }
`;

export type UserOpenClaimsRes = {
  userClaims: UserClaim[];
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ConnectedButton = styled(Button)`
  min-width: ${rem(125)};
`;

type DisconnectPopoverProps = {
  isOpen: boolean;
  target: React.ReactNode;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onClose: () => void;
  handleLogout: () => void;
};

const DisconnectPopover = ({
  isOpen,
  target,
  onMouseEnter,
  onMouseLeave,
  handleLogout,
  onClose,
}: DisconnectPopoverProps) => {
  return (
    <Popover
      opened={isOpen}
      onClose={onClose}
      target={target}
      position="bottom"
      placement="center"
      closeOnClickOutside
      trapFocus={false}
      spacing={6}
      withArrow
      radius="md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Group>
        <Button variant="outline" onClick={handleLogout} rightIcon={<GoMarkGithub size={16} />}>
          {'DISCONNECT'}
        </Button>
      </Group>
    </Popover>
  );
};

type Props = {
  className?: string;
};

export const GitHub = ({ className }: Props) => {
  const { isConnected, web3Provider } = useWeb3Context();
  const { tokens, authState, handleLogout, authorizeGitHub, isLoggedIntoGitHub, user } =
    useAuthContext();
  const signer = web3Provider?.getSigner();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isGHPopoverOpen, setIsGHPopoverOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [claimedIds, setClaimedIds] = useState<number[]>([]);
  const [loadingClaimIds, setLoadingClaimIds] = useState<number[]>([]);
  const [result, refetch] = useQuery<UserOpenClaimsRes>({
    query: OpenClaimsQuery,
    variables: {
      githubId: user?.githubId,
    },
    pause: !user,
  });

  const userClaims = result.data?.userClaims;

  /* Opens & closes the popover on hover with a time delay */
  useEffect(() => {
    if (isHovering && !isGHPopoverOpen) {
      const timeout = setTimeout(() => setIsGHPopoverOpen(true), POPOVER_HOVER_TIME);
      return () => clearTimeout(timeout);
    }
    if (!isHovering && isGHPopoverOpen) {
      const timeout = setTimeout(() => setIsGHPopoverOpen(false), POPOVER_HOVER_TIME);
      return () => clearTimeout(timeout);
    }
  }, [isHovering, isGHPopoverOpen]);

  const renderGitHubButton = useCallback(() => {
    /* Not connected to GitHub */
    if (!isLoggedIntoGitHub) {
      return (
        <Button onClick={authorizeGitHub} leftIcon={<GoMarkGithub size={16} />}>
          {'CONNECT TO MINT'}
        </Button>
      );
    } else if (userClaims && userClaims.length > 0) {
      /* Connected to GitHub, but HAS open claims */
      return (
        <DisconnectPopover
          isOpen={isGHPopoverOpen}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClose={() => setIsGHPopoverOpen(false)}
          handleLogout={handleLogout}
          target={
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setIsGHPopoverOpen(false);
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              leftIcon={<GoMarkGithub size={16} />}
              rightIcon={<ClaimCircle value={userClaims.length} />}
            >
              {'VIEW & MINT'}
            </Button>
          }
        />
      );
    }

    /* Connected to GitHub, but NO open claims */
    return (
      <DisconnectPopover
        isOpen={isGHPopoverOpen}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClose={() => setIsGHPopoverOpen(false)}
        handleLogout={handleLogout}
        target={
          <ConnectedButton
            onClick={() => {
              setIsModalOpen(true);
              setIsGHPopoverOpen(false);
            }}
            variant="outline"
            leftIcon={<GoMarkGithub size={16} />}
          >
            {'NONE TO MINT'}
          </ConnectedButton>
        }
      />
    );
  }, [isLoggedIntoGitHub, userClaims, handleLogout, authorizeGitHub, isGHPopoverOpen]);

  const claimGitPOAP = useCallback(
    async (claimIds: number[]) => {
      setLoadingClaimIds(claimIds);
      const address = await signer?.getAddress();
      const timestamp = Date.now();

      try {
        const signature = await signer?.signMessage(
          JSON.stringify({
            site: 'gitpoap.io',
            method: 'POST /claims',
            createdAt: timestamp,
            claimIds: claimIds,
          }),
        );

        const res = await fetch(`${GITPOAP_API_URL}/claims`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: JSON.stringify({
            claimIds,
            address,
            signature: {
              data: signature,
              createdAt: timestamp,
            },
          }),
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        if (res.status === 200) {
          const data = (await res.json()) as { claimed: number[]; invalid: number[] };
          setClaimedIds(data.claimed);
          refetch();
          setLoadingClaimIds([]);
        }
      } catch (err) {
        console.warn(err);
        showNotification(
          NotificationFactory.createError(
            'Error - Request Failed',
            'Oops, something went wrong! 🤥',
          ),
        );
        setLoadingClaimIds([]);
      }
    },
    [signer, tokens?.accessToken, refetch],
  );

  return (
    <Content className={className}>
      {authState.hasInitializedAuth && renderGitHubButton()}

      <ClaimModal
        claims={userClaims ?? []}
        isConnected={isConnected}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClickClaim={claimGitPOAP}
        claimedIds={claimedIds}
        loadingClaimIds={loadingClaimIds}
      />
    </Content>
  );
};
