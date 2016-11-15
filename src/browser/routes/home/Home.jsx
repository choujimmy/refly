/* @flow */
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Layout from '../../components/Layout'
import style from './style.scss'

class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    return (
      <Layout full={false}>
        <div />
      </Layout>
    )
  }
}

export default CSSModules(Home, style)
