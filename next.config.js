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
    domains: [
      'assets.poap.xyz',
      'poap.xyz',
      'www.poap.xyz',
      'github.com',
      'githubusercontent.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      's3.us-east-2.amazonaws.com',
      'ens-avatar-cache-prod.s3.us-east-2.amazonaws.com',
    ],
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
