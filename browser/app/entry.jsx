import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';

import webviewApp from './reducers';
import App from './containers/App';
import DevTools from './containers/DevTools';
import sagas from 'app/sagas';

function buildDevStore() {
  const DevTools = require('./containers/DevTools').default;
  const logger = require('redux-logger');

  return compose(
    applyMiddleware(sagaMiddleware(...sagas), logger()),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
}

function configureStore() {
  const store = buildDevStore()(webviewApp);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').webviewApp;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

if (process.env.NODE_ENV !== 'production') {
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
} else {
  const store = createStore(webviewApp);

  render(
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>,
    document.getElementById('app')
  );
}
