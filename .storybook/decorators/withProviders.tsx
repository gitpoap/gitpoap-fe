import React from 'react';
import { createClient, Provider as URQLProvider } from 'urql';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from '../../src/helpers';

import { OAuthProvider } from '../../src/components/oauth/OAuthContext';
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
      <Web3ReactProvider getLibrary={getLibrary}>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider autoClose={5000}>
            <URQLProvider value={client}>
              <OAuthProvider>
                <FeaturesProvider>{storyFn()}</FeaturesProvider>
              </OAuthProvider>
            </URQLProvider>
          </NotificationsProvider>
        </MantineProvider>
      </Web3ReactProvider>
    </RouterContext.Provider>
  );
};
