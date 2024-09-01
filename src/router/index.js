import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainBody.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    components: {
      default: MainPage,
    }
  },
  /*{
    path: '/test2',
    name: 'test2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/testComp2.vue')
  }*/

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
