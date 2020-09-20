import Vue from 'vue'
import Router from 'vue-router'
import Jobs from '../views/job/Jobs.vue'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import JobCreate from '../views/job/JobCreate.vue'
import JobCreateSkill from '../views/job/JobCreateSkill.vue'
import Favorite from '../views/favorite/Favorite.vue'
import FavoriteJobDetail from '../views/favorite/FavoriteJobDetail.vue'
import Apply from '../views/apply/Apply.vue'
import ApplyJobDetail from '@/views/apply/ApplyJobDetail'
import Manage from '../views/manage/Manage.vue'
import ManageApplyDetail from '../views/manage/ManageApplyDetail.vue'
import ManageParticipateDetail from '../views/manage/ManageParticipateDetail.vue'
import ManageRejectDetail from '../views/manage/ManageRejectDetail.vue'
import Chat from '../views/chat/Chat.vue'
import ChatDetail from '../views/chat/ChatDetail.vue'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/jobs',
      component: Jobs,
      name: 'jobs'
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
      path: '/manage/reject/:id',
      component: ManageRejectDetail,
      props: route => ({
        id: Number(route.params.id),
      })
    },
    {
      path: '/manage/favorite_job',
      component: Favorite
    },
    {
      path: '/manage/apply_job',
      component: Apply
    },
    {
      path: '/manage/apply_job/:id/',
      component: ApplyJobDetail,
      props: route => ({
        id: Number(route.params.id),
      })
    },
    {
      path: '/manage/favorite_job/:id/',
      component: FavoriteJobDetail,
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

