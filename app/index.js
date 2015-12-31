import app from 'app';
import BrowserWindow from 'browser-window';
import reporter from 'crash-reporter';
import debug from 'debug';

if (process.env.NODE_ENV !== 'production') {
  debug();
}

reporter.start({
  companyName: 'No Name Co.',
  submitURL: 'http://localhost:3001'
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });

  if (process.env === 'production') {
    mainWindow.loadURL(`file://${process.cwd()}/dist/browser/index.html`);
  } else {
    mainWindow.loadURL('http://localhost:4000/');
  }

  mainWindow.on('closed', () => mainWindow = null);
});
