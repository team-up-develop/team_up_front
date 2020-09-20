import axios from 'axios'
import router from '@/router/index.js' // Vue router instance

const state = {
  idToken: null,
  userId: null,
}

const getters = {
  userId: state => state.userId 
}

const mutations = {
  // * idToken を使用する
  updateIdToken(state, idToken) {
    state.idToken = idToken;
  },
  // * localStorageにuserIdを保存し、判定する
  createLocalStorage(state, userId) {
    state.userId = userId
    localStorage.userId = state.userId //? ローカルストレージ
    // console.log(localStorage.loginName)
  }
}

const actions = {
  login({ commit }, authData) {
    const data = {
      LoginName: authData.LoginName,
      LoginPassword: authData.LoginPassword,
    }
    axios.post('http://localhost:8080/api/v1/login', data)
    .then(response => {
      // console.log("----------------------")
      router.push('/jobs');
      // console.log("----------------------")
      commit('updateIdToken', response.data.idToken)
      commit('createLocalStorage', response.data.userId)
    })
    .catch(error => console.log(error))
    ;
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