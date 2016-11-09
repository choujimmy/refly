/* @flow */
import type { Action } from '../../types/action.d'
import { Record } from './model'

export const SET_INITIAL_NOW = 'runtime/SET_INITIAL_NOW'
export const SET_AVAILABLE_LOCALES = 'runtime/SET_AVAILABLE_LOCALES'

const initialState = new Record()

export default function runtime (state: Record = initialState, action: Action) {
  switch (action.type) {
    case SET_INITIAL_NOW:
      return state.setInitialNow(action.payload)
    case SET_AVAILABLE_LOCALES:
      return state.setAvailableLocales(action.payload)
    default:
      return state
  }
}
