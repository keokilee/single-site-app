import { GET_CONFIG, SET_CONFIG } from 'app/actions'

export function config (state = null, { type, config }) {
  switch (type) {
    case SET_CONFIG:
      return config

    case GET_CONFIG:
    default:
      return state
  }
}
