import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Gantt from './views/Gantt.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:      '/',
      name:      'home',
      component: Home
    },
    {
      path:      '/gantt',
      name:      'gantt',
      component: Gantt
    }
  ]
})
