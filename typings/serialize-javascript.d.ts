declare module 'serialize-javascript' {
  function serialize(object: any, option?: serialize.Option): string

  namespace serialize {
    interface Option {
      isJSON?: boolean
    }
  }

  export = serialize
}
