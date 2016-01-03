import { ipcMain } from 'electron';

import { readFile } from 'fs';

export function handleMessages() {
  ipcMain.on('get-config', event => {
    readFile('./build/app/config.json', (err, data) => {
      if (err) {
        event.sender.send('get-config-reply', err);
      } else {
        event.sender.send('get-config-reply', err, JSON.parse(data));
      }
    });
  });
}
