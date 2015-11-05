export const SET_URL = 'SET_URL';
export const SET_LOADING = 'SET_LOADING';

export function setUrl(url) {
  return { type: 'SET_URL', url };
}

export function setLoading(loading) {
  return { type: 'SET_LOADING', loading };
}
