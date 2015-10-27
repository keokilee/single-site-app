/*
State tree:
{
  initialUrl
  currentUrl
  canGoBack
  domainWhitelist
}
*/
import { combineReducers } from 'redux';
import { SET_URL } from '../actions';

function initialUrl(state = 'http://www.github.com') {
  return state;
}

function currentUrl(state = '', action) {
  switch (action.type) {
    case SET_URL:
      return action.url;
    default:
      return state;
  }
}

function canGoBack(state = false, action) {
  switch (action.type) {
    case SET_URL:
      return true;
    default:
      return state;
  }
}

const webviewApp = combineReducers({
  initialUrl,
  currentUrl,
  canGoBack
});

export default webviewApp;
