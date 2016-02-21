import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import reducers from './reducers'
import sagas from 'browser/sagas'
import App from './containers/App'

if (process.env.NODE_ENV !== 'production') {
  const DevelopmentEntry = require('browser/entry_points/Development').default

  render(
    <DevelopmentEntry sagas={sagas} reducers={reducers}>
      <App />
    </DevelopmentEntry>,
    document.getElementById('app')
  )
} else {
  const ProductionEntry = require('browser/entry_points/Production').default

  render(
    <ProductionEntry sagas={sagas} reducers={reducers}>
      <App />
    </ProductionEntry>,
    document.getElementById('app')
  )
}
