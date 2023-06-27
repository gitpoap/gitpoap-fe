import { usePrivy } from '@privy-io/react-auth';
import { createContext, useCallback, useMemo, useState, useEffect } from 'react';

import { useApi } from '../../hooks/useApi';
import { useIsStaff } from '../../hooks/useIsStaff';
import { usePermissions } from '../../hooks/usePermissions';
import { useTokens } from '../../hooks/useTokens';
import { AuthenticateResponse } from '../../lib/api/auth';
import { trackConnectWallet, trackDisconnectWallet } from '../../lib/tracking/events';

type Props = {
  children: React.ReactNode;
};

export type User = {
  addressId: number | null;
  address: string | null;
  githubId: number | null;
  githubHandle: string | null;
  discordHandle: string | null;
  ensName: string | null;
  ensAvatarImageUrl: string | null;
  emailAddress: string | null;
  capabilities: {
    hasGithub: boolean;
    hasEmail: boolean;
    hasDiscord: boolean;
  };
  permissions: {
    canCreateCGs: boolean;
    isStaff: boolean;
  };
};

// Omit<PrivyInterface, 'user'>
export type AuthContext = {
  authenticated: boolean;
  ready: boolean;
  user: User | null;
  disconnect: () => void;
  handleConnect: () => void;
};

const initialState: AuthContext = {
  authenticated: false,
  ready: false,
  user: null,
  disconnect: () => {},
  handleConnect: () => {},
};

export const AuthContext = createContext<AuthContext>(initialState);

export const AuthContextProvider = (props: Props) => {
  const isStaff = useIsStaff();
  const {
    ready,
    authenticated,
    user,
    login,
    getAccessToken,
    logout,
    getEthereumProvider,
    setActiveWallet,
    linkWallet,
  } = usePrivy();
  const permissions = usePermissions();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const api = useApi();
  const { setAccessToken, tokens, payload } = useTokens();
  const address = user?.wallet?.address ?? '';

  const ethereum = getEthereumProvider();

  const disconnect = useCallback(async () => {
    trackDisconnectWallet(address);

    await logout();
    setAccessToken(null);
  }, [setAccessToken, logout, address]);

  useEffect(() => {
    if (tokens?.accessToken === null) {
      void disconnect();
    }
  }, [tokens, disconnect]);

  const handleConnect = useCallback(async () => {
    trackConnectWallet(payload?.address?.ethAddress);
    login();
  }, [login, payload?.address?.ethAddress]);

  // Privy Auth
  const authenticate = useCallback(async () => {
    const authToken = await getAccessToken();
    // without connected wallet, auth is not working on BE for now
    if (!authToken) {
      setIsAuthenticating(false);
      return;
    }

    const authData: AuthenticateResponse | null = await api.auth.authenticate(authToken);
    setIsAuthenticating(false);

    if (!authData) {
      return;
    }

    // update tokens
    setAccessToken(authData.tokens.accessToken);
  }, [getAccessToken, api.auth, setAccessToken, setIsAuthenticating]);

  // handle authentication with BE
  useEffect(() => {
    if (isAuthenticating) {
      void authenticate();
    }
  }, [authenticate, isAuthenticating]);

  // handle privy user change
  useEffect(() => {
    if (ready && authenticated && user) {
      setIsAuthenticating(true);
    }
  }, [ready, authenticated, user, setIsAuthenticating]);

  // handle account change
  useEffect(() => {
    const handleAccountChange = () => {
      ethereum.on('accountsChanged', (accounts: unknown) => {
        const connectedAccounts = accounts as string[];

        if (!authenticated) return;
        if (connectedAccounts[0].toLocaleLowerCase() === address.toLocaleLowerCase()) return;

        linkWallet();
        setActiveWallet(connectedAccounts[0]);
      });
    };

    void handleAccountChange();
  }, []);

  const authContext = useMemo(
    () => ({
      authenticated,
      ready,
      user:
        payload && ready && authenticated
          ? {
              githubId: payload.github?.githubId ?? null,
              githubHandle: payload.github?.githubHandle ?? null,
              discordHandle: payload.discord?.discordHandle ?? null,
              addressId: payload.address?.id ?? null,
              address: payload.address?.ethAddress ?? null,
              ensName: payload.address?.ensName ?? null,
              ensAvatarImageUrl: payload.address?.ensAvatarImageUrl ?? null,
              emailAddress: payload.email?.emailAddress ?? null,
              capabilities: {
                hasGithub: !!payload.github?.githubId,
                hasEmail: !!payload.email?.emailAddress,
                hasDiscord: !!payload.discord?.discordHandle,
              },
              permissions: {
                canCreateCGs: permissions.canCreateCGs,
                isStaff,
              },
            }
          : null,
      disconnect,
      handleConnect,
    }),
    [authenticated, ready, payload, isStaff, disconnect, handleConnect],
  );

  return <AuthContext.Provider value={{ ...authContext }}>{props.children}</AuthContext.Provider>;
};
