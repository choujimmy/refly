/* @flow */
import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Layout from '../../components/Layout'
import style from './NotFound.scss'

class NotFound extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    const { title } = this.props
    return (
      <Layout full={false}>
        <div className={style.root}>
          <div className={style.container}>
            <h1>{title}</h1>
            <p>Sorry, the page you were trying to view does not exist.</p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(style)(NotFound)
