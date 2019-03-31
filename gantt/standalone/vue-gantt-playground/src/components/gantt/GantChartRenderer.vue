<template>
  <div class="gant__chart-display">
    <!-- Phases -->
    <div v-if="hierarchy"
         class="rows">
      <chart-row v-for="(item, index) in hierarchy.children"
                 :key="index"
                 :item="item" />
    </div>
  </div>
</template>

<script>
import hierarchy, { flatten } from './mixins/GanttHierarchy'
import ChartRow from '@/components/gantt/rowItems/ChartRow.vue'
export default {
  components: {
    ChartRow
  },
  mixins: [hierarchy, flatten]
}
</script>

<style>
</style>
