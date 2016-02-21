import { takeEvery } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import { ipcRenderer } from 'electron'

import * as AppConstants from 'app-constants'
import { setConfig } from 'browser/actions'

function * saveStateSaga (getState) {
  while (true) {
    // Find any action that updates the browser state
    const action = yield take('*')
    if (action.type.match(/SET_URL/)) {
      // We only care about a subset of the state
      const { tabIndex, tabs } = getState().tabs
      const saveState = {
        tabIndex,
        tabs: tabs.map(({ id, url, title, favicon }) => {
          return { id, url, title, favicon }
        })
      }

      ipcRenderer.send('save-state', JSON.stringify(saveState))
    }
  }
}

function ipcListenOnce (eventName) {
  return new Promise((resolve, reject) => {
    ipcRenderer.once(eventName, (_, err, ...response) => {
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
  yield * takeEvery(AppConstants.GET_CONFIG, fetchConfigWorker)
}

export default [fetchConfigSaga, saveStateSaga]
