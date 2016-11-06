import * as fs from 'fs'
import * as path from 'path'
import * as globPkg from 'glob'
import * as mkdirp from 'mkdirp'
import * as rimraf from 'rimraf'

export const readFile = (file: string) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => (err ? reject(err) : resolve(data)))
})

export const writeFile = (file: string, contents: any) => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', (err) => (err ? reject(err) : resolve()))
})

export const copyFile = (source: string, target: string) => new Promise((resolve, reject) => {
  let cbCalled = false
  const done = (err: Error) => {
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
  rd.on('error', (err: Error) => done(err))
  const wr = fs.createWriteStream(target)
  wr.on('error', (err: Error) => done(err))
  wr.on('close', (err: Error) => done(err))
  rd.pipe(wr)
})

export const readDir = (pattern: string, options: globPkg.IOptions) => new Promise<string[]>((resolve, reject) =>
  globPkg(pattern, options, (err: Error, result: string[]) => (err ? reject(err) : resolve(result)))
)

export const makeDir = (name: string) => new Promise((resolve, reject) => {
  mkdirp(name, (err: Error) => (err ? reject(err) : resolve()))
})

export const glob = (pattern: string) => new Promise((resolve, reject) => {
  globPkg(pattern, (err: Error, val: string[]) => (err ? reject(err) : resolve(val)))
})

export const copyDir = async (source: string, target: string) => {
  const dirs = await readDir('**/*.*', {
    cwd: source,
    nosort: true,
    dot: true
  })
  await Promise.all(dirs.map(async (dir: string) => {
    const from = path.resolve(source, dir)
    const to = path.resolve(target, dir)
    await makeDir(path.dirname(to))
    await copyFile(from, to)
  }))
}

export const cleanDir = (pattern: string, options: globPkg.IOptions) => new Promise((resolve, reject) =>
  rimraf(pattern, { glob: options }, (err: Error) => (err ? reject(err) : resolve()))
)
