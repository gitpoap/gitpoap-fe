import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { ServerStyleSheet } from 'styled-components';

const stylesServer = createStylesServer();

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
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
        styles: [
          <>
            {initialProps.styles}
            <ServerStyles html={initialProps.html} server={stylesServer} />
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Universal Metadata for SEO --> */}
          <meta
            name="keywords"
            content="ethereum, POAP, proof of attendance protocol, gitPOAP, github, git, token, wallet, badge, issuance, blockchain, crypto, l2"
          />
          <meta name="author" content="GitPOAP" />
          <link rel="canonical" href="https://gitpoap.io" />

          {/* <!-- Metadata for Viewport & Mantine --> */}
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

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
