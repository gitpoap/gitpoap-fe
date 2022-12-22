import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';
import { REACT_APP_CLIENT_ID } from '../../../environment';
import { useApi } from '../../../hooks/useApi';
import { useTokens } from '../../../hooks/useTokens';
import { trackAddAccountConnection } from '../../../lib/tracking/events';
import { Notifications } from '../../../notifications';
import { OAuthConnectionType } from '../types';

export const useGithubAuth = () => {
  const api = useApi();
  const { tokens, setAccessToken, setRefreshToken } = useTokens();
  /* A react ref that tracks if GitHub auth is loading */
  const isGitHubAuthLoading = useRef(false);
  const { asPath, push } = useRouter();
  const redirectUri = typeof window !== 'undefined' ? `${window.location.href}?type=github` : '';
  const scopes = ['read'].join('%20');
  const githubAuthURL = `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`;

  const disconnect = useCallback(async () => {
    const tokens = await api.auth.githubDisconnect();

    if (tokens) {
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    } else {
      Notifications.error('Unable to disconnect GitHub account');
    }
  }, [api.auth, setAccessToken, setRefreshToken]);

  /* Redirect to github to authorize if not connected / logged in */
  const authorize = useCallback(() => {
    trackAddAccountConnection(OAuthConnectionType.GITHUB);
    void push(githubAuthURL);
  }, [githubAuthURL, push]);

  const authenticate = useCallback(
    async (code: string) => {
      const tokens = await api.auth.githubAuth(code);

      if (tokens) {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
      } else {
        Notifications.error('Unable to authenticate with GitHub');
      }
    },
    [setAccessToken, setRefreshToken, api.auth],
  );

  /* After requesting Github access, Github redirects back to your app with a code parameter. */
  useEffect(() => {
    const url = asPath;
    const baseUrl = url.split('?')[0];
    const urlSearchParam = url.split('?')[1];
    const urlParams = new URLSearchParams(urlSearchParam);
    const code = urlParams.get('code');
    const codeWithNoHash = code?.split('#')[0];
    const type = urlParams.get('type');

    /* If Github API returns the code parameter */
    if (
      type === OAuthConnectionType.GITHUB &&
      codeWithNoHash &&
      isGitHubAuthLoading.current === false &&
      tokens
    ) {
      isGitHubAuthLoading.current = true;
      void push(baseUrl);
      void authenticate(codeWithNoHash);
    }
  }, [authenticate, asPath, push, tokens]);

  return {
    disconnect,
    authorize,
  };
};
