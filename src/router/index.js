import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "dynamic-add" */ '../views/Home')
  },
  {
    path: '/dynamic-add',
    name: 'dynamic-add',
    component: () =>
      import(/* webpackChunkName: "dynamic-add" */ '../views/dynamic-add.vue')
  },
  {
    path: '/table-o',
    name: 'table-o',
    component: () =>
      import(/* webpackChunkName: "table-o" */ '../views/table-o.vue')
  },
  {
    path: '/table-t',
    name: 'table-t',
    component: () =>
      import(/* webpackChunkName: "table-t" */ '../views/table-t.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
