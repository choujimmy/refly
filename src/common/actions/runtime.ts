import { RuntimeAction, SET_VARIABLE } from '../reducers/runtime'

export function setVariable (name: string, value: any): RuntimeAction {
  return {
    type: SET_VARIABLE,
    payload: {
      name,
      value
    }
  }
}
