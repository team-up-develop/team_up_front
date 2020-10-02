import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import jQuery from 'jquery' //? jQueryの導入
import VuePaginate from 'vue-paginate'//? ページネーションの導入
// import axios from 'axios'

global.jquery = jQuery //? jQueryの導入
global.$ = jQuery //? jQueryの導入
window.$ = window.jQuery = require('jquery') //? jQueryの導入
Vue.use(VuePaginate) //? ページネーションの導入

Vue.config.productionTip = false

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLaptop, faUser, faBell, faHistory, faBars, faUserPlus, faBookmark, faComments, faArchive, faAddressCard, faUsers, faUserAltSlash, faEye, faThumbsUp, faChevronCircleRight, faHeart, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLaptop, faUser, faBell, faHistory, faBars, faUserPlus, faBookmark, faComments, faArchive, faAddressCard, faUsers, faUserAltSlash, faEye, faThumbsUp, faChevronCircleRight, faHeart, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$http = (url, opts) => fetch(url, opts)
Vue.prototype.$httpPosts = 'http://localhost:8080/api/v1/job'
Vue.prototype.$httpCategories = 'http://localhost:8080/api/v1/job'

Vue.prototype.$baseURL= 'http://localhost:8080/api/v1'
