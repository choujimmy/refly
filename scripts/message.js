/* @flow */
import path from 'path'
import gaze from 'gaze'
import { transform } from 'babel-core'

import { readFile, writeFile, glob } from './lib/fs'
import pkg from '../package.json'
import { locales } from '../src/common/config'

const GLOB_PATTERN = 'src/**/*.{js,jsx}'
const fileToMessages = {}
let messages = {}

const posixPath = (fileName) => fileName.replace(/\\/g, '/')

const writeMessages = async (fileName, msgs) => {
  await writeFile(fileName, `${JSON.stringify(msgs, null, 2)}\n`)
}

// 合并信息文件到源文件
const mergeToFile = async (locale, toBuild) => {
  const fileName = `src/common/messages/${locale}.json`
  const originalMessages = {}

  try {
    const oldFile = await readFile(fileName)

    let oldJson
    try {
      oldJson = JSON.parse(oldFile)
    } catch (err) {
      throw new Error(`解析${fileName}文件中多语言消息JSON对象错误`)
    }

    oldJson.forEach((message) => {
      originalMessages[message.id] = message
      delete originalMessages[message.id].files
    })
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }

  Object.keys(messages).forEach(id => {
    const newMsg = messages[id]
    originalMessages[id] = originalMessages[id] || { id }
    const msg = originalMessages[id]
    msg.description = newMsg.description || msg.description
    msg.defaultMessage = newMsg.defaultMessage || msg.defaultMessage
    msg.message = msg.message || ''
    msg.files = newMsg.files
  })

  const result = Object.keys(originalMessages)
    .map((key) => originalMessages[key])
    .filter((msg) => msg.files || msg.message)

  await writeMessages(fileName, result)

  console.log(`多语言消息更新: ${fileName}`)

  if (toBuild && locale !== '_default') {
    const buildFileName = `build/messages/${locale}.json`
    try {
      await writeMessages(buildFileName, result)
      console.log(`构建多语言消息文件更新: ${buildFileName}`)
    } catch (err) {
      console.error(`多语言消息文件${buildFileName}构建失败`)
    }
  }
}

const mergeMessages = () => {
  messages = {}
  Object.keys(fileToMessages).forEach(fileName => {
    fileToMessages[fileName].forEach(newMsg => {
      const message = messages[newMsg.id] || {}
      messages[newMsg.id] = {
        description: newMsg.description || message.description,
        defaultMessage: newMsg.defaultMessage || message.defaultMessage,
        message: newMsg.message || message.message || '',
        files: message.files ? [...message.files, fileName].sort() : [fileName]
      }
    })
  })
}

const updateMessages = async (toBuild) => {
  mergeMessages()
  await Promise.all(
    ['_default', ...locales].map(locale => mergeToFile(locale, toBuild))
  )
}

const message = async () => {
  const compare = (a, b) => {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  const compareMessages = (a, b) => compare(a.id, b.id)

  const processFile = async (fileName: string) => {
    try {
      const code = await readFile(fileName)
      const posixName = posixPath(fileName)
      const result = transform(code, {
        presets: pkg.babel.presets,
        plugins: ['react-intl']
      }).metadata['react-intl']
      if (result.messages && result.messages.length) {
        fileToMessages[posixName] = result.messages.sort(compareMessages)
      } else {
        delete fileToMessages[posixName]
      }
    } catch (err) {
      console.error(`在${fileName}文件中解构多语言消息文件错误:\n`, err.codeFrame || err)
    }
  }

  const files = await glob(GLOB_PATTERN)

  await Promise.all(files.map(processFile))
  await updateMessages(false)

  if (process.argv.includes('--watch')) {
    const watcher = await new Promise((resolve, reject) => {
      gaze(GLOB_PATTERN, (err, val) => (err ? reject(err) : resolve(val)))
    })
    watcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../').length)
      await processFile(relPath)
      await updateMessages(true)
    })
  }
}

export default message
