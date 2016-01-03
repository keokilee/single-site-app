import expect from 'expect';
import { take } from 'redux-saga';

import sagas from 'app/sagas';
import { GET_CONFIG } from 'app/actions';

describe('sagas', () => {
  const [fetchConfig] = sagas;

  describe('fetchConfig', () => {
    const generator = fetchConfig();

    describe('initial', () => {
      it('is waiting for the first action', () => {
        const next = generator.next();
        expect(next.value).toEqual(take(GET_CONFIG));
      });
    });
  });
});
