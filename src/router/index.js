import Vue from 'vue'
import Router from 'vue-router'
import Jobs from '../views/Jobs.vue'
import JobDetail from '../views/JobDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import JobCreate from '../views/JobCreate.vue'
import JobCreateSkill from '../views/JobCreateSkill.vue'
import Favorite from '../views/Favorite.vue'
import Apply from '../views/Apply.vue'
import Manage from '../views/Manage.vue'
import ManageApplyDetail from '../views/ManageApplyDetail.vue'
import ManageParticipateDetail from '../views/ManageParticipateDetail.vue'
import Chat from '../views/Chat.vue'
import ChatDetail from '../views/ChatDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/jobs',
      component: Jobs
    },
    {
      path: '/manage',
      component: Manage
    },
    {
      path: '/manage/apply/:id',
      component: ManageApplyDetail,
      props: route => ({
        id: Number(route.params.id),
      })
    },
    {
      path: '/manage/participate/:id',
      component: ManageParticipateDetail,
      props: route => ({
        id: Number(route.params.id),
      })
    },
    {
      path: '/manage/favorite_job',
      component: Favorite
    },
    {
      path: '/apply_job',
      component: Apply
    },
    {
      path: '/manage/favorite_job/:id/',
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
      path: '/jobcreate/session2',
      name: 'JobCreateSkill',
      component: JobCreateSkill
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

