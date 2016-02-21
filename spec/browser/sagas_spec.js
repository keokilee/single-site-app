import expect from 'expect'

import sagas from 'browser/sagas'
import { GET_CONFIG } from 'browser/actions'

describe('sagas', () => {
  const [fetchConfig] = sagas

  describe('fetchConfig', () => {
    const generator = fetchConfig()

    describe('initial', () => {
      it('is waiting for the first action', () => {
        const next = generator.next()
        expect(next.value).toEqual({TAKE: GET_CONFIG})
      })
    })
  })
})
