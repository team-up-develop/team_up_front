// import axios from 'axios'
// import router from '@/router/index.js' // Vue router instance

const state = {
  freeWord: "",
  language: null,
  framwork: null,
  skill: null
}

const getters = {
  freeWord: state => state.freeWord,
  language: state => state.language,
  framwork: state => state.framwork,
  skill: state => state.skill,
}

const mutations = {
  // * フリーワード 格納
  freeWord(state, freeWord) {
    state.freeWord = freeWord
  },
  // * 言語 格納
  language(state, language) {
    state.language = language
  },
  // * 言語 格納
  framwork(state, framwork) {
    state.framwork = framwork
  },
  // * その他スキル 格納
  skill(state, skill) {
    state.skill = skill
  }
}

const actions = {
  // * フリーワード 検索
  freeWordSearch({ commit }, freeWord) {
    // router.push('/jobs');
    commit('freeWord', freeWord.freeWord)
  },
  // * 言語 検索
  languageSearch({ commit }, language) {
    // router.push('/jobs');
    commit('language', language.language)
  },
  // * フレームワーク 検索
  framworkSearch({ commit }, framwork) {
    // router.push('/jobs');
    console.log("↓ search.js フレームワークの中身")
    console.log(framwork)
    commit('framwork', framwork.framwork)
  },
  // * その他スキル 検索
  skillSearch({ commit }, skill) {
    // router.push('/jobs');
    commit('skill', skill.skill)
  }
}

export default {
	state,
	getters,
	mutations,
	actions
}