import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainBody.vue'
import MainPage2 from '../components/MainBody2.vue'
import MainPage3 from '../components/MainBody3.vue'
import MainPage4 from '../components/MainBody4.vue'
import MainPage5 from '../components/MainBody5.vue'
import MainPage6 from '../components/MainBody6.vue'
import MainPage7 from '../components/MainBody7.vue'
import MainPage8 from '@/components/MainBody8.vue'
import ProblemEditPage from '@/components/ProblemEditPage.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    components: {
      default: MainPage,
    }
  },
  {
    path: '/Page2',
    name: 'MainPage2',
    components: {
      default: MainPage2,
    }
  },
  {
    path: '/Page3',
    name: 'MainPage3',
    components: {
      default: MainPage3,
    }
  },
  {
    path: '/Page4',
    name: 'MainPage4',
    components: {
      default: MainPage4,
    }
  },
  {
    path: '/Page5',
    name: 'MainPage5',
    components: {
      default: MainPage5,
    }
  },
  {
    path: '/Page6',
    name: 'MainPage6',
    components: {
      default: MainPage6,
    }
  },
  {
    path: '/Page7',
    name: 'MainPage7',
    components: {
      default: MainPage7,
    }
  },
  {
    path: '/Page8',
    name: 'MainPage8',
    components: {
      default: MainPage8,
    }
  },
  {
    path: '/problem-edit/program/:id(\\d+)',  // :id 參數只接受數字
    name: 'ProgramProblemEdit',
    component:{
      default: ProblemEditPage,
    },
    props: true,
  },
  {
    path: '/problem-edit/math/:id(\\d+)',  // :id 參數只接受數字
    name: 'MathProblemEdit',
    component:{
      default: ProblemEditPage,
    },
    props: true,
  },
  {
    path: '/problem-edit/natural/:id(\\d+)',  // :id 參數只接受數字
    name: 'NaturalProblemEdit',
    component:{
      default: ProblemEditPage,
    },
    props: true,
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
