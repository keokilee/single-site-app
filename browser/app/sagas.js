import { call, takeEvery, put } from 'redux-saga'
import { ipcRenderer } from 'electron'

import { GET_CONFIG, setConfig } from 'app/actions'

function ipcListenOnce (eventName) {
  return new Promise((resolve, reject) => {
    ipcRenderer.on(eventName, (_, err, ...response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

function * fetchConfigWorker () {
  ipcRenderer.send('get-config')
  const [config] = yield call(ipcListenOnce, 'get-config-reply')

  yield put(setConfig(config))
}

function * fetchConfigSaga () {
  yield * takeEvery(GET_CONFIG, fetchConfigWorker)
}

export default [fetchConfigSaga]
