declare module 'koa-session' {
  var session: Session
  export = session

  import * as Koa from 'koa'

  interface Session {
    (app: Koa): GeneratorFunction
  }

}
