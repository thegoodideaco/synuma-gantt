<template>
  <div class="gant__container">
    <!-- Info Pane -->
    <info-pane :hierarchy="hierarchy" />

    <!-- Chart Display -->
    <chart-display :hierarchy="hierarchy" />
  </div>
</template>

<script>
import * as d3 from 'd3'

import { flatten } from './mixins/GanttHierarchy'

import InfoPane from './GantChartInfoPane.vue'
import ChartDisplay from './GantChartRenderer.vue'

export default {
  components: {
    InfoPane,
    ChartDisplay
  },
  mixins: [flatten],
  props:  {
    json: {
      type: Object
    }
  },
  data() {
    return {
      /** @type {d3.HierarchyNode<GanttDataObject>} */
      hierarchy: null
    }
  },
  watch: {
    json: {
      handler(val) {
        if (val) {
          const h = d3.hierarchy(val, v => {
            /** @type {DescendantItem} */
            const item = v
            return item.phases || item.milestones || item.tasks
          })

          h.each(v => {
            Object.assign(v, {
              visible: true
            })
          })

          this.hierarchy = h
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.gant {
  &__container {
    display: grid;
    grid: 100% / minmax(max-content, 30%) 1fr;
  }
}
</style>
