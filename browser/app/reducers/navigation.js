/*
  State schema:
  {
    currentIndex,
    history
  }
 */
import { SET_URL } from '../actions';

const INITIAL_STATE = {
  currentIndex: -1,
  history: []
};

const URL_OBJECT = {
  url: '',
  title: '',
  favicon: ''
};

export function navigation(state = INITIAL_STATE, { type, url }) {
  switch (type) {
    case SET_URL:
      const urlObj = {
        ...URL_OBJECT,
        url: url
      };

      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        history: [...state.history, urlObj]
      };

    default:
      return state;
  }
}
