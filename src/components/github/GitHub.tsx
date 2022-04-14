import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { GoMarkGithub } from 'react-icons/go';
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
import { DisconnectPopover } from '../DisconnectPopover';

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

type Props = {
  className?: string;
};

export const GitHub = ({ className }: Props) => {
  const { connectionStatus, web3Provider } = useWeb3Context();
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
      const netClaims = userClaims.length - claimedIds.length;
      return (
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
                setIsModalOpen(true);
                setIsGHPopoverOpen(false);
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              leftIcon={<GoMarkGithub size={16} />}
              rightIcon={<ClaimCircle value={netClaims} />}
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
  }, [
    isLoggedIntoGitHub,
    userClaims,
    handleLogout,
    authorizeGitHub,
    isGHPopoverOpen,
    isHovering,
    claimedIds.length,
  ]);

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
          setClaimedIds((prevClaimedIds) => [...prevClaimedIds, ...data.claimed]);
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
        isConnected={connectionStatus === 'connected'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClickClaim={claimGitPOAP}
        claimedIds={claimedIds}
        loadingClaimIds={loadingClaimIds}
      />
    </Content>
  );
};
