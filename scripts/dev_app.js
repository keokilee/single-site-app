const path = require('path');

const nodemon = require('nodemon');
const webpack = require('webpack');

const config = require('../config/development/webpack.app');
const electronPath = path.join(process.cwd(), 'node_modules', '.bin', 'electron');

// Need to track if app started, otherwise get double render.
var started = false;

nodemon({
  execMap: { js: `${electronPath}` },
  ignore: ['*'],
  watch: 'noop/',
  ext: 'noop'
}).on('restart', () => console.log('Restarted'));

webpack(config).watch(100, () => {
  if (!started) {
    started = true;
  } else {
    nodemon.restart();
  }
});
