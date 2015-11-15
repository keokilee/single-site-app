const webpack = require('webpack');
const path = require('path');

const BROWSER_DIR = path.join(__dirname, '..', 'browser', 'app');
const TEST_DIR = path.join(__dirname, '..', 'spec', 'browser');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  entry: {},
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      include: BROWSER_DIR
    }, {
      test: /\.jsx?$/,
      loaders: ['isparta-instrumenter'],
      include: BROWSER_DIR
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: BROWSER_DIR,
      loader: 'babel'
    }, {
      test: /\.jsx?$/,
      include: TEST_DIR,
      loader: 'babel'
    }]
  },
  output: {},
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: BROWSER_DIR
  }
};
