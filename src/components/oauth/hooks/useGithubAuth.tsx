import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { REACT_APP_CLIENT_ID } from '../../../constants';
import { useApi } from '../../../hooks/useApi';
import { useTokens } from '../../../hooks/useTokens';
import { NotificationFactory } from '../../../notifications';

export const useGithubAuth = () => {
  const api = useApi();
  const { tokens, setAccessToken, setRefreshToken } = useTokens();
  const [isLoading, setIsLoading] = useState(false);
  /* A react ref that tracks if GitHub auth is loading */
  const isGitHubAuthLoading = useRef(false);
  const { asPath, push } = useRouter();
  const redirectUri = typeof window !== 'undefined' ? window.location.href : '';
  const scopes = ['read'].join('%20');
  const githubAuthURL = `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`;

  /* @TODO: THIS NEEDS TO CHANGE -> need to hit endpoint & refetch token */
  const disconnect = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  /* Redirect to github to authorize if not connected / logged in */
  const authorize = useCallback(() => push(githubAuthURL), [githubAuthURL, push]);

  const authenticate = useCallback(
    async (code: string) => {
      setIsLoading(true);

      const tokens = await api.auth.githubAuth(code);

      if (tokens) {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
      } else {
        showNotification(
          NotificationFactory.createError('Error', 'Unable to authenticate with GitHub'),
        );
      }
    },
    [setAccessToken, setRefreshToken, api.auth],
  );

  /* After requesting Github access, Github redirects back to your app with a code parameter. */
  useEffect(() => {
    const url = asPath;
    const hasCode = url.includes('?code=');

    /* If Github API returns the code parameter */
    if (hasCode && isLoading === false && isGitHubAuthLoading.current === false && tokens) {
      const newUrl = url.split('?code=');
      const code = newUrl[1];
      isGitHubAuthLoading.current = true;
      setIsLoading(true);
      push(newUrl[0]);
      authenticate(code);
    }
  }, [authenticate, asPath, push, isLoading, tokens]);

  return {
    disconnect,
    authorize,
    isLoading,
  };
};