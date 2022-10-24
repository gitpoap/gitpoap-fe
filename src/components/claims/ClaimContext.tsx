import React, { useEffect, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useListState } from '@mantine/hooks';
import { GITPOAP_API_URL } from '../../constants';
import { ClaimStatus, OpenClaimsQuery, useOpenClaimsQuery } from '../../graphql/generated-gql';
import { Notifications } from '../../notifications';
import { MetaMaskError, MetaMaskErrors } from '../../types';
import { useWeb3Context } from '../wallet/Web3Context';
import { ClaimModal } from './index';
import { useTokens } from '../../hooks/useTokens';
import { useUser } from '../../hooks/useUser';

type ClaimState = {
  isOpen: boolean;
  userClaims: OpenClaimsQuery['userClaims'];
  claimedIds: number[];
  loadingClaimIds: number[];
  setIsOpen: (isOpen: boolean) => void;
  claimGitPOAPs: (claimIds: number[]) => void;
};

export const ClaimContext = createContext<ClaimState>({} as ClaimState);

export const useClaimContext = () => useContext<ClaimState>(ClaimContext);

type Props = {
  children: React.ReactNode;
};

export const ClaimContextProvider = ({ children }: Props) => {
  const { connectionStatus } = useWeb3Context();
  const user = useUser();
  const { tokens } = useTokens();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [claimedIds, handlers] = useListState<number>([]);
  const [loadingClaimIds, setLoadingClaimIds] = useState<number[]>([]);
  const [result, refetchUserClaims] = useOpenClaimsQuery({
    variables: {
      githubId: user?.githubId ?? -1,
    },
    pause: true,
    requestPolicy: 'network-only',
  });

  const userClaims = result.data?.userClaims;

  /* Initially fetch the user claims */
  useEffect(() => {
    if (user && user?.githubId && !userClaims && !result.fetching) {
      refetchUserClaims();
    }
  }, [user, refetchUserClaims, userClaims, result]);

  /*
   * useOpenClaimsQuery includes all claimed GitPOAPs from the previous month
   * This side effect adds the ids of those claimed GitPOAPs to the claimedIds list
   */
  useEffect(() => {
    if (userClaims) {
      const ids = userClaims
        .filter((userClaim) =>
          [ClaimStatus.Claimed, ClaimStatus.Minting, ClaimStatus.Pending].includes(
            userClaim.claim.status,
          ),
        )
        .map((userClaim) => userClaim.claim.id);
      handlers.setState([...ids]);
    }
  }, [userClaims]);

  const claimGitPOAPs = useCallback(
    async (claimIds: number[]) => {
      setLoadingClaimIds(claimIds);
      try {
        const res = await fetch(`${GITPOAP_API_URL}/claims`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: JSON.stringify({ claimIds }),
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        if (res.status === 200) {
          const data = (await res.json()) as { claimed: number[]; invalid: number[] };
          handlers.append(...data.claimed);
          refetchUserClaims();
          setLoadingClaimIds([]);
        }
      } catch (err) {
        if ((err as MetaMaskError)?.code !== MetaMaskErrors.UserRejectedRequest) {
          console.warn(err);
          Notifications.error('Error - Request to claim GitPOAP failed');
        }
        setLoadingClaimIds([]);
      }
    },
    [tokens?.accessToken, refetchUserClaims],
  );

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      userClaims,
      claimGitPOAPs,
      claimedIds,
      loadingClaimIds,
    }),
    [isOpen, setIsOpen, claimGitPOAPs, claimedIds, loadingClaimIds, userClaims],
  );

  return (
    <ClaimContext.Provider value={value}>
      {children}
      <ClaimModal
        claims={userClaims ?? []}
        isConnected={connectionStatus === 'connected-to-wallet'}
        hasGithub={user?.capabilities.hasGithub ?? false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClickClaim={claimGitPOAPs}
        claimedIds={claimedIds}
        loadingClaimIds={loadingClaimIds}
      />
    </ClaimContext.Provider>
  );
};
