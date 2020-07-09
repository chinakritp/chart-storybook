const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common('production'), {
  mode: 'production',
  optimization: {
    namedChunks: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].[hash].js',
        },
      },
    },
    nodeEnv: 'production',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ]
  }
});