import { take, put } from 'redux-saga';
import { ipcRenderer } from 'electron';

import { GET_CONFIG, setConfig } from 'app/actions';

function ipcListenOnce(eventName) {
  return new Promise((resolve, reject) => {
    ipcRenderer.on(eventName, (_, err, ...response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function * getConfig() {
  while (yield take(GET_CONFIG)) {
    ipcRenderer.send('get-config');
    const [config] = yield ipcListenOnce('get-config-reply');

    yield put(setConfig(config));
  }
}

export default [getConfig];
