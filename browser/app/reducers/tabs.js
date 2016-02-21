import {
  SET_URL,
  SET_LOADING,
  SET_FAVICON,
  SET_TITLE,
  SET_WEBVIEW,
  ADD_TAB,
  CHANGE_TAB,
  REMOVE_TAB,
  REMOVE_ACTIVE_TAB
} from 'browser/actions'

const makeNewTab = () => {
  return {
    webview: null,
    favicon: null,
    url: null,
    loading: false,
    title: null,
    id: Math.floor(Date.now())
  }
}

const INITIAL_STATE = {
  tabIndex: 0,
  tabs: [ makeNewTab() ]
}

export function tabs (state = INITIAL_STATE, action) {
  const { tabIndex, type } = action
  const tab = state.tabs[tabIndex]

  switch (type) {
    case SET_WEBVIEW:
      const webview = action.webview

      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          { ...tab, webview },
          ...state.tabs.slice(tabIndex + 1)
        ]
      }

    // Navigation updates
    case SET_URL:
      const url = action.url

      if (tab.url === url) {
        return state
      }

      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          { ...tab, url },
          ...state.tabs.slice(tabIndex + 1)
        ]
      }

    case SET_LOADING:
      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          { ...tab, loading: action.loading },
          ...state.tabs.slice(tabIndex + 1)
        ]
      }

    case SET_TITLE:
      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          { ...tab, title: action.title },
          ...state.tabs.slice(tabIndex + 1)
        ]
      }

    case SET_FAVICON:
      const favicon = action.favicon
      if (tab.favicon === favicon) {
        return state
      }

      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          { ...tab, favicon },
          ...state.tabs.slice(tabIndex + 1)
        ]
      }

    // Add/change/remove
    case ADD_TAB:
      return {
        ...state,
        tabIndex: state.tabs.length,
        tabs: [
          ...state.tabs,
          makeNewTab()
        ]
      }

    case CHANGE_TAB:
      if (tabIndex < 0 || tabIndex >= state.tabs.length) {
        return state
      }

      return {
        ...state,
        tabIndex
      }

    case REMOVE_TAB:
      const invalidIndex = tabIndex < 0 || tabIndex >= state.tabs.length
      const lastTab = state.tabs.length === 1
      let currentIndex = state.tabIndex

      if (lastTab || invalidIndex) {
        return state
      }

      if (tabIndex === currentIndex) {
        currentIndex -= 1
      }

      return {
        ...state,
        tabIndex: currentIndex,
        tabs: [
          ...state.tabs.slice(0, tabIndex),
          ...state.tabs.slice(tabIndex + 1)
        ]
      }

    case REMOVE_ACTIVE_TAB:
      if (state.tabs.length === 1) {
        return state
      }

      currentIndex = state.tabIndex
      let tabIndex = currentIndex

      if (tabIndex > 0) {
        tabIndex -= 1
      }

      return {
        ...state,
        tabIndex,
        tabs: [
          ...state.tabs.slice(0, currentIndex),
          ...state.tabs.slice(currentIndex + 1)
        ]
      }
    default:
      return state
  }
}
