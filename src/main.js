import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './home/Home.vue'
import Resume from './resume/Resume.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'Personal Website' } },
  { path: '/resume', component: Resume, meta: { title: 'Resume' } },
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `Vladimir Kolmakov - ${to.meta.title}`
  next()
})

new Vue({
  router,
  el: '#app',
  render: h => h(App),
})
