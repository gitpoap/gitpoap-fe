import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useClient } from 'urql';
import {
  FeaturedPoapsDocument,
  FeaturedPoapsQuery,
  useFeaturedPoapsQuery,
} from '../../graphql/generated-gql';
import { MetaMaskError, MetaMaskErrors } from '../../types';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../github/AuthContext';
import { showNotification } from '@mantine/notifications';
import { NotificationFactory } from '../../notifications';

export type GitPOAP = Exclude<
  FeaturedPoapsQuery['profileFeaturedPOAPs'],
  null | undefined
>['gitPOAPs'][number];

export type POAP = Exclude<
  FeaturedPoapsQuery['profileFeaturedPOAPs'],
  null | undefined
>['poaps'][number];

type FeaturedPOAPsState = {
  featuredPOAPsFull: (GitPOAP | POAP)[];
  featuredPOAPTokenIDs: Record<string, true>;
};

type FeaturedPOAPsData = {
  featuredPOAPsState: FeaturedPOAPsState;
  showHearts: boolean;
  isLoading: boolean;
  hasFetched: boolean;
  loadingIds: Record<string, true>;
};

type FeaturedPOAPsDispatch = {
  addFeaturedPOAP: (poapTokenId: string) => void;
  removeFeaturedPOAP: (poapTokenId: string) => void;
};

/* -- Set up the Context -- */
export const getInitialState = (): FeaturedPOAPsState =>
  ({
    featuredPOAPsFull: [],
    featuredPOAPTokenIDs: {} as Record<string, true>,
  } as FeaturedPOAPsState);

const FeaturedPOAPsContext = createContext<FeaturedPOAPsData>({} as FeaturedPOAPsData);
const FeaturedPOAPsDispatchContext = createContext<FeaturedPOAPsDispatch>(
  {} as FeaturedPOAPsDispatch,
);

export const useFeaturedPOAPs = () => useContext(FeaturedPOAPsContext);
export const useFeaturedPOAPsDispatch = () => useContext(FeaturedPOAPsDispatchContext);

/* -- The Provider -- */
type Props = {
  children: React.ReactNode;
  /* The address of the profile */
  profileAddress: string | null;
  ensName: string | null;
};

