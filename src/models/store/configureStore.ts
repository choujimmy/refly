import { createStore, applyMiddleware, compose, GenericStoreEnhancer, Middleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'
import createHelpers, { HelperConfig } from './createHelpers'

declare var __DEV__: boolean

export default function configureStore (initialState: any, helpersConfig: HelperConfig) {
  const helpers = createHelpers(helpersConfig)
  const middlewares = [thunk.withExtraArgument(helpers)]

  let enhancer: GenericStoreEnhancer

  if (__DEV__) {

    if (process.env.BROWSER) {
      const reduxLogger = require('redux-logger')
      middlewares.push(reduxLogger({
        collapsed: true
      }))
    } else {
      const { inspect } = require('util')
      const createLogger = (): Middleware => {
        return (store: any) => (next: any) => (action: any) => {
          const formattedPayload = inspect(action.payload, {
            colors: true
          })
          console.log(` * ${action.type}: ${formattedPayload}`)
          return next(action)
        }
      }
      middlewares.push(createLogger())
    }

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = (f: any) => f
    if (process.env.BROWSER && (window as any).devToolsExtension) {
      devToolsExtension = (window as any).devToolsExtension()
    }

    enhancer = compose(
      applyMiddleware(...middlewares),
      devToolsExtension,
    )
  } else {
    enhancer = applyMiddleware(...middlewares)
  }

  const store = createStore(rootReducer, initialState, enhancer)

  if (__DEV__ && (module as any).hot) {
    (module as any).hot.accept('../reducer', () =>
      store.replaceReducer(require('../reducer').default)
    )
  }

  return store
}
