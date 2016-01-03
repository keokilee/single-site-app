module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [ 'mocha' ],
    reporters: [ 'spec', 'coverage' ],
    files: [
      'karma.shim.js',
      'spec/browser/index.js'
    ],
    preprocessors: {
      'spec/browser/index.js': ['webpack', 'sourcemap']
    },
    browsers: [ 'Electron' ],
    singleRun: true,
    coverageReporter: {
      type: 'text'
    },
    webpack: require('./config/test/webpack.browser'),
    webpackMiddleware: {
      noInfo: true
    }
  });
};
