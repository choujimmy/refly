/* @flow */
import type { Action } from '../../types/action.d'
import { Record } from './model'

export const SET_LOCALE_START = 'intl/SET_LOCALE_START'
export const SET_LOCALE_SUCCESS = 'intl/SET_LOCALE_SUCCESS'
export const SET_LOCALE_ERROR = 'intl/SET_LOCALE_ERROR'

const initialState = new Record()

export default function runtime (state: Record = initialState, action: Action) {
  switch (action.type) {
    case SET_LOCALE_START:
      return state.setLocaleStart(action.payload)
    case SET_LOCALE_SUCCESS:
      return state.setLocaleSuccess(action.payload.locale, action.payload.messages)
    case SET_LOCALE_ERROR:
      return state.setLocaleError()
    default:
      return state
  }
}
