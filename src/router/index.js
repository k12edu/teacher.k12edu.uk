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
import ProblemCreatePage from '@/components/ProblemCreatePage.vue'
import ProblemShowPage from '@/components/problem_info_show_page/ProblemShowPage.vue'
import AnnouncementShowPage from '@/components/announcement_show_page/AnnouncementShowPage.vue'
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
    components:{
      default: ProblemEditPage,
    },
    props: true
  },
  {
    path: '/problem-edit/math/:id(\\d+)',  // :id 參數只接受數字
    name: 'MathProblemEdit',
    components:{
      default: ProblemEditPage,
    },
    props: true,
  },
  {
    path: '/problem-edit/natural/:id(\\d+)',  // :id 參數只接受數字
    name: 'NaturalProblemEdit',
    components:{
      default: ProblemEditPage,
    },
    props: true,
  },
  {
    path: '/problem-show/problem/:id(\\d+)',  // :id 參數只接受數字
    name: 'ProgramProblemShow',
    components:{
      default: ProblemShowPage,
    },
    props: true,
  },
  {
    path: '/problem-show/math/:id(\\d+)',  // :id 參數只接受數字
    name: 'MathProblemShow',
    components:{
      default: ProblemShowPage,
    },
    props: true,
  },
  {
    path: '/problem-show/natural/:id(\\d+)',  // :id 參數只接受數字
    name: 'NaturalProblemShow',
    components:{
      default: ProblemShowPage,
    },
    props: true,
  },
  {
    path: '/problem-create/',  // :id 參數只接受數字
    name: 'ProblemCreate',
    components:{
      default:   ProblemCreatePage,
    },
    props: true,
  },
  {
    path: '/announcement-show/:id(\\d+)',  // :id 參數只接受數字
    name: 'AnnouncementShow',
    components:{
      default: AnnouncementShowPage,
    },
    props: true,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
