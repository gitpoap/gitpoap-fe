import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { REACT_APP_CLIENT_ID, GITPOAP_API_URL, FIVE_MINUTES_IN_MS } from '../../constants';
import { showNotification } from '@mantine/notifications';
import { NotificationFactory } from '../../notifications';
import { useLocalStorage } from '@mantine/hooks';
import { usePageVisibility } from '../../hooks/usePageVisibility';
import { useIsOnline } from '../../hooks/useIsOnline';

type StoredGHUserData = {
  githubId: number;
  githubHandle: string;
};

type AuthContextData = {
  tokens: Tokens | null;
  isLoggedIntoGitHub: boolean;
  canSeeAdmin: boolean;
  isDev: boolean;
  user: StoredGHUserData | null;
  handleLogout: () => void;
  authorizeGitHub: () => void;
};

type Tokens = {
  /* GitPOAP issued access token */
  accessToken: string;
  /* GitPOAP issued refresh token */
  refreshToken: string;
};

type AccessTokenPayload = {
  authTokenId: number;
  exp: number;
  githubHandle: string;
  githubId: number;
  iat: number;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const isPageVisible = usePageVisibility();
  /* A react ref that tracks if GitHub auth is loading */
  const isGitHubAuthLoading = useRef(false);
  const [trackedIsPageVisible, setTrackedIsPageVisible] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>({
    key: 'refreshToken',
    defaultValue: null,
  });
  const [accessToken, setAccessToken] = useLocalStorage<string | null>({
    key: 'accessToken',
    defaultValue: null,
  });
  const [isLoggedIntoGitHub, setIsLoggedIntoGitHub] = useLocalStorage<boolean>({
    key: 'isLoggedIntoGitHub',
    defaultValue: false,
  });
  const [user, setUser] = useLocalStorage<StoredGHUserData | null>({
    key: 'gitHubUser',
    defaultValue: null,
  });
  const { asPath, push } = useRouter();
  const isOnline = useIsOnline();
  const redirectUri = typeof window !== 'undefined' ? window.location.href : '';
  const scopes = ['read'].join('%20');
  const githubAuthURL = `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`;

  const handleLogout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsLoggedIntoGitHub(false);
    setUser(null);
  }, []);

  const performRefresh = useCallback(
    async (refreshToken: string | null, isOnline: boolean) => {
      if (refreshToken && isOnline) {
        try {
          const res = await fetch(`${GITPOAP_API_URL}/github/refresh`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }),
          });

          if (!res.ok) {
            throw new Error(res.statusText);
          }

          const tokenRes: Tokens = await res.json();

          if (tokenRes.accessToken && tokenRes.refreshToken) {
            setAccessToken(tokenRes.accessToken);
            setRefreshToken(tokenRes.refreshToken);
          } else {
            throw new Error('No access token or refresh token returned');
          }
        } catch (err) {
          handleLogout();
          console.warn(err);
        }
      }
    },
    [handleLogout],
  );

  /* Redirect to github to authorize if not connected / logged in */
  const authorizeGitHub = useCallback(() => push(githubAuthURL), [githubAuthURL, push]);

  const authenticate = useCallback(
    async (code: string) => {
      try {
        const res = await fetch(`${GITPOAP_API_URL}/github`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const tokenRes: Tokens = await res.json();
        const accessTokenPayload = jwtDecode<AccessTokenPayload>(tokenRes.accessToken);

        const selectedUserData = {
          githubId: accessTokenPayload.githubId,
          githubHandle: accessTokenPayload.githubHandle,
        };

        setAccessToken(tokenRes.accessToken);
        setRefreshToken(tokenRes.refreshToken);
        setIsLoggedIntoGitHub(true);
        setUser(selectedUserData);
        setIsLoading(false);
      } catch (err) {
        console.warn(err);
        showNotification(
          NotificationFactory.createError(
            'Error - Request Failed',
            'Oops, something went wrong! 🤥',
          ),
        );
        setIsLoading(false);
      }
    },
    [setAccessToken, setRefreshToken, setIsLoggedIntoGitHub, setUser],
  );
  /* After requesting Github access, Github redirects back to your app with a code parameter. */
  useEffect(() => {
    const url = asPath;
    const hasCode = url.includes('?code=');

    /* If Github API returns the code parameter */
    if (hasCode && isLoading === false && isGitHubAuthLoading.current === false) {
      const newUrl = url.split('?code=');
      const code = newUrl[1];
      isGitHubAuthLoading.current = true;
      setIsLoading(true);
      push(newUrl[0]);
      authenticate(code);
    }
  }, [authenticate, asPath, push, isLoading]);

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

  let tokens = null;
  if (accessToken && refreshToken) {
    tokens = {
      accessToken,
      refreshToken,
    };
  }

  const isDev = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'development';
  const canSeeAdmin = isDev || isLoggedIntoGitHub;

  return (
    <AuthContext.Provider
      value={{
        tokens,
        isLoggedIntoGitHub,
        canSeeAdmin,
        user,
        handleLogout,
        authorizeGitHub,
        isDev,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
