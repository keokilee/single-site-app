/*
State tree:
{
  loading
  navigation
  whitelist
  sessionNamespace
  favicon
}
*/
import { combineReducers } from 'redux';
import { navigation } from './navigation';

import {
  SET_LOADING,
  SET_FAVICON
} from '../actions';

function loading(state = false, { type, loading }) {
  switch (type) {
    case SET_LOADING:
      return loading;
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
  favicon,
  navigation,
  loading
});

export default webviewApp;
