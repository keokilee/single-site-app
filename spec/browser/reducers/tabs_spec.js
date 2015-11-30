import expect from 'expect';

import { tabs } from 'app/reducers/tabs';
import { setWebview, addTab, changeTab, removeTab } from 'app/actions';

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

  describe('set webview', () => {
    const nextState = tabs(initialState, setWebview({}));

    it('sets the webview for the current tab', () => {
      const nextTabs = nextState.tabs;
      const nextIndex = nextState.tabIndex;

      expect(nextTabs[nextIndex].webview).toExist();
    });

    it('does not change the length of the tab list', () => {
      expect(nextState.tabs.length).toEqual(initialState.tabs.length);
    });
  });

  describe('add tab', () => {
    const nextState = tabs(initialState, addTab({}));

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

  describe('removeTab', () => {
    const state = tabs(initialState, addTab({}));

    it('removes a tab', () => {
      const nextState = tabs(state, removeTab(1));
      expect(nextState.tabs.length).toEqual(state.tabs.length - 1);
    });

    it('removes the tab at the specified index', () => {
      state.tabs[0].history = ['http://www.google.com'];

      const nextState = tabs(state, removeTab(1));
      expect(nextState.tabs[0].history).toEqual(state.tabs[0].history);
    });

    it('does not remove a tab if the index does not exist', () => {
      const nextState = tabs(state, removeTab(100));
      expect(nextState.tabs.length).toEqual(state.tabs.length);
    });

    it('does not remove the last tab', () => {
      let nextState = tabs(state, removeTab(0));
      nextState = tabs(nextState, removeTab(0));
      expect(nextState.tabs.length).toEqual(initialState.tabs.length);
    });
  });
});
