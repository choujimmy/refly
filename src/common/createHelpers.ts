import * as fetch from 'isomorphic-fetch'

export interface HelperConfig {
  cookie?: string,
  history?: History
}

const createGraphqlRequest = (fetchKnowingCookie: any) => {
  return async function graphqlRequest (query: string, variables: string) {
    const fetchConfig = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables }),
      credentials: 'include'
    }
    const resp = await fetchKnowingCookie('/graphql', fetchConfig)
    if (resp.status !== 200) {
       throw new Error(resp.statusText)
    }
    return await resp.json()
  }
}

const createFetchKnowingCookie = ({ cookie }: HelperConfig) => {
  if (!process.env.BROWSER) {
    return (url: string, options: RequestInit = {}) => {
      const isLocalUrl = /^\/($|[^\/])/.test(url)

      if (isLocalUrl && options.credentials === 'include') {
        const headers: HeadersInit = Object.assign({}, options.headers, { cookie })
        const requestOptions: RequestInit = Object.assign({}, options, { headers })
        return fetch(url, requestOptions)
      }

      return fetch(url, options)
    }
  }
  return fetch
}

export default function createHelpers (config: HelperConfig) {
  const fetchKnowingCookie = createFetchKnowingCookie(config)
  const graphqlRequest = createGraphqlRequest(fetchKnowingCookie)

  return {
    fetch: fetchKnowingCookie,
    graphqlRequest,
    history: config.history
  }
}
