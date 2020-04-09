// 跨域代理地址
const target = 'http://47.101.174.148' // 地址

module.exports = {
  '/statis': {
    target, // 域名
    // ws: true, // 是否启用swebsockets
    changeOrigin: true,
    pathRequiresRewrite: {
      '^/statis': '/statis'
    }
  }
}
