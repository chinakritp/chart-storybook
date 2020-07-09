const path = require('path')

// your app's webpack.config.js
const custom = require('../webpack.dev')

module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
  webpackFinal: (config) => {

    return { ...config, module: { ...config.module, rules: custom.module.rules } };
  },
};
