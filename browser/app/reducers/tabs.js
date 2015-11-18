import { ADD_TAB, CHANGE_TAB } from '../actions';

const TAB_STATE = {
  currentIndex: -1,
  history: []
};

const INITIAL_STATE = {
  tabIndex: 0,
  history: [ TAB_STATE ]
};

export function tabs(state = INITIAL_STATE, { type, tabIndex }) {
  switch (type) {
    case ADD_TAB:
      return {
        ...state,
        history: [ ...state.history, TAB_STATE ]
      };
    case CHANGE_TAB:
      return {
        ...state,
        tabIndex
      };

    default:
      return state;
  }
}
