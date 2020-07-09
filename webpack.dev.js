const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common('development'), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    hot: true,
  }
});