module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [ 'mocha' ],
    reporters: [ 'spec', 'coverage' ],
    files: [
      'spec/browser/**/*_spec.js'
    ],
    preprocessors: {
      'spec/browser/**/*_spec.js': ['webpack', 'sourcemap']
    },
    browsers: [ 'Electron' ],
    singleRun: true,
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },
    webpack: require('./config/webpack.test'),
    webpackMiddleware: {
      noInfo: true
    }
  });
};
