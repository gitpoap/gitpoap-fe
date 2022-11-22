import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';
import { DISCORD_CLIENT_ID } from '../../../constants';
import { useApi } from '../../../hooks/useApi';
import { useTokens } from '../../../hooks/useTokens';
import { Notifications } from '../../../notifications';
import { OAuthConnectionType } from '../types';

export const useDiscordAuth = () => {
  const api = useApi();
  const { tokens, setAccessToken, setRefreshToken } = useTokens();
  /* A react ref that tracks if Discord auth is loading */
  const isDiscordAuthLoading = useRef(false);
  const { asPath, push } = useRouter();
  const redirectUri = typeof window !== 'undefined' ? `${window.location.href}?type=discord` : '';
  const scopes = ['identify'].join('%20');
  const discordAuthURL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&response_type=code&scope=${scopes}`;

  const disconnect = useCallback(async () => {
    const tokens = await api.auth.discordDisconnect();

    if (tokens) {
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    } else {
      Notifications.error('Unable to disconnect Discord account');
    }
  }, [api.auth, setAccessToken, setRefreshToken]);

  /* Redirect to discord to authorize if not connected / logged in */
  const authorize = useCallback(() => push(discordAuthURL), [discordAuthURL, push]);

  const authenticate = useCallback(
    async (code: string) => {
      const tokens = await api.auth.discordAuth(code);

      if (tokens) {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
      } else {
        Notifications.error('Unable to authenticate with Discord');
      }
    },
    [setAccessToken, setRefreshToken, api.auth],
  );

  /* After requesting Discord access, Discord redirects back to your app with a code parameter. */
  useEffect(() => {
    const url = asPath;
    const baseUrl = url.split('?')[0];
    const urlSearchParam = url.split('?')[1];
    const urlParams = new URLSearchParams(urlSearchParam);
    const code = urlParams.get('code');
    const type = urlParams.get('type');

    /* If Discord API returns the code parameter */
    if (
      type === OAuthConnectionType.DISCORD &&
      code &&
      isDiscordAuthLoading.current === false &&
      tokens
    ) {
      isDiscordAuthLoading.current = true;
      void push(baseUrl);
      void authenticate(code);
    }
  }, [authenticate, asPath, push, tokens]);

  return {
    disconnect,
    authorize,
  };
};
