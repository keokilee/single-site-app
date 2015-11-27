const webpack = require('webpack');
const path = require('path');

const BROWSER_DIR = path.join(process.cwd(), 'browser', 'app');

module.exports = {
  context: process.cwd(),
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './browser/app/entry.jsx'
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      include: BROWSER_DIR
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: BROWSER_DIR,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'build'),
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['electron'])
  ],
  resolve: {
    extensions: ['', '.jsx', '.js']
  }
};
