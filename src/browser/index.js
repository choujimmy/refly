/* @flow */
import render from './render'

const run = () => {
  // 当整个页面的dom tree ready以及内容加载完毕后执行
  if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    render()
  } else {
    document.addEventListener('DOMContentLoaded', render, false)
  }
}

if (!global.Intl) {
  Promise.all([
    System.import('intl'),
    System.import('intl/locale-data/jsonp/en.js'),
    System.import('intl/locale-data/jsonp/zh.js')
  ]).then((modules) => {
    modules[0].default
    modules[1].default
    modules[2].default
    run()
  })
  /*
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/zh.js'
  ], require => {
    require('intl')
    require('intl/locale-data/jsonp/en.js')
    require('intl/locale-data/jsonp/zh.js')
    run()
  }, 'polyfills')
  */
} else {
  run()
}
