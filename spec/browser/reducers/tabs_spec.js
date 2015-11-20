import expect from 'expect';

import { tabs } from 'app/reducers/tabs';
import { addTab, changeTab } from 'app/actions';

describe('reducers/tabs', () => {
  const initialState = tabs(undefined, {});

  describe('initial', () => {
    it('has an index of 0 to start', () => {
      expect(initialState.tabIndex).toEqual(0);
    });

    it('has an initial tab', () => {
      expect(initialState.tabs.length).toEqual(1);
    });
  });

  describe('add tab', () => {
    const nextState = tabs(initialState, addTab());

    it('adds a tab to the list of tabs', () => {
      expect(nextState.tabs.length).toEqual(initialState.tabs.length + 1);
    });
  });

  describe('changeTab', () => {
    const state = tabs(initialState, addTab());

    it('changes the tab to the given index in bounds', () => {
      const nextState = tabs(state, changeTab(1));
      expect(nextState.tabIndex).toEqual(1);
    });

    it('does not change the tab if the index is out of bounds', () => {
      const nextState = tabs(state, changeTab(100));
      expect(nextState.tabIndex).toEqual(0);
    });
  });
});
