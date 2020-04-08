// baseURL配置
const servers = {
  development: '/api/v1',
  production: '/api/v1'
}

export const serverUrl = servers[process.env.NODE_ENV]
