import { SET_RUNTIME_VARIABLE } from '../reducers/runtime'

const setRuntimeVariable = (name: string, value: any) => {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value
    }
  }
}

export { setRuntimeVariable }
