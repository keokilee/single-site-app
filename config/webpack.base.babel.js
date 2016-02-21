const webpack = require('webpack')
const path = require('path')

const ENV = process.env.NODE_ENV || 'development'

const APP_DIR = path.join(process.cwd(), 'app')
const BROWSER_DIR = path.join(process.cwd(), 'browser', 'app')
const STYLES_DIR = path.join(process.cwd(), 'browser', 'styles')

module.exports = {
  context: process.cwd(),
  debug: ENV !== 'production',
  devtool: 'eval',
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['electron', ...Object.keys(process.binding('natives'))]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ],
  postcss: (compiler) => [
    require('postcss-import')({
      addDependencyTo: compiler
    }),
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),
    require('postcss-font-magician')(),
    require('postcss-url')(),
    require('postcss-cssnext')(),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')()
  ],
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      'app-constants': path.join(process.cwd(), 'constants'),
      'styles': STYLES_DIR,
      'browser': BROWSER_DIR,
      'app': APP_DIR
    }
  }
}
