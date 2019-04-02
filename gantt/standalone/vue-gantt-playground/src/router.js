import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Gantt from './views/Gantt.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:      '/',
      name:      'home',
      component: About
    },
    {
      path:      '/new',
      name:      'new',
      component: Home
    },
    {
      path:      '/gantt',
      name:      'gantt',
      component: Gantt
    }
  ]
})
