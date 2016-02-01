const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const BROWSER_DIR = path.join(process.cwd(), 'browser', 'app')
const STYLES_DIR = path.join(process.cwd(), 'browser', 'styles')
const DIST_DIR = path.join(process.cwd(), 'dist', 'browser', 'assets')

module.exports = {
  context: process.cwd(),
  devtool: 'source-map',
  entry: [
    './browser/app/entry.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: BROWSER_DIR,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
    }]
  },
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ExternalsPlugin('commonjs', ['electron', ...Object.keys(process.binding('natives'))]),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('app.css')
  ],
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      'styles': STYLES_DIR,
      'app': BROWSER_DIR
    }
  }
}
