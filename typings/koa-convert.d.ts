declare module 'koa-convert' {
  var convert: ConvertStatic
  export = convert

  import { Middleware } from 'koa-compose'

  interface ConvertStatic {
      (generator: GeneratorFunction): Middleware

      compose(mw: Array<GeneratorFunction>): Middleware
      compose(...rest:Array<GeneratorFunction>): Middleware

      back(mw: Middleware): GeneratorFunction
  }
}
