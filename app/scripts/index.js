import app from 'app';
import BrowserWindow from 'browser-window';
import reporter from 'crash-reporter';
import debug from 'debug';

debug();
reporter.start();

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

  mainWindow.loadUrl('http://localhost:4000/');
  mainWindow.on('closed', () => mainWindow = null);
});
