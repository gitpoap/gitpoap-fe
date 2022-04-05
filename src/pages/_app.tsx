import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { createClient, Provider as URQLProvider } from 'urql';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import * as Sentry from '@sentry/browser';
import { GlobalStyles } from '../styles/globalStyles';
import { Web3ContextProvider } from '../components/wallet/Web3ContextProvider';
import { AuthProvider } from '../components/github/AuthContext';
import { FeaturesProvider } from '../components/FeaturesContext';
import { Layout } from '../components/Layout';

const client = createClient({
  url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
});

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export type Page<P = unknown> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const TheApp = ({ Component, pageProps }: Props) => {
  /* Use custom page-specific layout once / if needed */
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return (
    <Web3ContextProvider>
      <MantineProvider theme={{ colorScheme: 'dark' }}>
        <NotificationsProvider autoClose={5000}>
          <URQLProvider value={client}>
            <AuthProvider>
              <FeaturesProvider>
                <GlobalStyles />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </FeaturesProvider>
            </AuthProvider>
          </URQLProvider>
        </NotificationsProvider>
      </MantineProvider>
    </Web3ContextProvider>
  );
};

export default TheApp;
