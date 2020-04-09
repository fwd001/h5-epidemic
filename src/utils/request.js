import axios from 'axios'
// import Vue from 'vue'
import { serverUrl } from '../config'

// 服务端地址
const service = axios.create({
  baseURL: serverUrl, // url = base url + request url
  withCredentials: true, // 跨域时是否带上cookie
  timeout: 20000, // 请求超时时间配置(ms)
  headers: {
    'Content-Type': 'application/json;charset=UTF-8', // json数据格式传输
    abc: 'cba'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 服务端响应成功时，搞些事情
    if (res.ret !== 0) {
      throw res
    } else {
      return res
    }
  },
  error => {
    // 服务端响应失败时，搞些事情
    // Vue.prototype.$message.error(error)
    return Promise.reject(error)
  }
)

service.jsonp = url => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!')
    return
  }
  return new Promise((resolve, reject) => {
    window.jsonCallBack = result => {
      resolve(result)
    }
    var JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = `${url}&callback=jsonCallBack`
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 500)
  })
}

export default service
