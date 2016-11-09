/* @flow */
import fs from 'fs'

export const readFile = (file: string): Promise<string> => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => (err ? reject(err) : resolve(data)))
})
