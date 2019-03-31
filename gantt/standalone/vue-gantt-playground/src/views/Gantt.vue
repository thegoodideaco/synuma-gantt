<template>
  <main-layout no-padding>
    <template #title>
      Cool Dude
    </template>

    <!-- Gantt Chart -->
    <gantt class="fill"
           :json="result" />
  </main-layout>
</template>

<script>
import * as d3 from 'd3'
import MainLayout from '@/layouts/MainLayout.vue'
import Gantt from '@/components/gantt/GanttChart.vue'
export default {
  components: {
    MainLayout,
    Gantt
  },
  data() {
    return {

      /** @type {GanttDataObject} */
      result: null
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {

      /**
       * @type {{data: GanttDataObject}}
       */
      const {
        data
      } = await d3.json('/data.json')

      this.result = Object.freeze(data)
    }
  }
}
</script>

<style>
</style>
