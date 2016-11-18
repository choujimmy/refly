/* @flow */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Match } from 'react-router'
import style from './style.scss'
import intl from './intl'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from './home'

class App extends Component {

  render () {
    return (
      <div>
        <Header />
        <Match pattern='/' component={Home} />
        <Footer />
      </div>
    )
  }
}

export default intl(App)
