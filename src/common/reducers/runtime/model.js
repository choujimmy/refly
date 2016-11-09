/* @flow */
import { Record as TransitRecord } from '../../core/transit'

export class Record extends TransitRecord({
  initialNow: null,
  availableLocales: null
}, 'runtime') {
  initialNow: ?number
  availableLocales: ?string[]

  setInitialNow (time: number): this {
    return this.set('initialNow', time)
  }

  setAvailableLocales (locales: string[]): this {
    return this.set('availableLocales', locales)
  }
}
