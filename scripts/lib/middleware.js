/* @flow */
import MemoryFileSystem from 'memory-fs'
import mime from 'mime'

const HASH_REGEXP = /[0-9a-f]{10,}/

const webpackMiddleware = (compiler: any, options: Object) => {
  options = options || {}
  if (typeof options.watchOptions === 'undefined') {
    options.watchOptions = {}
  }
  if (typeof options.watchOptions.aggregateTimeout === 'undefined') {
    options.watchOptions.aggregateTimeout = 200
  }
  if (typeof options.stats === 'undefined') {
    options.stats = {}
  }
  if (!options.stats.context) {
    options.stats.context = process.cwd()
  }
  if (options.lazy) {
    if (typeof options.filename === 'string') {
      const str = options.filename
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') // eslint-disable-line
      .replace(/\\\[[a-z]+\\]/ig, '.+')
      options.filename = new RegExp('^[/]{0,1}' + str + '$')
    }
  }

  const fs = new MemoryFileSystem()

  let outputPath

  if (typeof compiler.compilers === 'undefined') {
    compiler.outputFileSystem = fs
    outputPath = compiler.outputPath
  } else {
    outputPath = compiler.compilers[0].outputPath
    compiler.compilers[0].outputFileSystem = fs
    for (let i = 1; i < compiler.compilers.length; i++) {
      const currentCompiler = compiler.compilers[i]
      if (typeof currentCompiler.options.target !== 'undefined' && ['web', 'webwoker'].indexOf(currentCompiler.options.target) === -1) {
        continue
      }
      currentCompiler.outputFileSystem = fs
      while (currentCompiler.outputPath.indexOf(outputPath) !== 0 && /[/\\]/.test(outputPath)) {
        outputPath = outputPath.replace(/[/\\][^/\\]*$/, '')
      }
    }
  }

  compiler.plugin('done', function (stats) {
    // We are now on valid state
    state = true
      // Do the stuff in nextTick, because bundle may be invalidated
      //  if a change happend while compiling
    process.nextTick(() => {
      // check if still in valid state
      if (!state) return
        // print webpack output
      var displayStats = (!options.quiet && options.stats !== false)
      if (displayStats && !(stats.hasErrors() || stats.hasWarnings()) && options.noInfo) {
        displayStats = false
      }
      if (displayStats) {
        console.log(stats.toString(options.stats))
      }
      if (!options.noInfo && !options.quiet) {
        console.info('webpack: bundle is now VALID.')
      }
      // execute callback that are delayed
      const cbs = callbacks
      callbacks = []
      cbs.forEach((cb) => {
        cb()
      })
    })

    // In lazy mode, we may issue another rebuild
    if (forceRebuild) {
      forceRebuild = false
      rebuild()
    }
  })

  // on compiling
  const invalidPlugin = () => {
    if (state && (!options.noInfo && !options.quiet)) {
      console.info('webpack: bundle is now INVALID.')
    }
    state = false
  }

  const invalidAsyncPlugin = (compiler, callback) => {
    invalidPlugin()
    callback()
  }

  compiler.plugin('invalid', invalidPlugin)
  compiler.plugin('watch-run', invalidAsyncPlugin)
  compiler.plugin('run', invalidAsyncPlugin)

  // the state, false: bundle invalid, true: bundle valid
  let state = false

  // in lazy mode, rebuild automatically
  let forceRebuild = false

  // delayed callback
  let callbacks = []

  // wait for bundle valid
  const ready = (fn, req) => {
    if (state) return fn()
    if (!options.noInfo && !options.quiet) {
      console.log('webpack: wait until bundle finished: ' + (req.url || fn.name))
    }
    callbacks.push(fn)
  }

  // start watching
  if (!options.lazy) {
    var watching = compiler.watch(options.watchOptions, function (err) {
      if (err) throw err
    })
  } else {
    state = true
  }

  const rebuild = () => {
    if (state) {
      state = false
      compiler.run(function (err) {
        if (err) throw err
      })
    } else {
      forceRebuild = true
    }
  }

  const pathJoin = (a, b) => {
    return a === '/' ? '/' + b : (a || '') + '/' + b
  }

  const getFilenameFromUrl = (url) => {
    // publicPrefix is the folder our bundle should be in
    var localPrefix = options.publicPath || '/'
    if (url.indexOf(localPrefix) !== 0) {
      if (/^(https?:)?\/\//.test(localPrefix)) {
        localPrefix = '/' + localPrefix.replace(/^(https?:)?\/\/[^/]+\//, '')
          // fast exit if another directory requested
        if (url.indexOf(localPrefix) !== 0) return false
      } else return false
    }
    // get filename from request
    var filename = url.substr(localPrefix.length)
    if (filename.indexOf('?') >= 0) {
      filename = filename.substr(0, filename.indexOf('?'))
    }
    return filename ? pathJoin(outputPath, filename) : outputPath
  }

  // The middleware function
  const webpackDevMiddleware = (req: any, res: any, next: Function) => {
    var filename = getFilenameFromUrl(req.url)
    if (filename === false) return next()

    // in lazy mode, rebuild on bundle request
    if (options.lazy && (!options.filename || options.filename.test(filename))) {
      rebuild()
    }

    const processRequest = () => {
      try {
        var stat = fs.statSync(filename)
        if (!stat.isFile()) {
          if (stat.isDirectory()) {
            filename = pathJoin(filename, 'index.html')
            stat = fs.statSync(filename)
            if (!stat.isFile()) {
              throw new Error('next')
            }
          } else {
            throw new Error('next')
          }
        }
      } catch (e) {
        return next()
      }

      // server content
      var content = fs.readFileSync(filename)
      res.setHeader('Access-Control-Allow-Origin', '*') // To support XHR, etc.
      res.setHeader('Content-Type', mime.lookup(filename))
      res.setHeader('Content-Length', content.length)
      if (options.headers) {
        for (var name in options.headers) {
          res.setHeader(name, options.headers[name])
        }
      }
      if (res.send) res.send(content)
      else res.end(content)
    }

    if (HASH_REGEXP.test(filename)) {
      try {
        if (fs.statSync(filename).isFile()) {
          processRequest()
          return
        }
      } catch (e) {}
    }
    // delay the request until we have a vaild bundle
    ready(processRequest, req)
  }

  webpackDevMiddleware.getFilenameFromUrl = getFilenameFromUrl

  webpackDevMiddleware.waitUntilValid = function (callback) {
    callback = callback || function () {}
    if (!watching || !watching.running) callback()
    else ready(callback, {})
  }

  webpackDevMiddleware.invalidate = function (callback) {
    callback = callback || function () {}
    if (watching) {
      ready(callback, {})
      watching.invalidate()
    } else {
      callback()
    }
  }

  webpackDevMiddleware.close = function (callback) {
    callback = callback || function () {}
    if (watching) watching.close(callback)
    else callback()
  }

  webpackDevMiddleware.fileSystem = fs

  return webpackDevMiddleware
}

export default webpackMiddleware
