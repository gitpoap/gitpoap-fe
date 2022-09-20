const path = require('path');
const webpack = require('webpack');

/*
 * NOTE: See this Stack Overflow post for more information regarding updating storybook config
 * to enable webpack 5: https://stackoverflow.com/questions/61375674/upgrade-to-webpack-5-breaking-storybook-5
 */
module.exports = async ({ config, mode }) => {
  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.js', 'tsx'];
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    os: require.resolve('os-browserify/browser'),
    https: false,
    http: require.resolve('stream-http'),
    buffer: require.resolve('buffer/'),
    url: require.resolve('url/'),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  // Return the altered config
  return config;
};
