import React from 'react';
import { createClient, Provider as URQLProvider } from 'urql';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Web3ContextProvider } from '../../src/components/wallet/Web3ContextProvider';
import { AuthProvider } from '../../src/components/github/AuthContext';
import { FeaturesProvider } from '../../src/components/FeaturesContext';
import { theme } from '../../src/lib/theme';

const client = createClient({
  url: 'http://localhost:3001/graphql',
  requestPolicy: 'network-only',
});

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  /* @ts-ignore */
  push: () => {},
  /* @ts-ignore */
  replace: () => {},
  reload: () => {},
  back: () => {},
  /* @ts-ignore */
  prefetch: () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isLocaleDomain: false,
};

export const withProviders = (storyFn) => {
  return (
    <RouterContext.Provider value={mockRouter}>
      <Web3ContextProvider>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider autoClose={5000}>
            <URQLProvider value={client}>
              <AuthProvider>
                <FeaturesProvider>{storyFn()}</FeaturesProvider>
              </AuthProvider>
            </URQLProvider>
          </NotificationsProvider>
        </MantineProvider>
      </Web3ContextProvider>
    </RouterContext.Provider>
  );
};
