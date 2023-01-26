import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { PrivyProvider } from '@privy-io/react-auth';
import { Provider as URQLProvider } from 'urql';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import '../styles/styles.css';
import { GlobalStyles } from '../styles/globalStyles';
import { OAuthProvider } from '../components/oauth/OAuthContext';
import { FeaturesProvider } from '../components/FeaturesContext';
import { theme } from '../lib/theme';
import { ClaimContextProvider } from '../components/claims/ClaimContext';
import { LoadingBar } from '../components/LoadingBar';
import { HexagonPath } from '../components/shared/elements';
import { Web3ReactProvider } from '@web3-react/core';
import { getWeb3Provider } from '../helpers';
import { Web3ContextProvider } from '../components/wallet/Web3Context';
import { ModalsProvider } from '@mantine/modals';
import { client } from '../lib/urql';
import { setupExternalServiceClients } from '../lib/app';
import { Layout } from '../components/Layout';
import { Amplitude } from '../components/Amplitude';
import { TeamsProvider } from '../components/team/TeamsContext';
import { PRIVY_APP_ID } from '../environment';

setupExternalServiceClients();

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const TheApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        {/* <!-- Metadata for Viewport & Mantine (CANNOT GO IN _document.tsx) --> */}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <PrivyProvider appId={PRIVY_APP_ID}>
        <Web3ReactProvider getLibrary={getWeb3Provider}>
          <Web3ContextProvider>
            <Amplitude />
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
              <ModalsProvider>
                <NotificationsProvider autoClose={5000}>
                  <URQLProvider value={client}>
                    <OAuthProvider>
                      <FeaturesProvider>
                        <TeamsProvider>
                          <ClaimContextProvider>
                            <GlobalStyles />
                            <HexagonPath />
                            <LoadingBar />
                            {getLayout(<Component {...pageProps} />)}
                          </ClaimContextProvider>
                        </TeamsProvider>
                      </FeaturesProvider>
                    </OAuthProvider>
                  </URQLProvider>
                </NotificationsProvider>
              </ModalsProvider>
            </MantineProvider>
          </Web3ContextProvider>
        </Web3ReactProvider>
      </PrivyProvider>
    </>
  );
};

export default TheApp;
