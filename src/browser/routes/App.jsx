/* @flow */
import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'
import intl from './intl'
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends PureComponent {

  render () {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    )
  }
}

export default intl(CSSModules(App, style))
