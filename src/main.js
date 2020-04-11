import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import FastClick from 'fastclick'
import '@/assets/css/index.less'
import './utils/ui'
import './utils/wx'

if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  const vconsole = new VConsole()
  console.log('Hello console', vconsole)
}

// 解决移动端点击延迟
// FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
