const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.base.babel')

const ENV = process.env.NODE_ENV || 'development'
const BROWSER_DIR = path.join(process.cwd(), 'browser', 'app')

let config = {
  ...baseConfig,
  entry: [
    './browser/app/entry.jsx'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: baseConfig.plugins
}

switch (ENV) {
  case 'development':
    config = {
      ...config,
      entry: [
        ...config.entry,
        'webpack-hot-middleware/client'
      ],
      module: {
        ...config.module,
        loaders: [
          ...config.module.loaders,
          {
            test: /\.css$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
              'postcss'
            ]
          }
        ]
      },
      output: {
        ...config.output,
        path: path.join(process.cwd(), 'build')
      },
      plugins: [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin()
      ]
    }

    break
  case 'test':
    config = {
      ...config,
      devtool: 'inline-source-map',
      entry: {},
      module: {
        ...config.module,
        preLoaders: [{
          test: /\.jsx?$/,
          loader: 'babel-istanbul',
          include: BROWSER_DIR,
          query: {
            cacheDirectory: true
          }
        }],
        loaders: [
          ...config.module.loaders,
          {
            test: /\.css$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
              'postcss'
            ]
          }
        ]
      },
      output: {}
    }

    break
  default:
    config = {
      ...config,
      devtool: 'source-map',
      module: {
        ...config.module,
        loaders: [
          ...config.module.loaders,
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            )
          }
        ]
      },
      output: {
        ...config.output,
        path: path.join(process.cwd(), 'dist', 'browser', 'assets')
      },
      plugins: [
        ...config.plugins,
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new ExtractTextPlugin('app.css')
      ]
    }
}

module.exports = config
