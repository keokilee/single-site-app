export const SET_URL = 'SET_URL';
export const SET_LOADING = 'SET_LOADING';
export const SET_FAVICON = 'SET_FAVICON';

export const ADD_TAB = 'ADD_TAB';
export const CHANGE_TAB = 'CHANGE_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';

export function setUrl(url, tabIndex) {
  return { type: SET_URL, url, tabIndex };
}

export function setLoading(loading, tabIndex) {
  return { type: SET_LOADING, loading, tabIndex };
}

export function setFavicon(favicon, tabIndex) {
  return { type: SET_FAVICON, favicon, tabIndex };
}

export function addTab() {
  return { type: ADD_TAB };
}

export function changeTab(tabIndex) {
  return { type: CHANGE_TAB, tabIndex };
}

export function removeTab(tabIndex) {
  return { type: REMOVE_TAB, tabIndex };
}
