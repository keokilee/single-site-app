const path = require('path');

const BROWSER_DIR = path.join(__dirname, '..', 'browser', 'app');
const STYLES_DIR = path.join(__dirname, '..', 'browser', 'styles');
const TEST_DIR = path.join(__dirname, '..', 'spec', 'browser');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  entry: {},
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: ['isparta-instrumenter'],
      include: BROWSER_DIR
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: BROWSER_DIR,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    }, {
      test: /\.jsx?$/,
      include: TEST_DIR,
      loader: 'babel'
    }]
  },
  output: {},
  resolve: {
    alias: {
      'styles': STYLES_DIR,
      'app': BROWSER_DIR
    },
    extensions: ['', '.js', '.jsx']
  }
};
