const fs = require('fs')
const path = require('path')
const express = require('express')
const compile = require('lodash.template')
const contextMiddleware = require('./src/middleware/context')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''

  const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {}

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use(contextMiddleware);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }

      const [appHtml, preloadLinks] = await render(req.context, manifest)
      // Init lodash template options
      const compileOptions = {
        escape: /{{([^{][\s\S]+?[^}])}}/g,
        interpolate: /{{{([\s\S]+?)}}}/g,
      }
      const templateCompile = compile(template, compileOptions)
      const html = templateCompile({ appHtml, preloadLinks, state: JSON.stringify(req.context.state || {}) })

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (e.code === 404) {
        return res.status(404).redirect(`/page-not-found?from=${req.url}`)
      }

      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(process.env.PORT || 3000, () => {
      console.log(`http://localhost:${process.env.PORT || 3000}`)
    })
  )
}

// for test use
exports.createServer = createServer
