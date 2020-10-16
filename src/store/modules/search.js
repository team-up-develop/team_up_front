// import axios from 'axios'
import router from '@/router/index.js' // Vue router instance

const state = {
  freeWord: "",
}

const getters = {
  freeWord: state => state.freeWord 
}

const mutations = {
  // * localStorageにuserIdを保存し、判定する
  freeWord(state, freeWord) {
    state.freeWord = freeWord
  }
}

const actions = {
  // * ログイン
  freeWordSearch({ commit }, freeWord) {
    commit('freeWord', freeWord.freeWord)
  },
  // * ログアウト
  logout({commit}) {
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