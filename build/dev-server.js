require('dotenv').config()

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

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.listen(port)
