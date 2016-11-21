/* @flow */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Match } from 'react-router'
import style from './style.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from './home'
import Register from './register'
import Login from './login'

class App extends Component {

  render () {
    return (
      <div>
        <Header />
        <Match pattern='/' exactly component={Home} />
        <Match pattern='/register' component={Register} />
        <Match pattern='/login' component={Login} />
        <Footer />
      </div>
    )
  }
}

App = CSSModules(App, style)

export default App
