const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
const proxy = require('./proxy')

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    port: 7777,
    // 设置代理
    proxy
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.externals = {
      echarts: 'echarts' // 默认是配置引用的库（这里是echarts）暴露出的全局变量
    }
  }
}
