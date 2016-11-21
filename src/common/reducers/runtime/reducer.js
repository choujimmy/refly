/* @flow */
import { createReducer } from '../../core/createReducer'

export const SET_INITIAL_NOW = 'runtime/SET_INITIAL_NOW'

const initialState = {}

export default createReducer(initialState, {
  [SET_INITIAL_NOW]: (state, action) => {
    return {
      ...state,
      initialNow: action.payload
    }
  }
})
