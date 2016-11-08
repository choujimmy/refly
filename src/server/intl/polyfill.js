/* @flow */
import areIntlLocalesSupported from 'intl-locales-supported'

import { locales } from '../config'

if (global.Intl) {
  if (!areIntlLocalesSupported(locales)) {
    const IntlPolyfill = require('intl')
    global.Intl.NumberFormat = IntlPolyfill.NumberFormat
    global.Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
  }
} else {
  global.Intl = require('intl')
}
