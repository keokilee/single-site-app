import {
  SET_URL,
  SET_LOADING,
  SET_FAVICON,
  ADD_TAB,
  CHANGE_TAB,
  REMOVE_TAB
} from 'app/actions';

let makeTabId = () => Math.floor(Date.now() / 1000);

const makeNewTab = () => {
  return {
    currentIndex: -1,
    history: [],
    id: makeTabId()
  };
};

const INITIAL_STATE = {
  tabIndex: 0,
  tabs: [ makeNewTab() ]
};

export function tabs(state = INITIAL_STATE, action) {
  const { tabIndex, type } = action;
  const tab = state.tabs[tabIndex];

  switch (type) {
    // navigation
    case SET_URL:
      const url = action.url;

      if (tab.url === url) {
        return state;
      }

      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          { ...tab, url },
          ...state.tabs.slice(tabIndex + 1)
        ]
      };

    case SET_LOADING:
      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          { ...tab, loading: action.loading },
          ...state.tabs.slice(tabIndex + 1)
        ]
      };

    case SET_FAVICON:
      const favicon = action.favicon;
      if (tab.favicon === favicon) {
        return state;
      }

      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          { ...tab, favicon },
          ...state.tabs.slice(tabIndex + 1)
        ]
      };

    // Add/change/remove
    case ADD_TAB:
      return {
        ...state,
        tabs: [
          ...state.tabs,
          makeNewTab()
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
