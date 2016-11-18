/* @flow */
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

export const SET_LOCALE_START = 'intl/SET_LOCALE_START'
export const SET_LOCALE_SUCCESS = 'intl/SET_LOCALE_SUCCESS'
export const SET_LOCALE_ERROR = 'intl/SET_LOCALE_ERROR'

const initialState = fromJS({
  initialNow: Date.now()
})

export default createReducer(initialState, {
  [SET_LOCALE_START]: (state, action) => {
    const locale = action.payload
    return state
      .set('locale', state.get(locale) ? locale : state.get('locale'))
      .set('newLocale', locale)
  },

  [SET_LOCALE_SUCCESS]: (state, action) => {
    const { locale, messages } = action.payload
    return state.set('locale', locale)
      .set('newLocale', null)
      .setIn(['messages', locale], fromJS(messages))
  },

  [SET_LOCALE_ERROR]: (state, action) => {
    return state.set('newLocale', null)
  }
})
