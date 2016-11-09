/* @flow */
import { join } from 'path'
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql'

import IntlMessageType from '../types/IntlMessage'
import { locales } from '../config'
import { readFile } from '../utils/fs'

const CONTENT_DIR = join(__dirname, './messages')

const intl = {
  type: new List(IntlMessageType),
  args: {
    locale: { type: new NonNull(StringType) }
  },
  async resolve (parentValues: Object, { locale }: Object, { request }: Object) {
    if (!locales.includes(locale)) {
      throw new Error(`语言[${locale}]不支持`)
    }

    let localeData: string
    try {
      localeData = await readFile(join(CONTENT_DIR, `${locale}.json`))
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error(`语言[${locale}]不存在`)
      }
      localeData = '{}'
    }
    return JSON.parse(localeData)
  }
}

export default intl
