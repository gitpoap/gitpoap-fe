import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { ServerStyleSheet } from 'styled-components';

const stylesServer = createStylesServer();

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <ServerStyles html={initialProps.html} server={stylesServer} />
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Metadata for SEO --> */}
          <meta
            name="keywords"
            content="ethereum, POAP, proof of attendance protocol, gitPOAP, github, git, token, wallet, badge, issuance, blockchain, crypto, l2"
          />
          <meta name="author" content="GitPOAP" />
          <link rel="canonical" href="https://gitpoap.io" />

          {/* <!-- Metadata for link cards --> */}
          <meta property="og:site_name" content="GitPOAP " />
          <meta
            property="og:title"
            content="GitPOAP - Mint POAPs to your community's contributors."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://gitpoap.io" />
          <meta property="og:image" content="https://gitpoap.io/og-image-512x512.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="256" />
          <meta property="og:image:height" content="256" />
          <meta
            property="og:description"
            content="GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          />

          <meta property="twitter:card" content="summary" />
          <meta property="twitter:url" content="https://gitpoap.io/" />
          <meta
            property="twitter:title"
            content="GitPOAP - Mint POAPs to your community's contributors."
          />
          <meta
            property="twitter:description"
            content="GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          />
          <meta property="twitter:image" content="https://gitpoap.io/og-image-512x512.png" />

          {/* <!-- Google Fonts --> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=PT+Mono&display=swap"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=PT+Mono&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
            rel="stylesheet"
          />

          {/* <!-- Icon files for mobile, mac, windows, legacy --> */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" href="/favicon.svg" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

          {/*  <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-67H8HES3Z3" />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-67H8HES3Z3', {
                  'anonymize_ip': true,
                });
                `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
