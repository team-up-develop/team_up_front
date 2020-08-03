import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'

Vue.config.productionTip = false

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLaptop, faUser, faBell, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLaptop, faUser, faBell, faHistory)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$http = (url, opts) => fetch(url, opts)
Vue.prototype.$httpPosts = 'http://localhost:8888/api/v1/job'
Vue.prototype.$httpCategories = 'http://localhost:8888/api/v1/job'
