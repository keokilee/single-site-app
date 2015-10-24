import app from 'app';
import BrowserWindow from 'browser-window';
import reporter from 'crash-reporter';
import debug from 'electron-debug';

debug();
reporter.start();

let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800
  });

  mainWindow.loadUrl('http://localhost:4000/');
  mainWindow.on('closed', () => mainWindow = null);
});
