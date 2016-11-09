/* @flow */
import { Map } from 'immutable'

import { Record as TransitRecord } from '../../core/transit'

export class Record extends TransitRecord({
  initialNow: Date.now(),
  locale: null,
  newLocale: null,
  messages: new Map()
}, 'intl') {
  initialNow: number
  locale: ?string
  newLocale: ?string
  messages: Map<string, any>

  setLocaleStart (locale: string): this {
    return this.set('locale', this.get(locale) ? locale : this.get('locale'))
      .set('newLocale', locale)
  }

  setLocaleSuccess (locale: string, messages: any): this {
    return this.set('locale', locale)
      .set('newLocale', null)
      .setIn(['messages', locale], messages)
  }

  setLocaleError (): this {
    return this.set('newLocale', null)
  }
}
