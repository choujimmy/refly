import { combineReducers } from 'redux'

import { reducer as runtimeReducer } from './runtime/reducer'
import { reducer as userReducer } from './user/reducer'

const rootReducer: Redux.Reducer<any> = combineReducers<any>({
  user: userReducer,
  runtime: runtimeReducer
})

export default rootReducer
