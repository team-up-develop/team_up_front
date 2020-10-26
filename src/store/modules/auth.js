import axios from 'axios'
import router from '@/router/index.js' // Vue router instance

const state = {
  idToken: null,
  userId: null,
  errorFlag: false
}

const getters = {
  userId: state => state.userId,
  errorFlag: state => state.errorFlag
}

const mutations = {
  // * idToken を使用する
  updateIdToken(state, idToken) {
    state.idToken = idToken;
  },
  // * localStorageにuserIdを保存し、判定する
  loginUserId(state, userId) {
    state.userId = userId
    // localStorage.userId = state.userId //? ローカルストレージ
  },
  loginError(state, errorFlag) {
    state.errorFlag = errorFlag;
  }
}

const actions = {
  // * ログイン
  login({ commit }, authData) {
    const params = {
      LoginName: authData.LoginName,
      LoginPassword: authData.LoginPassword,
    }
    axios.post('http://localhost:8888/api/v1/login', params)
    .then(response => {
      router.push('/jobs');
      commit('updateIdToken', response.data.idToken)
      commit('loginUserId', response.data.userId)
    })
    .catch(error => {
      console.log(error)
      let errorFlag = true
      console.log("Errorが起きました!!!!!")
      commit('loginError', errorFlag)
    })
    ;
  },
  // * ログアウト
  logout({ commit }) {
    commit('loginUserId', null);
    localStorage.clear();
    router.replace('/login')
  }
}

export default {
	state,
	getters,
	mutations,
	actions
}