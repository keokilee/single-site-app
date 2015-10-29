/*
State tree:
{
  initialUrl
  history
  domainWhitelist
}
*/
import { combineReducers } from 'redux';
import { SET_URL } from '../actions';

function initialUrl(state = 'http://www.github.com') {
  return state;
}

function history(state = [], action) {
  switch (action.type) {
    case SET_URL:
      return [...state, action.url];
    default:
      return state;
  }
}

const webviewApp = combineReducers({
  initialUrl,
  history
});

export default webviewApp;
