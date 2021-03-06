/* @flow */
import fs from 'fs'
import path from 'path'
import globPkg from 'glob'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

export const readFile = (file: string): Promise<string> => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => (err ? reject(err) : resolve(data)))
})

export const writeFile = (file: string, contents: string): Promise<void> => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', err => (err ? reject(err) : resolve()))
})

export const copyFile = (source: string, target: string): Promise<void> => new Promise((resolve, reject) => {
  let cbCalled = false
  const done = (err) => {
    if (!cbCalled) {
      cbCalled = true
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    }
  }

  const rd = fs.createReadStream(source)
  rd.on('error', err => done(err))
  const wr = fs.createWriteStream(target)
  wr.on('error', err => done(err))
  wr.on('close', err => done(err))
  rd.pipe(wr)
})

export const readDir = (pattern: string, options: Object): Promise<string[]> => new Promise((resolve, reject) =>
  globPkg(pattern, options, (err, result) => (err ? reject(err) : resolve(result)))
)

export const makeDir = (name: string): Promise<void> => new Promise((resolve, reject) => {
  mkdirp(name, err => (err ? reject(err) : resolve()))
})

export const glob = (pattern: string): Promise<string[]> => new Promise((resolve, reject) => {
  globPkg(pattern, (err, val) => (err ? reject(err) : resolve(val)))
})

export const copyDir = async (source: string, target: string): Promise<void> => {
  const dirs = await readDir('**/*.*', {
    cwd: source,
    nosort: true,
    dot: true
  })
  await Promise.all(dirs.map(async dir => {
    const from = path.resolve(source, dir)
    const to = path.resolve(target, dir)
    await makeDir(path.dirname(to))
    await copyFile(from, to)
  }))
}

export const cleanDir = (pattern: string, options: Object): Promise<string[]> => new Promise((resolve, reject) =>
  rimraf(pattern, { glob: options }, (err, result) => (err ? reject(err) : resolve(result)))
)
