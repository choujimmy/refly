import { combineReducers } from 'redux'

import { reducer as runtimeReducer } from './reducers/runtime'
import { reducer as userReducer } from './reducers/user'

const rootReducer: Redux.Reducer<any> = combineReducers<any>({
  user: userReducer,
  runtime: runtimeReducer
})

export default rootReducer
