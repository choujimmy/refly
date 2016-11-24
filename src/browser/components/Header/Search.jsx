/* @flow */
import React, { Component } from 'react'
import { style } from 'glamor'

import Icon from '../Icon'

const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '2px',
    padding: '0 .5em',
    width: '15em',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#909090'
  },

  icon: {
    fontSize: '1em'
  },

  input: {
    border: 'none',
    padding: '.5em',
    fontSize: '.8em',
    color: 'rgba(0,0,0,.3)',
    background: 'transparent',
    lineHeight: 1,
    flex: 1
  }
}

class Search extends Component {
  render () {
    return (
      <div className={style(styles.container)}>
        <Icon name='search' className={style(styles.icon)} />
        <input type='text' placeholder='输入关键字搜索' className={style(styles.input)} />
      </div>
    )
  }
}

export default Search
