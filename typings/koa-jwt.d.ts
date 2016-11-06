declare module 'koa-jwt' {
  var jwt: Jwt
  export = jwt

  interface JwtOption {
    secret?: string
    passthrough?: boolean,
    cookie?: string
  }

  interface Jwt {
    (option: JwtOption): GeneratorFunction
  }

}
