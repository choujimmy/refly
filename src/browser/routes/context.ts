export interface Page {
  title: string,
  component: JSX.Element,
  description?: string,
  redirect?: any,
  status?: number,
  chunk?: any
}

export interface Context {
  insertCss?: Function,
  store?: any,
  next?: GeneratorFunction,
  path?: string,
  query?: any
}
