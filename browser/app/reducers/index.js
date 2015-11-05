/*
State tree:
{
  initialUrl
  history
  domainWhitelist
}
*/
import { combineReducers } from 'redux';
import { SET_URL, SET_LOADING } from '../actions';

function initialUrl(state = 'http://www.github.com') {
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

const webviewApp = combineReducers({
  initialUrl,
  history,
  loading
});

export default webviewApp;
