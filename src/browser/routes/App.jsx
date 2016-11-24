/* @flow */
import React, { Component } from 'react'
import { Match } from 'react-router'
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

export default App
