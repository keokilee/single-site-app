import { SET_WEBVIEW, ADD_TAB, CHANGE_TAB, REMOVE_TAB } from 'app/actions';

const TAB_STATE = {
  currentIndex: -1,
  history: [],
  webview: null
};

const INITIAL_STATE = {
  tabIndex: 0,
  tabs: [ TAB_STATE ]
};

export function tabs(state = INITIAL_STATE, { type, tabIndex, webview }) {
  switch (type) {
    case SET_WEBVIEW:
      const tab = state.tabs[state.tabIndex];
      tab.webview = webview;

      return {
        ...state,
        tabs: [
          ...state.tabs.splice(0, state.tabIndex),
          tab,
          ...state.tabs.splice(state.tabIndex + 1)
        ]
      };

    case ADD_TAB:
      return {
        ...state,
        tabs: [
          ...state.tabs,
          { ...TAB_STATE, webview }
        ]
      };

    case CHANGE_TAB:
      if (tabIndex < 0 || tabIndex >= state.tabs.length) {
        return state;
      }

      return {
        ...state,
        tabIndex
      };

    case REMOVE_TAB:
      const invalidIndex = tabIndex < 0 || tabIndex >= state.tabs.length;
      const lastTab = state.tabs.length === 1;

      if (lastTab || invalidIndex) {
        return state;
      }

      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          ...state.tabs.slice(tabIndex + 1)
        ]
      };

    default:
      return state;
  }
}
