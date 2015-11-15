/*
State tree:
{
  initialUrl
  loading
  history
  whitelist
  sessionNamespace
  favicon
}
*/
import { combineReducers } from 'redux';

import {
  SET_URL,
  SET_LOADING,
  SET_FAVICON
} from '../actions';

function initialUrl(state = '') {
  return state;
}

function loading(state = false, { type, loading }) {
  switch (type) {
    case SET_LOADING:
      return loading;
    default:
      return state;
  }
}

function history(state = [], { type, url }) {
  switch (type) {
    case SET_URL:
      return [...state, url];
    default:
      return state;
  }
}

function favicon(state = '', { type, favicon }) {
  switch (type) {
    case SET_FAVICON:
      return favicon;
    default:
      return state;
  }
}

const webviewApp = combineReducers({
  initialUrl,
  favicon,
  history,
  loading
});

export default webviewApp;
