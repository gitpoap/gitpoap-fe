import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import {
  REACT_APP_CLIENT_ID,
  REACT_APP_REDIRECT_URI,
  GITPOAP_API_URL,
  FIVE_MINUTES,
} from '../../constants';

type StoredGHUserData = {
  githubId: number;
  githubHandle: string;
};

type AuthState = {
  hasLoadedLocalStorage: boolean;
  isLoading: boolean;
  errorMessage: string;
  isLoggedIntoGitHub: boolean;
  user: StoredGHUserData | null;
};

type AuthContextData = {
  authState: AuthState;
  tokens: Tokens | null;
  setAuthState: (authState: AuthState) => void;
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

export const getInitialState = (): AuthState => ({
  hasLoadedLocalStorage: false,
  isLoading: false,
  errorMessage: '',
  isLoggedIntoGitHub: false,
  user: null,
});

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>(getInitialState());
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const router = useRouter();
  const redirectUri = REACT_APP_REDIRECT_URI + router.asPath;
  const githubAuthURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`;

  const handleLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIntoGitHub');
    }

    setTokens(null);
    setAuthState({
      ...authState,
      isLoggedIntoGitHub: false,
      user: null,
    });
  }, [authState]);

  const performRefresh = useCallback(
    async (refreshToken: string) => {
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

        localStorage.setItem('accessToken', tokenRes.accessToken);
        localStorage.setItem('refreshToken', tokenRes.refreshToken);
        setTokens({
          accessToken: tokenRes.accessToken,
          refreshToken: tokenRes.refreshToken,
        });
      } catch (err) {
        handleLogout();
        console.warn(err);
      }
    },
    [handleLogout],
  );

  /* Redirect to github to authorize if not connected / logged in */
  const authorizeGitHub = useCallback(() => router.push(githubAuthURL), [githubAuthURL, router]);

  /* Load values from localStorage into state on page load */
  useEffect(() => {
    const isLoggedIntoGitHub = Boolean(localStorage.getItem('isLoggedIntoGitHub'));
    const userData = localStorage.getItem('user');
    const user = userData ? (JSON.parse(userData) as StoredGHUserData) : null;
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!authState.hasLoadedLocalStorage) {
      if (accessToken && refreshToken) {
        performRefresh(refreshToken);
        setTokens({
          accessToken,
          refreshToken,
        });
      }
      setAuthState({
        ...authState,
        hasLoadedLocalStorage: true,
        isLoggedIntoGitHub,
        user,
      });
    }
  }, [authState, performRefresh]);

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

        localStorage.setItem('accessToken', tokenRes.accessToken);
        localStorage.setItem('refreshToken', tokenRes.refreshToken);
        localStorage.setItem('isLoggedIntoGitHub', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(selectedUserData));

        setTokens({
          accessToken: tokenRes.accessToken,
          refreshToken: tokenRes.refreshToken,
        });
        setAuthState({
          ...authState,
          isLoggedIntoGitHub: true,
          user: selectedUserData,
        });
      } catch (err) {
        console.warn(err);
        setAuthState({
          ...authState,
          isLoading: false,
          errorMessage: 'Sorry! Authentication failed',
        });
      }
    },
    [authState, setAuthState],
  );

  /* After requesting Github access, Github redirects back to your app with a code parameter. */
  useEffect(() => {
    const url = router.asPath;
    const hasCode = url.includes('?code=');

    /* If Github API returns the code parameter */
    if (hasCode && authState.isLoading === false) {
      const newUrl = url.split('?code=');
      const code = newUrl[1];
      router.push(newUrl[0]);
      setAuthState({
        ...authState,
        isLoading: true,
      });

      authenticate(code);
    }
  }, [authState, setAuthState, authenticate, router]);

  /* This hook is used to refresh the access token when it expires */
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!!tokens?.accessToken && !!tokens?.refreshToken) {
      timeout = setTimeout(() => performRefresh(tokens.refreshToken), FIVE_MINUTES);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [tokens?.accessToken, tokens?.refreshToken, performRefresh]);

  return (
    <AuthContext.Provider
      value={{ authState, tokens, setAuthState, handleLogout, authorizeGitHub }}
    >
      {children}
    </AuthContext.Provider>
  );
};
