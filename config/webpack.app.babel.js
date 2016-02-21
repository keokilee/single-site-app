const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./webpack.base.babel')

const ENV = process.env.NODE_ENV || 'development'
const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'))
                      .filter(module => ['.bin'].indexOf(module) === -1)
                      .reduce((modules, module) => {
                        modules[module] = `commonjs ${module}`
                        return modules
                      }, {})

let config = {
  ...baseConfig,
  entry: './app/index.js',
  externals: nodeModules,
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    filename: 'app.bundle.js'
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    )
  ],
  target: 'electron'
}

if (ENV === 'development') {
  config = {
    ...config,
    output: {
      ...config.output,
      path: path.join(process.cwd(), 'build', 'app')
    }
  }
} else if (ENV === 'production') {
  config = {
    ...config,
    devtool: 'source-map',
    output: {
      ...config.output,
      path: path.join(process.cwd(), 'dist', 'app')
    },
    plugins: [
      ...config.plugins,
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  }
}

module.exports = config
