import { Record } from 'immutable'

export const SET_VARIABLE = 'runtime/SET_VARIABLE'

export const RuntimeRecord = Record({
  initialNow: 0
})

export interface RuntimeAction {
  type: string,
  payload?: {
    name: string,
    value: any
  }
}

export function reducer (state = new RuntimeRecord(), action?: RuntimeAction) {
  switch (action.type) {
    case SET_VARIABLE:
      return state.update(action.payload.name, (val) => action.payload.value)
    default:
      return state
  }
}


