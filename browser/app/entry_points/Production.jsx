import React, { PropTypes } from 'react'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import sagaMiddleware from 'redux-saga'

function configureStore (sagas, reducers) {
  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware(...sagas)),
  )(createStore)

  return finalCreateStore(reducers)
}

export default class ProductionEntryPoint extends React.Component {
  render () {
    const { sagas, reducers, children } = this.props

    const store = configureStore(sagas, reducers)

    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }
}

ProductionEntryPoint.propTypes = {
  sagas: PropTypes.array.isRequired,
  reducers: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
