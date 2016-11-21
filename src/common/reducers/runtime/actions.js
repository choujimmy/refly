/* @flow */
import { SET_INITIAL_NOW } from './reducer'
import type { Action } from '../../types/action.d'

const setInitialNow = (time: number): Action => {
  return {
    type: SET_INITIAL_NOW,
    payload: time
  }
}

export { setInitialNow }
