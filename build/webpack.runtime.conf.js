'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
var webpack = require("webpack")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    all:'./src/assets/js/Page.js'
  },
  output: {
    path: resolve('runtime/'),
    filename: '[name].js',
    library: "Page",
    libraryExport: "default",
    // umdNamedDefine: true,
     libraryTarget: "umd",
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'api': resolve('src/api'),
      'base': resolve('src/base'),
      'assets': resolve('src/assets'),
      'visus': resolve('src/visus'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'pages': resolve('src/pages'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
