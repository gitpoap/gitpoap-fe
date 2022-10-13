import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createClient, Provider as URQLProvider } from 'urql';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import * as Sentry from '@sentry/browser';
import '../styles/styles.css';
import { GlobalStyles } from '../styles/globalStyles';
import { Web3ContextProvider } from '../components/wallet/Web3ContextProvider';
import { OAuthProvider } from '../components/oauth/OAuthContext';
import { FeaturesProvider } from '../components/FeaturesContext';
import { Layout } from '../components/Layout';
import { theme } from '../lib/theme';
import { ClaimContextProvider } from '../components/ClaimModal/ClaimContext';
import { LoadingBar } from '../components/LoadingBar';

const client = createClient({
  url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
});

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  /* Only enable Sentry if the app is in production mode */
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'production',
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    const error = hint?.originalException;

    if (error) {
      if (event.user?.ip_address) {
        delete event.user.ip_address;
      }
      if (event.user?.email) {
        delete event.user.email;
      }
    }

    return event;
  },
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
    <>
      <Head>
        {/* <!-- Metadata for Viewport & Mantine (CANNOT GO IN _document.tsx) --> */}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Web3ContextProvider>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider autoClose={5000}>
            <URQLProvider value={client}>
              <OAuthProvider>
                <FeaturesProvider>
                  <ClaimContextProvider>
                    <GlobalStyles />
                    <Layout>
                      <LoadingBar />
                      {getLayout(<Component {...pageProps} />)}
                    </Layout>
                  </ClaimContextProvider>
                </FeaturesProvider>
              </OAuthProvider>
            </URQLProvider>
          </NotificationsProvider>
        </MantineProvider>
      </Web3ContextProvider>
    </>
  );
};

export default TheApp;
