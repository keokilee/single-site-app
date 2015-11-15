'use strict';

import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { compose, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import { Provider } from 'react-redux';

import webviewApp from './reducers';
import App from './containers/App';
import DevTools from './containers/DevTools';

import config from './config.js';

const createDebugStore = compose(
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

function configureStore() {
  const { url } = config;
  const store = createDebugStore(webviewApp, {
    initialUrl: url
  });

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').webviewApp;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const store = configureStore();

render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
