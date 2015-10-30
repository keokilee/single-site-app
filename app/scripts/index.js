'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const reporter = require('crash-reporter');
const debug = require('debug');

debug();
reporter.start();

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });

  mainWindow.loadUrl('http://localhost:4000/');
  mainWindow.on('closed', function () { mainWindow = null; });
});
