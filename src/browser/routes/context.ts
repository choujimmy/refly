export interface Page {
  title: string,
  component: JSX.Element,
  description?: string,
  redirect?: any,
  status?: number
}

export interface Context {
  insertCss?: any,
  store?: any
}

export interface AppContext extends Context {
  next?: GeneratorFunction,
  path?: string,
  query?: any
}
