/* @flow */
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './style.scss'

class Header extends Component {
  static propTypes = {
  }

  render () {
    return (
      <div className={`container ${style.container1}`}>
        <div className={style.wrapper}>
          <a href='/' title='论坛首页' className={style.logo}>LOGO</a>
          <div className={style.toolbar_container}>
            <div className={style.toolbar_user}>
              <a className={style.toolbar_user_action}>注册</a>
              <a className={[style.toolbar_user_action, style.toolbar_user_action_last]}>登录</a>
            </div>
          </div>
        </div>
        <div className='container'>
          haha
        </div>
      </div>
    )
  }
}

export default withStyles(style)(Header)
