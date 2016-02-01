import expect from 'expect'

import { config } from 'app/reducers/config'
import { getConfig, setConfig } from 'app/actions'

describe('reducers/config', () => {
  const initialState = config(undefined, getConfig())

  describe('initial', () => {
    it('has no value', () => {
      expect(initialState).toEqual(null)
    })
  })

  describe('setConfig', () => {
    const newConfig = { url: 'http://www.google.com' }
    const nextState = config(initialState, setConfig(newConfig))

    it('sets the config to whatever is passed in', () => {
      expect(nextState).toEqual(newConfig)
    })
  })
})
