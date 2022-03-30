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

type Props = {
  className?: string;
};

const OpenClaimsQuery = gql`
  query openClaims($githubId: Float!) {
    userClaims(githubId: $githubId) {
      claim {
        id
        gitPOAP {
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

export const GitHub = ({ className }: Props) => {
  const { web3Provider } = useWeb3Context();
  const { tokens, authState, handleLogout, authorizeGitHub } = useAuthContext();
  const signer = web3Provider?.getSigner();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [claimedIds, setClaimedIds] = useState<number[]>([]);
  const [loadingClaimIds, setLoadingClaimIds] = useState<number[]>([]);
  const [result, refetch] = useQuery<UserOpenClaimsRes>({
    query: OpenClaimsQuery,
    variables: {
      githubId: authState.user?.githubId,
    },
    pause: !authState.user,
  });

  const userClaims = result.data?.userClaims;

  const renderGitHubButton = useCallback(() => {
    /* Not connected to GitHub */
    if (!authState.isLoggedIntoGitHub) {
      return (
        <Button onClick={authorizeGitHub} leftIcon={<GoMarkGithub size={16} />}>
          {'MINT POAPS'}
        </Button>
      );
    } else if (userClaims && userClaims.length > 0) {
      /* Connected to GitHub, but HAS open claims */
      return (
        <>
          <Button
            onClick={() => setIsModalOpen(true)}
            leftIcon={<ClaimCircle value={userClaims.length} />}
          >
            {'VIEW & MINT'}
          </Button>
        </>
      );
    }

    /* Connected to GitHub, but NO open claims */
    return (
      <ConnectedButton
        onClick={handleLogout}
        variant="outline"
        leftIcon={<GoMarkGithub size={16} />}
      >
        {authState.user?.githubHandle}
      </ConnectedButton>
    );
  }, [authState.isLoggedIntoGitHub, userClaims, authState.user, handleLogout, authorizeGitHub]);

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
        setLoadingClaimIds([]);
      }
    },
    [signer, tokens?.accessToken, refetch],
  );

  return (
    <Content className={className}>
      {authState.hasLoadedLocalStorage && renderGitHubButton()}

      <ClaimModal
        claims={userClaims ?? []}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClickClaim={claimGitPOAP}
        claimedIds={claimedIds}
        loadingClaimIds={loadingClaimIds}
      />
    </Content>
  );
};
