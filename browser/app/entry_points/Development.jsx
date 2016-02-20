import React, { PropTypes } from 'react'
import { compose, createStore, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import { Provider } from 'react-redux'
import sagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import DevTools from 'app/containers/DevTools'

function buildDevStore (sagas) {
  return compose(
    applyMiddleware(sagaMiddleware(...sagas), logger()),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore)
}

function configureStore (sagas, reducers) {
  const store = buildDevStore(sagas)(reducers)

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default class DevelopmentEntryPoint extends React.Component {
  render () {
    const { sagas, reducers, children } = this.props

    const store = configureStore(sagas, reducers)
    return (
      <Provider store={store}>
        <div>
          {children}
          <DevTools />
        </div>
      </Provider>
    )
  }
}

DevelopmentEntryPoint.propTypes = {
  sagas: PropTypes.array.isRequired,
  reducers: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
