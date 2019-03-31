<template>
  <div class="gant__container">
    <!-- Info Pane -->
    <info-pane />

    <!-- Chart Display -->
    <chart-display />
  </div>
</template>

<script>
import InfoPane from './GantChartInfoPane.vue'
import ChartDisplay from './GantChartRenderer.vue'

export default {
  components: {
    InfoPane,
    ChartDisplay
  },
  props: {
    json: {
      type: Object
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
