import axios from 'axios'

const state = {
  idToken: null,
  userId: null
}

const getters = {

}

const mutations = {
  // * idToken を使用する
  updateIdToken(state, idToken) {
    state.idToken = idToken;
  },
  // * localStorageにUserNameを保存し、判定する
  createLocalStorage(state, userId) {
    state.userId = userId
    localStorage.userId = state.userId
    // console.log(localStorage.loginName)
  }
}

const actions = {
  login({ commit }, authData) {
    const data = {
      LoginName: authData.LoginName,
      LoginPassword: authData.LoginPassword
    }
    axios.post('http://localhost:8080/api/v1/login', data)
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

export default {
	state,
	getters,
	mutations,
	actions
}