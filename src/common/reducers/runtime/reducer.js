/* @flow */
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

export const SET_INITIAL_NOW = 'runtime/SET_INITIAL_NOW'
export const SET_AVAILABLE_LOCALES = 'runtime/SET_AVAILABLE_LOCALES'

const initialState = fromJS({})

export default createReducer(initialState, {
  [SET_INITIAL_NOW]: (state, action) => {
    return state.set('initialNow', action.payload)
  },

  [SET_AVAILABLE_LOCALES]: (state, action) => {
    return state.set('availableLocales', action.payload)
  }
})
