import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    LoginName: "",
    LoginPassword: "",
    userId: null
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    // * localStorageにUserNameを保存し、判定する
    createLocalStorage(state, userId) {
      state.userId = userId
      localStorage.userId = state.userId
      // console.log(localStorage.loginName)
    }
    // createLocalStorage(state) {
    //   localStorage.LoginName = authData.LoginName;
    //   localStorage.LoginPassword = authData.LoginPassword;
    //   console.log(localStorage)
    // }
  },
  actions: {
    login({ commit }, authData) {
      const data = {
        LoginName: authData.LoginName,
        LoginPassword: authData.LoginPassword
      }
      axios.post('http://localhost:8888/api/v1/login', data)
      .then(response => {
        console.log(response.data)
        console.log(response.data.userId)
        commit('updateIdToken', response.data.idToken)
        commit('createLocalStorage', response.data.userId)
      });
    },
    clearLocalStorage() {
      // console.log("clearLocalStorage")
    }
  }
})