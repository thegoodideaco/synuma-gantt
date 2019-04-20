<template>
  <div class="demo">
    <section>
      <h2>Gantt Chart Example</h2>
      <p>
        This component looks for a dataset based on the demo data structure.
      </p>
      <p>
        Simply mount this component, and assign dataset to it's data value.
      </p>
    </section>

    <section>
      <div>
        <!-- This is all you need -->
        <standalone-gantt :dataset="data" />
        <!-- -------------------- -->
      </div>
    </section>
  </div>
</template>

<script>
import StandaloneGanttChartVue from '../components/gantt/StandaloneGanttChart.vue'
import * as d3 from 'd3'
export default {
  components: {
    StandaloneGantt: StandaloneGanttChartVue
  },
  data() {
    return {
      data: null
    }
  },
  async mounted() {
    const { data } = await d3.json('/data.json')

    this.data = data
  }
}
</script>

<style lang="scss" scoped>
.demo {
  height: 100vh;
  position: relative;
  display: grid;
  grid: auto 1fr / 100%;
  background-color: darken(#fff, 4);

  section {
    &:first-child {
      height: 20vh;
      text-align: center;
      padding: 25px;
    }

    &:last-child {
      padding: 50px;
      overflow: hidden;

      > div {
        background-color: #fff;
        overflow: auto;
        padding: 3px;
        border: 1px solid rgba(#000, 0.2);
        box-shadow: 0 0 3px rgba(#000, 0.15);
        height: 100%;
      }
    }
  }
}
</style>
