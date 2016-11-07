declare module 'serialize-javascript' {
  function serialize(object: any, option?: serialize.Option): string

  namespace serialize {
    interface Option {
      isJson?: boolean
    }
  }

  export = serialize
}
