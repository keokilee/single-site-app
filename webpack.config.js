var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: {
    javascript: './browser/scripts/home.js',
    html: './browser/index.html',
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
  },

  module: {
    preLoaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['eslint-loader']},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['flowcheck']},
    ],
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']},
      {test: /\.html$/, loader: 'file?name=[name].[ext]'},
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^(fs|ipc)$/),
    new StatsPlugin('build/stats.json', {
      chunkModules: true,
      exclude: [/node_modules[\\\/]react/],
    }),
  ],
  devServer: {
    stats: {
      cached: false,
      exclude: [/node_modules[\\\/]react/],
    },
  },
};
