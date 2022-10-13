import { useLocalStorage } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import { FIVE_MINUTES_IN_MS } from '../constants';
import { useApi } from './useApi';
import { useIsOnline } from './useIsOnline';
import { usePageVisibility } from './usePageVisibility';

export const useRefreshTokens = () => {
  const [trackedIsPageVisible, setTrackedIsPageVisible] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>({
    key: 'refreshToken',
    defaultValue: null,
  });
  const [accessToken, setAccessToken] = useLocalStorage<string | null>({
    key: 'accessToken',
    defaultValue: null,
  });
  const api = useApi();

  const isOnline = useIsOnline();
  const isPageVisible = usePageVisibility();

  const disconnect = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  const performRefresh = useCallback(
    async (refreshToken: string | null, isOnline: boolean) => {
      if (refreshToken && isOnline) {
        const tokens = await api.auth.refresh();
        if (tokens?.accessToken && tokens?.refreshToken) {
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
        } else {
          disconnect();
        }
      }
    },
    [disconnect, api.auth],
  );

  /* This hook is used to refresh the access token when it expires */
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (accessToken && refreshToken && isPageVisible && isOnline) {
      timeout = setTimeout(() => performRefresh(refreshToken, isOnline), FIVE_MINUTES_IN_MS);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [accessToken, refreshToken, performRefresh, isPageVisible, isOnline]);

  /* This hook tracks visibility of the page when a refresh token is present */
  useEffect(() => {
    if (refreshToken) {
      if (isPageVisible && !trackedIsPageVisible) {
        /* Essentially perform on token refresh on page load & whenever the user focuses on the page */
        performRefresh(refreshToken, isOnline);
        setTrackedIsPageVisible(true);
      } else if (!isPageVisible && trackedIsPageVisible) {
        setTrackedIsPageVisible(false);
      }
    }
  }, [isPageVisible, performRefresh, trackedIsPageVisible, refreshToken, isOnline]);
};
