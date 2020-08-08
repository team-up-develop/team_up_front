import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth' 

Vue.use(Vuex)

export default new Vuex.Store({
  // * 状態保存
  state: {  },

  getters: {  },

  mutations: {  },
  // * 非同期処理
  actions: {  },

  modules: {
    auth,
  }
})