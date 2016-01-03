/*
State tree:
{
  config,
  tabs
}
*/
import { combineReducers } from 'redux';
import { config } from './config';
import { tabs } from './tabs';

const webviewApp = combineReducers({
  config,
  tabs
});

export default webviewApp;
