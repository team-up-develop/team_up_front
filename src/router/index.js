import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/views/common/TopPage'
import About from '@/views/common/About'
import Jobs from '../views/job/Jobs.vue'
import JobDetailResponsive from '@/views/job/JobDetailResponsive'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import SentMailComplete from '@/views/user/SentMailComplete'
import RegisterStep1 from '@/views/user/register_session/RegisterStep1'
import RegisterStep2 from '@/views/user/register_session/RegisterStep2'
import RegisterStep3 from '@/views/user/register_session/RegisterStep3'
import ProfileUser from '@/views/user/ProfileUser'
import JobCreate from '../views/job/JobCreate.vue'
import JobCreateSkill from '../views/job/JobCreateSkill.vue'
import Favorite from '../views/favorite/Favorite.vue'
import FavoriteJobDetail from '../views/favorite/FavoriteJobDetail.vue'
import Apply from '../views/apply/Apply.vue'
import ApplyJobDetail from '@/views/apply/ApplyJobDetail'
import Manage from '../views/manage/Manage.vue'
import ManageJobDetail from '@/views/manage/ManageJobDetail'
import ManageApplyDetail from '../views/manage/ManageApplyDetail.vue'
import ManageParticipateDetail from '../views/manage/ManageParticipateDetail.vue'
import ManageRejectDetail from '../views/manage/ManageRejectDetail.vue'
import ManageFavoriteDetail from '@/views/manage/ManageFavoriteDetail'
import Chat from '../views/chat/Chat.vue'
import ChatDetail from '../views/chat/ChatDetail.vue'

Vue.use(Router)
export default new Router({
  mode: "history",
  routes: [
    // * トップページ
    {
      path: '/',
      component: TopPage,
      name: 'topPage'
    },
    {
      path: '/about',
      component: About,
      name: 'about'
    },
    // * 案件
    {
      path: '/jobs',
      component: Jobs,
      name: 'jobs'
    },
    {
      path: '/jobs/:id',
      component: JobDetailResponsive,
      props: route => ({
        id: Number(route.params.id),
      })
    },
    // * 案件管理
    {
      path: '/manage',
      component: Manage
    },
    {
      path: '/manage/job/:id',
      component: ManageJobDetail,
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
    // ? 案件管理詳細
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
      path: '/manage/favorite/:id',
      component: ManageFavoriteDetail,
      props: route => ({
        id: Number(route.params.id),
      })
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
    // * ユーザー
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
      path: '/register/sent_mail',
      name: 'SentMailComplete',
      component: SentMailComplete
    },
    // * 本登録登録 
    {
      path: '/step/1',
      name: 'RegisterStep1',
      component: RegisterStep1
    },
    {
      path: '/step/2',
      name: 'RegisterStep2',
      component: RegisterStep2
    },
    {
      path: '/step/3',
      name: 'RegisterStep3',
      component: RegisterStep3
    },
    {
      path: '/account/profile/:id/',
      component: ProfileUser,
      props: route => ({
        id: Number(route.params.id),
      })
    },
    // * 案件作成
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
    // * チャット
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