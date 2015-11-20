/*
State tree:
{
  loading
  navigation
  whitelist
  sessionNamespace
  favicon
  tabs
}
*/
import { combineReducers } from 'redux';
import { navigation } from './navigation';
import { tabs } from './tabs';

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
  loading,
  tabs
});

export default webviewApp;
