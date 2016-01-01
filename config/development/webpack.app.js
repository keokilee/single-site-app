const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const ROOT_DIR = process.cwd();
const BUILD_DIR = path.join(ROOT_DIR, 'build', 'app');
const APP_DIR = path.join(ROOT_DIR, 'app');

const nodeModules = fs.readdirSync(path.join(ROOT_DIR, 'node_modules'))
                      .filter(module => ['.bin'].indexOf(module) === -1)
                      .reduce((modules, module) => {
                        modules[module] = `commonjs ${module}`;
                        return modules;
                      }, {});

module.exports = {
  context: process.cwd(),
  devtool: 'eval',
  entry: './app/index.js',
  externals: nodeModules,
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      include: APP_DIR
    }],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  },
  output: {
    filename: 'app.bundle.js',
    path: BUILD_DIR
  },
  plugins: [
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
    new webpack.ExternalsPlugin('commonjs', ['electron', ...Object.keys(process.binding('natives'))])
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'] // Universal React, maybe?
  },
  target: 'electron'
};
