require('dotenv').config()

const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')

const port = process.env.PORT || 3000

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

app.use(devMiddleware)
app.use(hotMiddleware)

const uri = `http://localhost:${port}`

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})

app.listen(port)
