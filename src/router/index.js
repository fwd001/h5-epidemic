import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/table-o',
    name: 'table-o',
    component: () =>
      import(/* webpackChunkName: "table-o" */ '../views/table-o.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
