import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beCounted: 2
  },
  mutations: {
    getBeCounted(state) {
      const width = window.screen.width
      if (width > 414) {
        state.beCounted = 2
      } else {
        state.beCounted = 1
      }
    }
  },
  actions: {},
  modules: {}
})
