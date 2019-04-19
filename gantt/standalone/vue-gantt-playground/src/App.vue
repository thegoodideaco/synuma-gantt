<template>
  <gantt-chart />
</template>

<script>
import AboutVue from './views/About.vue'

export default {
  components: {
    GanttChart: AboutVue
  }
}
</script>


<style scoped>
#app {
  height: 100vh;
}
</style>