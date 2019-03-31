<template>
  <div class="gantt">
    <svg width="100%"
         height="100%">
      <scale-ticks :scale="zoomTransform || scale"
                   :count="30"
                   position="top">
        <!-- slot content -->
        <template v-slot:default="item">
          <!-- {{ item.value | formatDate }} -->
          <text>{{ item.value | formatDate }}

            <title>{{ item.value }}</title>
          </text>
        </template>
      </scale-ticks>
    </svg>

    <div class="bg">
      <div v-for="(item,index) in orderedDescendants"
           :key="index"
           :style="getRowStyle(item)">
        {{ item.data.name }} / {{ item.data.startDate | formatDate }} - {{ item.data.plannedCompleteDate | formatDate }}
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import ScaleTicks from '@/components/gantt/ScaleTicks.vue'

export default {
  filters: {
    asKeys(val) {
      return Object.keys(val)
    },

    formatDate(dateStr) {

      const f = d3.timeFormat('%b/%y')(typeof dateStr === 'number' ? dateStr : Date.parse(dateStr))
      return f
    }
  },
  components: {
    ScaleTicks: ScaleTicks
  },
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      dimensions:    null,
      tickAmount:    10,
      scale:         d3.scaleTime(),
      scaleY:        d3.scaleLinear(),
      zoom:          null,
      zoomTransform: null
    }
  },
  computed: {
    /**
     * Retrieve all nodes in a flattened linear order
     * @returns {d3.HierarchyNode<GanttDataObject>[]}
     */
    orderedDescendants() {
      if (!this.value) return
      const all = []

      /** @type {d3.HierarchyNode<GanttDataObject>} */
      const v = this.value

      v.eachBefore(n => {
        all.push(n)
      })

      // Return all but the root node
      return all.splice(1)
    },

    /** @returns {{phases: d3.HierarchyNode<Phase>[], milestones: d3.HierarchyNode<Milestone>[], tasks: d3.HierarchyNode<Task>[]}} */
    groupedDescendants() {
      if (this.orderedDescendants) {
        const [phases, milestones, tasks] = d3
          .nest()
          .key(v => v.depth)
          .sortKeys(d3.ascending)
          .entries(this.orderedDescendants)
          .map(v => v.values)

        return {
          phases,
          milestones,
          tasks
        }
      }
    },

    /**
     * Returns all dates as milliseconds for any object key with 'date' in the name
     * @returns {number[]}
     */
    allDates() {
      /** @type {d3.HierarchyNode<DescendantItem>[]} */
      const all = this.orderedDescendants

      const reduced = all.reduce((prev, cur) => {
        /** @type {d3.HierarchyNode<DescendantItem>} */
        const { data } = cur

        /** @type {[string, any][]} */
        const dateEntries = Object.entries(data)

        const dateValues = dateEntries.reduce((p, [k, v]) => {
          if (k.match(/date/gi) && typeof v === 'string') {
            const parsed = Date.parse(v)
            p.push(parsed)
          }

          return p
        }, [])

        prev.push(...dateValues)

        return prev
      }, [])

      return reduced

      // return all.map(v => {
      //   const { data } = v

      //   return Object.entries(data)
      //     .filter(e => {
      //       return e[0].match(/date/gi) && e[1] != null
      //     })
      //     .map(d => Date.parse(d[1]))
      // })
    },

    /** @returns {[number, number]} */
    dateRange() {
      if (this.allDates) return d3.extent(this.allDates)
    },

    totalTime() {
      if (this.dateRange) {
        const [b, e] = d3.extent(this.dateRange)

        const ms = e - b
        const s = (ms / 1000) >> 0
        const m = (s / 60) >> 0
        const h = (m / 60) >> 0
        const d = (h / 24) >> 0

        const labels = ['seconds', 'minutes', 'hours', 'days']
        const values = [s % 60, m % 60, h % 24, d % 365]

        return values
          .map((v, i) => {
            return `${v} ${labels[i]}`
          })
          .reverse()
          .join(', ')
      }
    },

    phaseTimes() {
      if(!this.groupedDescendants.phases) return []
      const phases = this.groupedDescendants.phases.filter(
        v => v.data.startDate != null
      )

      return phases.map(v => Date.parse(v.data.startDate))
    }
  },
  watch: {
    /** @param {{width: number, height: number}} val */
    dimensions: {
      handler(val) {
        if (val) {
          this.scale.range([0, val.width]).nice(30)
        }
      },
      immediate: true
    },

    /**
     * @param {number[]} val
     */
    allDates: {
      handler(val) {
        if (val && val.length) {
          this.scale.domain(d3.extent(val))
        }
      },
      immediate: true
    }
  },
  mounted() {
    const {
      bottom,
      height,
      left,
      right,
      top,
      width
    } = this.$el.getBoundingClientRect()

    this.scale = d3
      .scaleTime()
      .domain(this.dateRange)
      .range([0, width / 2])

    this.scaleY = d3
      .scaleLinear()
      .domain([0, 20])
      .range([0, height])

    this.dimensions = {
      bottom,
      height,
      left,
      right,
      top,
      width
    }

    this.zoom = d3
      .zoom()
      .scaleExtent([0.25, 4])
      .on('zoom', () => {
        /** @type {d3.ZoomTransform} */
        const z = d3.event.transform

        this.zoomTransform = z.rescaleX(this.scale)
      })

    this.zoom(d3.select(this.$el))

    // zoom.
  },
  methods: {

    /**
     * @param {number | string} date
     * @returns {any}
     */
    getItemPosition(date) {
      const x = (this.zoomTransform || this.scale)(typeof date === 'string' ? Date.parse(date) : date)

      return {
        transform: `translate3d(${x}px, 0, 0)`
      }
    },

    /** @param {d3.HierarchyNode<DescendantItem>} item */
    getRowStyle(item) {

      const date = item.data.startDate
      const end = item.data.plannedCompleteDate

      const s = typeof date === 'string' ? Date.parse(date) : date
      const e = typeof end === 'string' ? Date.parse(end) : end
      const sx = (this.zoomTransform || this.scale)(s)
      const se = (this.zoomTransform || this.scale)(e)


      return {
        transform: `translate3d(${sx}px, 0, 0)`,
        width:     `${se - sx}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.gantt {
  width: 100%;
  height: 100%;
  position: relative;

  text {
    position: relative;
    font-size: 9px;
    line-height: normal;
    transform-origin: 0 0;
    transform: rotate(-40deg);
    text-anchor: unset;
  }

  svg {
    overflow: visible;
  }
}

.circles,
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow: hidden;
}
.circle {
  position: absolute;
  top: 0;
}

.bg > div {
  padding: 10px;
  background-color: green;
  min-width: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  border-bottom: 1px solid #fff;
}
</style>
