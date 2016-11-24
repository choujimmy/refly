/* @flow */
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'

import rootReducer from '../reducers'

export default function configureStore (initialState: any) {
  let enhancer
  const middlewares = []

  if (__DEV__) {
    if (process.env.BROWSER) {
      middlewares.push(logger({
        collapsed: true
      }))
    } else {
      const inspect = require('util').inspect
      const createLogger = () => {
        return store => next => action => {
          const formattedPayload = inspect(action.payload, {
            colors: true
          })
          console.log(`==> [ACTION] -> ${action.type}: ${formattedPayload}`)
          return next(action)
        }
      }
      middlewares.push(createLogger())
    }

    let devToolsExtension = f => f
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension()
    }

    enhancer = compose(
      applyMiddleware(...middlewares),
      devToolsExtension,
    )
  } else {
    enhancer = applyMiddleware(...middlewares)
  }

  const store = createStore(rootReducer, initialState, enhancer)

  if (__DEV__ && module.hot) {
    (module.hot:any).accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}
