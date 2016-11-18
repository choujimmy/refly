/* @flow */
import React, { PropTypes } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import { Map } from 'immutable'

const intl = (WrappedComponent: Function) => {
  class Intl extends React.Component {

    static propTypes = {
      intl: PropTypes.object.isRequired
    }

    render () {
      const { intl, ...attributes } = this.props
      const locale = intl.get('locale', 'en-US')
      return (
        <IntlProvider
          initialNow={intl.get('initialNow', Date.now())}
          locale={locale}
          messages={intl.getIn(['messages', locale], Map({})).toJS()}
          defaultLocale='en-US'
        >
          <WrappedComponent {...attributes} />
        </IntlProvider>
      )
    }

  }

  Intl = connect((state) => ({
    intl: state.get('intl')
  }))(Intl)

  return Intl
}

export default intl
