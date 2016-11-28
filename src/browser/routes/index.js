export default {
  path: '/',

  children: [
    require('./home').default,
    require('./login').default,
    require('./register').default
  ],

  async action ({ next }) {
    return await next()
  }
}
