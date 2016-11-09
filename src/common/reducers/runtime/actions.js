/* @flow */
import { SET_INITIAL_NOW, SET_AVAILABLE_LOCALES } from './reducer'
import type { Action } from '../../types/action.d'

const setInitialNow = (time: number): Action => {
  return {
    type: SET_INITIAL_NOW,
    payload: time
  }
}

const setAvailableLocales = (locales: string[]): Action => {
  return {
    type: SET_AVAILABLE_LOCALES,
    payload: locales
  }
}

export { setInitialNow, setAvailableLocales }
