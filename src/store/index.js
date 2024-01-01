import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from './modules/LoginModule'
import contentInfoModule from './modules/contentInfoModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    LoginModule,
    contentInfoModule
  }
})