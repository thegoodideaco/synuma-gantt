<template>
  <div class="gantt">
    <div class="ticks">
      <div v-for="(item, index) in timeTicks"
           :key="index"
           :style="{left: `${item.x}px`}">
        {{ item.value | formatDate }}
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  filters: {
    asKeys(val) {
      return Object.keys(val)
    },

    formatDate(dateStr) {
      const f = d3.timeFormat('%a')(new Date(dateStr))
      return f
    }
  },
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      dimensions: null,
      tickAmount: 10
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

    groupedDescendants() {
      if (this.orderedDescendants) {
        /** @type {[d3.HierarchyNode<Phase>[], d3.HierarchyNode<Milestone>[], d3.HierarchyNode<Task>[]]} */
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

    dateRange() {
      if (this.allDates) return d3.extent(this.allDates)
    },

    /** @returns {Date[]} */
    timeTicks() {
      if (this.dateRange && this.dimensions) {
        const { width } = this.dimensions

        /** @type {d3.ScaleTime<number,number>} */
        const s = d3
          .scaleTime()
          .domain(this.dateRange)
          .range([0, width])
          .nice()

        return s.ticks().map(d => {
          return {
            x:     s(d),
            value: d
          }
        })
      }
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

    console.log(this.$el)
    this.dimensions = {
      bottom,
      height,
      left,
      right,
      top,
      width
    }
  }
}
</script>

<style scoped lang="scss">
.gantt {
  width: 100%;
  height: 100%;
  position: relative;

  .ticks {
    position: relative;
    font-size: 10px;
    line-height: normal;
    > * {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
