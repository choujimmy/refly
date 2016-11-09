/* @flow */
import fetch from 'isomorphic-fetch'
import { host } from '../../server/config'

let fetchPolyfill

if (process.env.BROWSER) {
  fetchPolyfill = fetch
} else {
  const localUrl = (url) => {
    if (url.startsWith('//')) {
      return `https:${url}`
    }

    if (url.startsWith('http')) {
      return url
    }

    return `http://${host}${url}`
  }

  fetchPolyfill = (url: string, options: Object) => {
    return fetch(localUrl(url), options)
  }
}

export default fetchPolyfill

