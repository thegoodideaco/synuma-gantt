<template>
  <div>
    Make a gantt chart

    <div>
      <ul>
        <li v-for="item in phases"
            :key="item.name">
          <span :title="item | stringify">

            {{ item.name }}
          </span>

          <ul>
            <li v-for="(milestone, index) in item.milestones"
                :key="index">
              <span :title="milestone | stringify">

                {{ milestone.name }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  filters: {
    stringify(val) {
      return JSON.stringify(val, null, ' ')
    },
    formatDate(dateStr) {
      const f = d3.timeFormat('mm:MM')(new Date(dateStr))
      d3.area
      return f
    }
  },
  data() {
    return {
      /**
       * @type {GanttDataObject}
       */
      result: null
    }
  },
  computed: {
    phases() {
      if (this.result) {
        return this.result.phases
      }
    }
  },
  async mounted() {
    /** @type {{data: GanttDataObject}} */
    const { data } = await d3.json('/data.json')

    this.result = data
  },
  methods: {
    generate() {
      const {
        phases
      } = this.result

      phases.forEach(v => {
        v.
      })
    }
  }
}
</script>
