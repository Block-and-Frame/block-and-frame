const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
  modules: path.join(__dirname, 'node_modules'),
};

module.exports = {
  devtool: 'eval-source-map',
  context: PATHS.app,
  entry: [
    'webpack-hot-middleware/client',
    './index.js',
  ],
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: PATHS.app,
      },
      {
        test: /\.js?$/,
        loader: 'eslint-loader',
        exclude: [PATHS.modules, PATHS.dist],
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),

    // No errors plugin keeps webpack from building when there are linter errors.
    // new webpack.NoErrorsPlugin(),
  ],
};
