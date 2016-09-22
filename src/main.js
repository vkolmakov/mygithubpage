import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './home/Home.vue'
import Resume from './resume/Resume.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/resume', component: Resume },
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  el: '#app',
  render: h => h(App),
})
