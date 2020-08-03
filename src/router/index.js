import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Jobs from '../views/Jobs.vue'
import JobDetail from '../views/JobDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import JobCreate from '../views/JobCreate.vue'
import Favorite from '../views/Favorite.vue'
import Apply from '../views/Apply.vue'
import Manage from '../views/Manage.vue'
import ManageDetail from '../views/ManageDetail.vue'
import Chat from '../views/Chat.vue'
import ChatDetail from '../views/ChatDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/jobs',
      component: Jobs
    },
    {
      path: '/manage',
      component: Manage
    },
    {
      path: '/manage/:id',
      component: ManageDetail,
      props: route => ({
        id: Number(route.params.id),
      })
    },
    {
      path: '/favorite_job',
      component: Favorite
    },
    {
      path: '/apply_job',
      component: Apply
    },
    {
      path: '/jobs/:id/',
      component: JobDetail,
      props: route => ({
        id: Number(route.params.id),
      })
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/jobcreate',
      name: 'JobCreate',
      component: JobCreate
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/chat/:id/',
      component: ChatDetail,
      props: route => ({
        id: Number(route.params.id),
      })
    },
  ]
})
