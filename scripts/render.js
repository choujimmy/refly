import path from 'path'
import fetch from 'isomorphic-fetch'
import server from './server'
import { writeFile, makeDir } from './lib/fs'

// 定义需要输出静态文件的页面地址
const routes = [
  '/'
]

const render = async () => {
  const serverInstance = await server()

  await Promise.all(routes.map(async (route, index) => {
    const url = `http://${serverInstance.host}${route}`
    const fileName = route.endsWith('/') ? 'index.html' : `${path.basename(route, '.html')}.html`
    const dirName = path.join('build/public', route.endsWith('/') ? route : path.dirname(route))
    const dist = `${dirName}${fileName}`
    const timeStart = new Date()
    const response = await fetch(url)
    const timeEnd = new Date()
    const text = await response.text()
    await makeDir(dirName)
    await writeFile(dist, text)
    const time = timeEnd.getTime() - timeStart.getTime()
    console.log(`#${index + 1} ${dist} => ${response.status} ${response.statusText} (${time} 毫秒)`)
  }))

  serverInstance.kill('SIGTERM')
}

export default render
