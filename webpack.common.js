const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Files regexes
const assetRegex = /\.(gif|png|jp(e*)g|svg|woff|woff2)$/;
const cssRegex = /\.(css|scss)$/;
const cssModuleRegex = /\.module\.(scss|sass)$/;
const mdxRegex = /\.mdx$/;
const jsRegex = /\.(js|jsx)$/;
const yamlRegex = /\.yaml$/;

module.exports = webpackEnv => {
  const isEnvDevelopment = webpackEnv === 'development';

  // Common function to get style loaders
  const getStyleLoaders = cssOptions => {
    const loaders = [
      isEnvDevelopment ? {
        loader: 'style-loader',
      } : {
          loader: MiniCssExtractPlugin.loader,
        },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: isEnvDevelopment,
          ...cssOptions,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ],
          sourceMap: isEnvDevelopment,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isEnvDevelopment,
        },
      },
    ].filter(Boolean);

    return loaders;
  };

  return {
    entry: {
      config: path.join(__dirname, 'public', 'config.js'),
      bundle: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: chunkData =>
        chunkData.chunk.name === 'config' ? '[name].js' : '[name].[hash].js',
    },
    module: {
      rules: [
        {
          test: jsRegex,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              plugins: ['lodash'],
            },
          }],
        },
        {
          test: mdxRegex,
          use: ['babel-loader', '@mdx-js/loader'],
        },
        {
          test: yamlRegex,
          use: 'js-yaml-loader',
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders(),
        },
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          }),
        },
        {
          test: assetRegex,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
            },
          }],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        'mapbox-gl$': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: './src/assets/images/favicon.png',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'style.[hash].css',
        chunkFilename: '[name].[hash].css',
      }),
    ].filter(Boolean),
  }
};
