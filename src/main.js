import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

const ROUTE_PATH = {
  HOME: '/',
  RESUME: '/resume',
}

const Home = () => import(/* webpackChunkName: "home" */ './home/Home.vue')
const Resume = () => import(/* webpackChunkName: "resume" */ './resume/Resume.vue')

const routes = [
  {
    path: ROUTE_PATH.HOME,
    component: Home,
    meta: { title: 'Personal Website' },
  }, {
    path: ROUTE_PATH.RESUME,
    component: Resume,
    meta: { title: 'Resume' },
  },
]

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `Vladimir Kolmakov - ${to.meta.title}`
  next()
})

const app = new Vue({
  router,
  el: '#app',
  render: h => h(App),
})

// Handle possible GH pages redirect
const GH_PAGES_REDIRECT_KEY = '_GH_PAGES_REDIRECT'
const potentialGhPagesRedirect = window.localStorage.getItem(GH_PAGES_REDIRECT_KEY)

window.localStorage.removeItem(GH_PAGES_REDIRECT_KEY)

switch (potentialGhPagesRedirect) {
  case ROUTE_PATH.RESUME: {
    app.$router.push(potentialGhPagesRedirect)
    break
  }
  default: {
    // real 404 and something went wrong
    break
  }
}
