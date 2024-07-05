import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/util/chineseToJson',
    name: 'ctjson',
    component: () => import('@/views/ChinnesetoJson.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
