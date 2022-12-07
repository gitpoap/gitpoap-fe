import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useClient } from 'urql';
import {
  FeaturedPoapsDocument,
  FeaturedPoapsQuery,
  useFeaturedPoapsQuery,
} from '../../graphql/generated-gql';
import { MetaMaskError, MetaMaskErrors } from '../../types';
import { GITPOAP_API_URL } from '../../constants';
import { Notifications } from '../../notifications';
import { useProfileContext } from './ProfileContext';
import { useTokens } from '../../hooks/useTokens';
import { useWeb3Context } from '../wallet/Web3Context';

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

export const FeaturedPOAPsContext = createContext<FeaturedPOAPsData>({} as FeaturedPOAPsData);
export const FeaturedPOAPsDispatchContext = createContext<FeaturedPOAPsDispatch>(
  {} as FeaturedPOAPsDispatch,
);

export const useFeaturedPOAPs = () => useContext(FeaturedPOAPsContext);
export const useFeaturedPOAPsDispatch = () => useContext(FeaturedPOAPsDispatchContext);

/* -- The Provider -- */
type Props = {
  children: React.ReactNode;
};

export const FeaturedPOAPsProvider = ({ children }: Props) => {
  const { address } = useWeb3Context();
  const { profileData } = useProfileContext();
  const { tokens } = useTokens();
  const [showHearts, setShowHearts] = useState(false);
  const [featuredPOAPsState, setFeaturedPOAPsState] = useState<FeaturedPOAPsState>(
    getInitialState(),
  );
  const [loadingIds, setLoadingIds] = useState<Record<string, true>>({} as Record<string, true>);
  const gqlClient = useClient();
  const profileAddress = profileData?.address;
  const [result] = useFeaturedPoapsQuery({
    variables: {
      address: profileData?.address ?? '',
    },
  });

  const checkIfUserOwnsProfile = useCallback(
    (profileAddress: string) => {
      if (profileAddress.toLocaleLowerCase() === address?.toLocaleLowerCase()) {
        setShowHearts(true);
      } else {
        setShowHearts(false);
      }
    },
    [address],
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
      .query(FeaturedPoapsDocument, { address: profileAddress }, { requestPolicy: 'network-only' })
      .toPromise();
  }, [gqlClient, profileAddress]);

  const addFeaturedPOAP = useCallback(
    async (poapTokenId: string) => {
      setLoadingIds((prevState) => ({ ...prevState, [poapTokenId]: true }));

      try {
        await fetch(`${GITPOAP_API_URL}/featured/${poapTokenId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
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
          Notifications.error('Error - Request to add a featured POAP failed');
        }
        setLoadingIds((prevState) => {
          const { [poapTokenId]: _, ...newState } = prevState;
          return newState;
        });
      }
    },
    [tokens?.accessToken, saveData, refetchData],
  );

  const removeFeaturedPOAP = useCallback(
    async (poapTokenId: string) => {
      setLoadingIds((prevState) => ({ ...prevState, [poapTokenId]: true }));

      try {
        await fetch(`${GITPOAP_API_URL}/featured/${poapTokenId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
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
          Notifications.error('Error - Request to remove a featured POAP failed');
        }
        setLoadingIds((prevState) => {
          const { [poapTokenId]: _, ...newState } = prevState;
          return newState;
        });
      }
    },
    [tokens?.accessToken, saveData, refetchData],
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
