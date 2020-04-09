import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
// import FastClick from 'fastclick'
import VConsole from 'vconsole'
import '@/assets/css/index.less'
import './utils/ui'

if (process.env.NODE_ENV === 'development') {
  const vconsole = new VConsole()
  console.log('Hello console', vconsole)
}

// 解决移动端点击延迟
// FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
