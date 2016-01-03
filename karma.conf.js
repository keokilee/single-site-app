module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [ 'mocha' ],
    reporters: [ 'spec', 'coverage' ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'spec/browser/**/*_spec.js',
      'spec/browser/**/*_spec.jsx'
    ],
    preprocessors: {
      'spec/browser/**/*_spec.js': ['webpack', 'sourcemap'],
      'spec/browser/**/*_spec.jsx': ['webpack', 'sourcemap']
    },
    browsers: [ 'Electron' ],
    singleRun: true,
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },
    webpack: require('./config/test/webpack.browser'),
    webpackMiddleware: {
      noInfo: true
    }
  });
};
