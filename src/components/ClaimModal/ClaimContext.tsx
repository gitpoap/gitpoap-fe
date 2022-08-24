import React, { useEffect, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useListState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { GITPOAP_API_URL } from '../../constants';
import { ClaimStatus, OpenClaimsQuery, useOpenClaimsQuery } from '../../graphql/generated-gql';
import { NotificationFactory } from '../../notifications';
import { MetaMaskError, MetaMaskErrors } from '../../types';
import { useAuthContext } from '../github/AuthContext';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { ClaimModal } from '.';

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
  const { connectionStatus, web3Provider } = useWeb3Context();
  const { isLoggedIntoGitHub, tokens, user } = useAuthContext();
  const signer = web3Provider?.getSigner();
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
    if (user && !userClaims) {
      refetchUserClaims();
    }
  }, [user, refetchUserClaims, userClaims]);

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
          handlers.append(...data.claimed);
          refetchUserClaims();
          setLoadingClaimIds([]);
        }
      } catch (err) {
        if ((err as MetaMaskError)?.code !== MetaMaskErrors.UserRejectedRequest) {
          console.warn(err);
          showNotification(
            NotificationFactory.createError(
              'Error - Request to claim GitPOAP failed',
              'Oops, something went wrong! 🤥',
            ),
          );
        }
        setLoadingClaimIds([]);
      }
    },
    [signer, tokens?.accessToken, refetchUserClaims],
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
        isConnected={connectionStatus === 'connected'}
        isLoggedIntoGitHub={isLoggedIntoGitHub}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClickClaim={claimGitPOAPs}
        claimedIds={claimedIds}
        loadingClaimIds={loadingClaimIds}
      />
    </ClaimContext.Provider>
  );
};
