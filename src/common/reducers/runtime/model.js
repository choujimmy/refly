/* @flow */
import { Record as ImmutableRecord } from 'immutable'
export class Record extends ImmutableRecord({
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
