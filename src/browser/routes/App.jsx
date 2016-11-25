/* @flow */
import 'normalize.css'
import React, { Component } from 'react'
import { Match } from 'react-router'
import { Module } from 'react-router-server'
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {

  render () {
    return (
      <div>
        <Header />
        <Match pattern='/' exactly render={(routeProps) => (
          <Module module={() => System.import('./home')}>
            {module => module ? <module.default {...routeProps} /> : null }
          </Module>
        )} />
        <Match pattern='/register' render={(routeProps) => (
          <Module module={() => System.import('./register')}>
            {module => module ? <module.default {...routeProps} /> : null }
          </Module>
        )} />
        <Match pattern='/login' render={(routeProps) => (
          <Module module={() => System.import('./login')}>
            {module => module ? <module.default {...routeProps} /> : null }
          </Module>
        )} />
        <Footer />
      </div>
    )
  }
}

export default App
