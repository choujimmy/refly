/* @flow */
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'
import Header from '../Header'
import Footer from '../Footer'

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default CSSModules(Layout, style)
