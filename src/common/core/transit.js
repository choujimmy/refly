/* @flow */
import { Record as ImmutableRecord, Seq } from 'immutable'
import transit from 'transit-immutable-js'

const records = {}

const transitRecords = () =>
  transit.withRecords(
    Seq(records).toSet().toArray()
  )

const fixForHotReload = (Record, previous) => {
  if (!previous) return
  const names = Object.getOwnPropertyNames(previous)
  const transitGuidKey = names.find(n => n.startsWith('transit$guid$'))
  if (!transitGuidKey) return
  Record[transitGuidKey] = previous[transitGuidKey]
}

// 自动序列化/反序列化immutable记录
export const fromJSON = (string: string) => transitRecords().fromJSON(string)
export const toJSON = (object: any) => transitRecords().toJSON(object)

export const Record = (defaultValues: Object, name: string) => {
  const TransitImmutableRecord = ImmutableRecord(defaultValues, name)
  fixForHotReload(TransitImmutableRecord, records[name])
  records[name] = TransitImmutableRecord
  return TransitImmutableRecord
}
