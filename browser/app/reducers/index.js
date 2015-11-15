/*
State tree:
{
  initialUrl
  history
  domainWhitelist
  favicon
}
*/
import { combineReducers } from 'redux';

import {
  SET_URL,
  SET_LOADING,
  UPDATE_WHITELIST,
  SET_NAMESPACE,
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

function whitelist(state = new Set(), { type, host }) {
  switch (type) {
    case UPDATE_WHITELIST:
      return new Set([...state, host]);
    default:
      return state;
  }
}

function sessionNamespace(state = '', { type, namespace }) {
  switch (type) {
    case SET_NAMESPACE:
      return namespace;
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
  loading,
  sessionNamespace,
  whitelist
});

export default webviewApp;
