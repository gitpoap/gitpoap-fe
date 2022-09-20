const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
    {
      name: 'storybook-addon-swc',
      options: {
        enable: true,
        enableSwcLoader: true,
        enableSwcMinify: true,
      },
    },
  ],
  framework: '@storybook/react',
  staticDirs: ['../public'],
  typescript: { reactDocgen: false },
  managerWebpack(config) {
    config.plugins.push(new SpeedMeasurePlugin());
    return config;
  },
  webpackFinal(config) {
    config.plugins.push(new SpeedMeasurePlugin());
    return config;
  },
};
