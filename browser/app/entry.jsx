'use strict';

import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import webviewApp from './reducers';
import App from './containers/App';

import config from './config.js';

function configureStore() {
  const url = config.url;
  const store = createStore(webviewApp, { initialUrl: url });
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
    <App />
  </Provider>,
  document.getElementById('app')
);
