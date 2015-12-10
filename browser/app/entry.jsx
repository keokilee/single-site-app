'use strict';

import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import webviewApp from './reducers';
import App from './containers/App';
import DevTools from './containers/DevTools';

function buildStore() {
  const logger = createLogger();
  const createWithMiddleware = applyMiddleware(logger)(createStore);
  return compose(
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createWithMiddleware);
}

function configureStore() {
  const store = buildStore()(webviewApp);

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
