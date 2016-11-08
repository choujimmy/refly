/* @flow */
import { Action } from '../types/action.d'

export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE'

export default function runtime (state: Object | null = {}, action: Action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    default:
      return state
  }
}
