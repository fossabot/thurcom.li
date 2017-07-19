import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/views/login/Login.vue')
const Guide = () => import('@/views/guide/Guide.vue')
const Recordings = () => import('@/views/recordings/Recordings.vue')
const RecordingsDetails = () => import('@/views/recordings/Details.vue')
const Live = () => import('@/views/live/Live.vue')
const Peer = () => import('@/views/peer/Peer.vue')

const requiresAuth = true
const props = true

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/guide', component: Guide, meta: { requiresAuth } },
    { path: '/recordings', component: Recordings, meta: { requiresAuth } },
    {
      path: '/recordings/:id',
      component: RecordingsDetails,
      meta: { requiresAuth },
      props
    },
    { path: '/live', component: Live, meta: { requiresAuth } },
    { path: '/peer', component: Peer },
    { path: '*', redirect: '/live' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.authToken) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
