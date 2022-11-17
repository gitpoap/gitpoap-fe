const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.us-east-2.amazonaws.com',
      },
    ],
    domains: [
      'assets.poap.xyz',
      'poap.xyz',
      'www.poap.xyz',
      'github.com',
      'githubusercontent.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
  sentry: {
    hideSourceMaps: true,
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/qa3mfPvjWm',
        permanent: false,
        basePath: false,
      },
      {
        source: '/issues',
        destination: 'https://2jxwpvhqb4y.typeform.com/to/VNXmuNQG',
        permanent: false,
        basePath: false,
      },
      {
        source: '/launch-party',
        destination:
          'https://medium.com/gitpoap/gitpoap-launch-poap-art-painting-party-224faf0a7667',
        permanent: false,
        basePath: false,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/gitpoap',
        permanent: false,
        basePath: false,
      },
      {
        source: '/devcon-raffle',
        destination: 'https://poap.fun/raffle/1786',
        permanent: false,
        basePath: false,
      },
      {
        source: '/custom-gitpoaps',
        destination: 'https://medium.com/gitpoap/introducing-custom-gitpoaps-64bbe4204511',
        permanent: false,
        basePath: false,
      },
      {
        source: '/links/design-guide',
        destination:
          'https://gitpoap.notion.site/GitPOAP-Design-Guide-Requirements-9a843acfe1c7490bbfcdab2d1a47e8af',
        permanent: false,
        basePath: false,
      },
      {
        source: '/links/canva-template',
        destination:
          'https://www.canva.com/design/DAFQoFm0dhQ/H17FASlR17kwLk6m303hBw/view?utm_content=DAFQoFm0dhQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview',
        permanent: false,
        basePath: false,
      },
    ];
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        stream: false,
        os: false,
        https: false,
        buffer: require.resolve('buffer'),
        http: false,
      };
    }

    return config;
  },
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
