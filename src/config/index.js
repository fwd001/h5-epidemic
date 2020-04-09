// baseURL配置
const servers = {
  development: '/statis',
  production: '/statis'
}

export const serverUrl = servers[process.env.NODE_ENV]
