/* @flow */
import fetch from '../core/fetch'
import { HelpersConfig } from '../types/helper.d'

const createGraphqlRequest = (fetchKnowingCookie) => {
  return async function graphqlRequest (query: string, variables: Object) {
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
    if (resp.status !== 200) throw new Error(resp.statusText)
    return await resp.json()
  }
}

const createFetchKnowingCookie = ({ cookie }: HelpersConfig) => {
  if (!process.env.BROWSER) {
    return (url: string, options: Object = {}) => {
      const isLocalUrl = /^\/($|[^/])/.test(url)

      if (isLocalUrl && options.credentials === 'include') {
        const headers = {
          ...options.headers,
          cookie
        }
        return fetch(url, { ...options, headers })
      }

      return fetch(url, options)
    }
  }

  return fetch
}

export default function createHelpers (helpersConfig: HelpersConfig) {
  const fetchKnowingCookie = createFetchKnowingCookie(helpersConfig)
  const graphqlRequest = createGraphqlRequest(fetchKnowingCookie)

  return {
    fetch: fetchKnowingCookie,
    graphqlRequest,
    history: helpersConfig.history
  }
}
