import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import '@/assets/scss/style.scss'

// Provide a global gantt chart component
Vue.component('StandaloneGanttChart', () => import('@/components/gantt/StandaloneGanttChart.vue'))


Vue.config.productionTip = false

window.vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#ganttContainer')

window.d3 = require('d3')