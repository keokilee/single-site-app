import { GET_CONFIG, SET_CONFIG } from 'app/actions';

const INITIAL_STATE = null;

export function config(state = INITIAL_STATE, { type, config }) {
  switch (type) {
    case SET_CONFIG:
      return config;

    case GET_CONFIG:
    default:
      return state;
  }
}
