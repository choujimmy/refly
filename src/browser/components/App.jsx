/* @flow */
import React, { Children, PropTypes } from 'react'
import { IntlProvider } from 'react-intl'

const ContextType = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired
}

class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired
  }

  static childContextTypes = ContextType

  intl: any
  unsubscribe: Function | null

  getChildContext () {
    return this.props.context
  }

  componentDidMount () {
    const store = this.props.context && this.props.context.store
    if (store) {
      this.unsubscribe = store.subscribe(() => {
        const state = store.getState()
        const newIntl = state.intl
        if (this.intl !== newIntl) {
          this.intl = newIntl
          console.log('当前语言已被切换')
          this.forceUpdate()
        }
      })
    }
  }

  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  render () {
    const store = this.props.context && this.props.context.store
    const state = store && store.getState()
    this.intl = (state && state.intl) || {}
    const { initialNow, locale, messages } = this.intl
    const localeMessages = (messages && messages[locale]) || {}
    return (
      <IntlProvider
        initialNow={initialNow}
        locale={locale}
        messages={localeMessages}
        defaultLocale='en-US'
      >
        {Children.only(this.props.children)}
      </IntlProvider>
    )
  }

}

export default App
