/* @flow */
import type { Action } from '../../types/action.d'
import { Record } from './model'

const initialState = new Record()

export default function runtime (state: Record = initialState, action: Action) {
  switch (action.type) {
    default:
      return state
  }
}
