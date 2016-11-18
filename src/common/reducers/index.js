/* @flow */
import { combineReducers } from 'redux-immutablejs'
import runtime from './runtime/reducer'
import intl from './intl/reducer'
import user from './user/reducer'

export default combineReducers({
  runtime,
  intl,
  user
})
