/*
State tree:
{
  tabs
}
*/
import { combineReducers } from 'redux';
import { tabs } from './tabs';

const webviewApp = combineReducers({
  tabs
});

export default webviewApp;
