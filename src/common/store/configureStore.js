/* @flow */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from '../reducers'
import createHelpers from './createHelpers'
import type { HelpersConfig } from '../types/helper.d'

export default function configureStore (initialState: any, helpersConfig: HelpersConfig) {
  const helpers = createHelpers(helpersConfig)
  const middleware = [thunk.withExtraArgument(helpers)]

  let enhancer

  if (__DEV__) {
    if (process.env.BROWSER) {
      middleware.push(logger({
        collapsed: true
      }))
    } else {
      const inspect = require('util').inspect
      const createLogger = () => {
        return store => next => action => {
          const formattedPayload = inspect(action.payload, {
            colors: true
          })
          console.log(` * ${action.type}: ${formattedPayload}`)
          return next(action)
        }
      }
      middleware.push(createLogger())
    }

    let devToolsExtension = f => f
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension()
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    )
  } else {
    enhancer = applyMiddleware(...middleware)
  }

  const store = createStore(rootReducer, initialState, enhancer)

  if (__DEV__ && module.hot) {
    (module.hot:any).accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}
