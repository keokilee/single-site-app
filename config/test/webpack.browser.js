const path = require('path');

const BROWSER_DIR = path.join(process.cwd(), 'browser', 'app');
const TEST_DIR = path.join(process.cwd(), 'spec', 'browser');

module.exports = {
  context: process.cwd(),
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
      'app': BROWSER_DIR
    },
    extensions: ['', '.js', '.jsx']
  }
};
