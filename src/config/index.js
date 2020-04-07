// baseURL配置
const servers = {
  development: '/api/v1',
  testing: '/api/v1',
  production: '/api/v1'
}

export const serverUrl = servers[process.env.VUE_APP_ENV]
