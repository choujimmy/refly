export type ChildProcess = child_process$ChildProcess // eslint-disable-line no-undef,camelcase
export type ServerInstance = ChildProcess & { host: string }
