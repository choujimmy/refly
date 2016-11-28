/* @flow */
if (module.hot || process.env.NODE_ENV !== 'production') {
  module.exports = {
    ErrorReporter: require('redbox-react').default,
    deepForceUpdate: require('react-deep-force-update')
  }
}
