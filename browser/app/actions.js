export const SET_URL = 'SET_URL';
export const SET_LOADING = 'SET_LOADING';
export const SET_FAVICON = 'SET_FAVICON';

export const SET_WEBVIEW = 'SET_WEBVIEW';
export const ADD_TAB = 'ADD_TAB';
export const CHANGE_TAB = 'CHANGE_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';

export function setUrl(url) {
  return { type: SET_URL, url };
}

export function setLoading(loading) {
  return { type: SET_LOADING, loading };
}

export function setFavicon(favicon) {
  return { type: SET_FAVICON, favicon };
}

export function setWebview(webview) {
  return { type: SET_WEBVIEW, webview };
}

export function addTab(webview) {
  return { type: ADD_TAB, webview };
}

export function changeTab(tabIndex) {
  return { type: CHANGE_TAB, tabIndex };
}

export function removeTab(tabIndex) {
  return { type: REMOVE_TAB, tabIndex };
}
