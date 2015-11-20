import { ADD_TAB, CHANGE_TAB } from 'app/actions';

const TAB_STATE = {
  currentIndex: -1,
  history: []
};

const INITIAL_STATE = {
  tabIndex: 0,
  tabs: [ TAB_STATE ]
};

export function tabs(state = INITIAL_STATE, { type, tabIndex }) {
  switch (type) {
    case ADD_TAB:
      return {
        ...state,
        tabs: [ ...state.tabs, TAB_STATE ]
      };
    case CHANGE_TAB:
      if (tabIndex < 0 || tabIndex >= state.tabs.length) {
        return state;
      }

      return {
        ...state,
        tabIndex
      };

    default:
      return state;
  }
}
