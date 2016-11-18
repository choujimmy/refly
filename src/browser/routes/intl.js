/* @flow */
import React, { PropTypes } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'

const intl = (WrappedComponent: Function) => {
  class Intl extends React.Component {

    static propTypes = {
      intl: PropTypes.object.isRequired
    }

    render () {
      const { intl, ...props } = this.props
      const { initialNow, locale, messages } = intl
      const localeMessages = (messages && messages[locale]) || {}
      return (
        <IntlProvider
          initialNow={initialNow}
          locale={locale}
          messages={localeMessages}
          defaultLocale='en-US'
        >
          <WrappedComponent {...props} />
        </IntlProvider>
      )
    }

  }

  Intl = connect(
    state => ({
      intl: state.intl
    }),
  )(Intl)

  return Intl
}

export default intl
