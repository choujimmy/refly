/* @flow */
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Layout from '../../components/Layout'
import style from './style.scss'

class NotFound extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    const { title } = this.props
    return (
      <Layout full={false}>
        <div styleName='container'>
          <h1>{title}</h1>
          <p>Sorry, the page you were trying to view does not exist.</p>
        </div>
      </Layout>
    )
  }
}

export default CSSModules(NotFound, style)
