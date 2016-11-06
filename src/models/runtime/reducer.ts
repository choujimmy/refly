import { Record } from 'immutable'

export const SET_RUNTIME_VARIABLE = 'runtime/SET_RUNTIME_VARIABLE'

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
    case SET_RUNTIME_VARIABLE:
      return state.update(action.payload.name, (val) => action.payload.value)
    default:
      return state
  }
}


