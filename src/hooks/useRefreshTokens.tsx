import { useCallback, useEffect, useState } from 'react';
import { FIVE_MINUTES_IN_MS, FIVE_MINUTES_IN_S } from '../constants';
import { useApi } from './useApi';
import { useIsOnline } from './useIsOnline';
import { usePageVisibility } from './usePageVisibility';
import { useTokens } from './useTokens';
import { DateTime } from 'luxon';

export const useRefreshTokens = () => {
  const [trackedIsPageVisible, setTrackedIsPageVisible] = useState<boolean>(false);
  const { tokens, setRefreshToken, setAccessToken, payload } = useTokens();
  const refreshToken = tokens?.refreshToken ?? null;
  const accessToken = tokens?.accessToken ?? null;

  const api = useApi();

  const isOnline = useIsOnline();
  const isPageVisible = usePageVisibility();

  const disconnect = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
  }, [setAccessToken, setRefreshToken]);

  const performRefresh = useCallback(
    async (refreshToken: string | null, isOnline: boolean) => {
      // we refresh access token if only access token is expired
      const accessTokenExp = payload?.exp;
      if (refreshToken && isOnline && accessTokenExp) {
        const isExpired = DateTime.now().toUnixInteger() + FIVE_MINUTES_IN_S > accessTokenExp;
        if (isExpired) {
          const tokens = await api.auth.refresh();
          if (tokens?.accessToken && tokens?.refreshToken) {
            setAccessToken(tokens.accessToken);
            setRefreshToken(tokens.refreshToken);
          } else {
            disconnect();
          }
        }
      }
    },
    [disconnect, api.auth, payload?.exp, setAccessToken, setRefreshToken],
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
        void performRefresh(refreshToken, isOnline);
        setTrackedIsPageVisible(true);
      } else if (!isPageVisible && trackedIsPageVisible) {
        setTrackedIsPageVisible(false);
      }
    }
  }, [isPageVisible, performRefresh, trackedIsPageVisible, refreshToken, isOnline]);
};
