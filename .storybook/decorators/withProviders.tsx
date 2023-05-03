import React from 'react';
import { createClient, Provider as URQLProvider } from 'urql';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { PrivyProvider } from '@privy-io/react-auth';

import { AuthContextProvider } from '../../src/components/wallet/AuthContext';
import { FeaturesProvider } from '../../src/components/FeaturesContext';
import { theme } from '../../src/lib/theme';
import { PRIVY_APP_ID } from '../../src/environment';
import { BackgroundPanel, TextAccent } from '../../src/colors';

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
      <PrivyProvider
        appId={PRIVY_APP_ID}
        config={{
          appearance: {
            accentColor: TextAccent,
            logo: 'https://gitpoap.io/gitpoap_logo.svg',
            theme: BackgroundPanel,
          },
        }}
      >
        <AuthContextProvider>
          <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider autoClose={5000}>
              <URQLProvider value={client}>
                <FeaturesProvider>{storyFn()}</FeaturesProvider>
              </URQLProvider>
            </NotificationsProvider>
          </MantineProvider>
        </AuthContextProvider>
      </PrivyProvider>
    </RouterContext.Provider>
  );
};
