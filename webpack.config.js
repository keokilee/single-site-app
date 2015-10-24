const webpack = require('webpack');
const path = require('path');

const BROWSER_DIR = path.join(__dirname, 'browser', 'scripts');

module.exports = {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './browser/scripts/home.js'
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      include: BROWSER_DIR
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: BROWSER_DIR,
      loaders: ['babel']
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // new webpack.IgnorePlugin(/^(fs|ipc)$/)
  ],
  resolve: {
    root: [
      path.resolve('./browser')
    ],
    extensions: ['', '.jsx', '.js']
  }
};