export const FeaturedPOAPsProvider = ({ children, profileAddress, ensName }: Props) => {
  const { web3Provider, address: walletAddress } = useWeb3Context();
  const signer = web3Provider?.getSigner();
  const { tokens } = useAuthContext();
  const [showHearts, setShowHearts] = useState(false);
  const [featuredPOAPsState, setFeaturedPOAPsState] = useState<FeaturedPOAPsState>(
    getInitialState(),
  );
  const [loadingIds, setLoadingIds] = useState<Record<string, true>>({} as Record<string, true>);
  const gqlClient = useClient();
  const [result] = useFeaturedPoapsQuery({
    variables: {
      address: ensName ?? profileAddress ?? '',
    },
  });

  const checkIfUserOwnsProfile = useCallback(
    async (profileAddress: string) => {
      if (profileAddress.toLocaleLowerCase() === walletAddress?.toLocaleLowerCase()) {
        setShowHearts(true);
      } else {
        setShowHearts(false);
      }
    },
    [walletAddress],
  );

  /* Checks if the user owns the profile they're currently viewing */
  useEffect(() => {
    if (profileAddress) {
      checkIfUserOwnsProfile(profileAddress);
    }
  }, [profileAddress, checkIfUserOwnsProfile]);

  /* Process & save fetched data to state */
  const saveData = useCallback((data: FeaturedPoapsQuery) => {
    const profileFeaturedPOAPs = data.profileFeaturedPOAPs;
    if (profileFeaturedPOAPs) {
      const ids = [
        ...profileFeaturedPOAPs.gitPOAPs.map((gitpoap) => gitpoap.poap.tokenId),
        ...profileFeaturedPOAPs.poaps.map((poap) => poap.tokenId),
      ];
      setFeaturedPOAPsState({
        featuredPOAPsFull: [...profileFeaturedPOAPs.gitPOAPs, ...profileFeaturedPOAPs.poaps],
        featuredPOAPTokenIDs: ids.reduce((acc, id) => ({ ...acc, [id]: true }), {}),
      });
    }
  }, []);

  /* Save data when it arrives */
  useEffect(() => {
    if (result.data?.profileFeaturedPOAPs) {
      saveData(result.data);
    }
  }, [result.data, saveData]);

  /* Manually refetch data via a promisified query */
  const refetchData = useCallback(async () => {
    return await gqlClient
      .query(
        FeaturedPoapsDocument,
        { address: ensName ?? profileAddress },
        { requestPolicy: 'network-only' },
      )
      .toPromise();
  }, [gqlClient, ensName, profileAddress]);

  const addFeaturedPOAP = useCallback(
    async (poapTokenId: string) => {
      const timestamp = Date.now();
      setLoadingIds((prevState) => ({ ...prevState, [poapTokenId]: true }));

      try {
        const signature = await signer?.signMessage(
          JSON.stringify({
            site: 'gitpoap.io',
            method: 'PUT /featured',
            createdAt: timestamp,
            poapTokenId,
          }),
        );

        await fetch(`${GITPOAP_API_URL}/featured`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: JSON.stringify({
            address: walletAddress,
            poapTokenId,
            signature: {
              data: signature,
              createdAt: timestamp,
            },
          }),
        });
        const results = await refetchData();
        saveData(results.data);
        setLoadingIds((prevState) => {
          const { [poapTokenId]: _, ...newState } = prevState;
          return newState;
        });
      } catch (err) {
        if ((err as MetaMaskError)?.code !== MetaMaskErrors.UserRejectedRequest) {
          console.error(err);
          showNotification(
            NotificationFactory.createError(
              'Error - Request to add a featured POAP failed',
              'Oops, something went wrong! 🤥',
            ),
          );
        }
        setLoadingIds((prevState) => {
          const { [poapTokenId]: _, ...newState } = prevState;
          return newState;
        });
      }
    },
    [walletAddress, signer, tokens?.accessToken, saveData, refetchData],
  );

  const removeFeaturedPOAP = useCallback(
    async (poapTokenId: string) => {
      const timestamp = Date.now();
      setLoadingIds((prevState) => ({ ...prevState, [poapTokenId]: true }));

      try {
        const signature = await signer?.signMessage(
          JSON.stringify({
            site: 'gitpoap.io',
            method: 'DELETE /featured/:id',
            createdAt: timestamp,
            poapTokenId,
          }),
        );

        await fetch(`${GITPOAP_API_URL}/featured/${poapTokenId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: JSON.stringify({
            address: walletAddress,
            signature: {
              data: signature,
              createdAt: timestamp,
            },
          }),
        });

        const results = await refetchData();
        saveData(results.data);
        setLoadingIds((prevState) => {
          const { [poapTokenId]: _, ...newState } = prevState;
          return newState;
        });
      } catch (err) {
        if ((err as MetaMaskError)?.code !== MetaMaskErrors.UserRejectedRequest) {
          console.error(err);
          showNotification(
            NotificationFactory.createError(
              'Error - Request to remove a featured POAP failed',
              'Oops, something went wrong! 🤥',
            ),
          );
        }
        setLoadingIds((prevState) => {
          const { [poapTokenId]: _, ...newState } = prevState;
          return newState;
        });
      }
    },
    [walletAddress, signer, tokens?.accessToken, saveData, refetchData],
  );

  return (
    <FeaturedPOAPsContext.Provider
      value={{
        featuredPOAPsState,
        showHearts,
        isLoading: result.fetching,
        hasFetched: !!result.operation,
        loadingIds,
      }}
    >
      <FeaturedPOAPsDispatchContext.Provider value={{ addFeaturedPOAP, removeFeaturedPOAP }}>
        {children}
      </FeaturedPOAPsDispatchContext.Provider>
    </FeaturedPOAPsContext.Provider>
  );
};
