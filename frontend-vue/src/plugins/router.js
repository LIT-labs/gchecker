import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/home/Home'),
    children: [
      {
        path: '',
        name: 'Start',
        component: () => import('@/views/home/Index'),
        meta: { breadCrumb: 'start' },
      },
      {
        path: '/new',
        name: 'new',
        component: () => import('../views/register/New'),
      },
      {
        path: '/register-confirm',
        name: 'register-confirm',
        component: () => import('../views/register/Confirm'),
      },
      {
        path: '/dashboard/:bubbleName/:slug',
        name: 'dashboard',
        component: () => import('../views/bubble/Dashboard'),
      },
    ],
  },
  { path: '/api' },
  { path: '*', redirect: '/' },
]

const router = new Router({
  base: process.env.BASE_URL || '/',
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/dashboard']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next()
  } else {
    next()
  }
})

export default router
// router.beforeEach((to, from, next) => {
//  const publicPages = ['/login', '/register', '/home']
//  const authRequired = !publicPages.includes(to.path)
//  const loggedIn = localStorage.getItem('user')
//
//  // trying to access a restricted page + not logged in
//  // redirect to login page
//  if (authRequired && !loggedIn) {
//    next('/login')
//  } else {
//    next()
//  }
// })
// router
