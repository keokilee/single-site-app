/*
State tree:
{
  currentUrl
  domainWhitelist
}
*/
import { combineReducers } from 'redux';
import { SET_URL } from '../actions';

function currentUrl(state = 'http://www.github.com', action) {
  switch (action.type) {
    case SET_URL:
      return action.url;
    default:
      return state;
  }
}

const webviewApp = combineReducers({
  currentUrl
});

export default webviewApp;
