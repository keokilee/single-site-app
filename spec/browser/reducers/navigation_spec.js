import expect from 'expect';

import { navigation } from 'app/reducers/navigation';
import { SET_URL } from 'app/actions';

describe('reducers/navigation', () => {
  describe('initial', () => {
    it('returns a currentIndex of -1', () => {
      const state = navigation(undefined, {});
      expect(state.currentIndex).toEqual(-1);
    });

    it('returns an empty history', () => {
      const state = navigation(undefined, {});
      expect(state.history).toEqual([]);
    });
  });

  describe('set url', () => {
    let initialState;
    const action = { type: SET_URL, url: 'http://www.google.com' };

    beforeEach(() => initialState = navigation(undefined, {}));

    it('increments the currentIndex', () => {
      const nextState = navigation(initialState, action);
      expect(nextState.currentIndex).toEqual(initialState.currentIndex + 1);
    });

    it('adds a history entry', () => {
      const nextState = navigation(initialState, action);
      expect(nextState.history.length).toEqual(initialState.history.length + 1);
    });
  });
});
