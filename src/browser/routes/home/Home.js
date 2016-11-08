/* @flow */
import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Layout from '../../components/Layout/Layout'
import style from './Home.scss'

class Home extends React.Component {
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
            <p>Home</p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(style)(Home)
