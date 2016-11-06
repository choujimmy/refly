import { RuntimeAction, SET_RUNTIME_VARIABLE } from './reducer'

export function setRuntimeVariable (name: string, value: any): RuntimeAction {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value
    }
  }
}
