<template>
  <div class="milestone gantt-row">
    <!-- Bar -->
    <div v-if="info.startDate"
         @mouseover="showPopover = true"
         @mouseout="showPopover = false">
      <div class="bar bar-full"
           :style="position(maxDate)">
           <!-- <span>
          Start {{ milestone.startDate | formatted }}
        </span>
        <span>
          Planned {{ milestone.plannedCompleteDate | formatted }}
        </span>
        <span>
          Actual {{ milestone.actualCompleteDate | formatted }}
        </span> -->
      </div>

      <popover :value="showPopover">
        <div :style="mousePosition"
             class="card">
          <h6>Status</h6>

          <div>
            Planned end: {{ milestone.plannedCompleteDate | formatted }}
          </div>
        </div>
      </popover>
    </div>
  </div>
</template>


<script>
import * as d3 from 'd3'
import { phaseDateLogic } from './mixins/GanttHierarchy'
import PopoverVue from '../Popover.vue'
export default {
  name:    'GantMilestone',
  filters: {
    formatted(val) {
      if (val == null) return 'N/A'
      return d3.timeFormat('%B %d')(Date.parse(val))
    }
  },
  components: {
    Popover: PopoverVue
  },
  mixins: [phaseDateLogic],
  props:  {
    /** @type {Vue.PropType<Milestone>} */
    data: {
      type: Object
    }
  },
  data() {
    return {
      showPopover:   false,
      mousePosition: null
    }
  },
  computed: {
    /** @returns {Milestone} */
    milestone() {
      return this.data.data
    },

    info() {
      const {
        startDate,
        plannedCompleteDate,
        estimatedCompleteDate,
        actualCompleteDate,
        isComplete
      } = this.milestone

      const allDates = Object.entries({
        startDate,
        plannedCompleteDate,
        estimatedCompleteDate,
        actualCompleteDate
      }).reduce((prev, [k, v]) => {
        prev[k] = v && typeof v === 'string' ? Date.parse(v) : null
        return prev
      }, {})

      return {
        ...allDates,
        isComplete
      }
    },

    styles() {
      const x = this.positions.startDate || 0
      const {
        plannedCompleteDate: p,
        estimatedCompleteDate: e,
        actualCompleteDate: a
      } = this.positions

      const w = p || e || a || null

      if (w == null)
        return {
          display: 'none'
        }

      return {
        barStyle: {
          transform: `translateX(${x}px)`,
          width:     `${w}px`
        }
      }
    },

    scale() {
      return this.chart.scale
    }
  },
  inject: ['chart'],
  mounted() {
    window.addEventListener('mousemove', this.onMove)

    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('mousemove', this.onMove)
    })
  },
  methods: {
    position(date) {
      if (!this.scale) return
      const x = this.scale(Date.parse(this.milestone.startDate))
      const w = this.scale(date) - x
      return {
        transform: `translate(${x}px)`,
        width:     `${w}px`
      }
    },

    /** @param {MouseEvent} me */
    onMove(me) {
      this.mousePosition = {
        left: `${me.pageX}px`,
        top:  `${me.pageY}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bar {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 6px 15px;
  // opacity: 0.5;


  &-e {
    background-color: #aedbff;
    border: 1px solid darken(#aedbff, 10);
  }
  &-a {
    background-color: yellow;
  }
  &-p {
    background-color: #26bb2e;
  }
  &-full {
    border: 2px solid #80c6fd;
    background-color: #80c6fd;

    &:hover {
      background-color: lighten(#80c6fd, 4);
    }

    > * {
      padding: 3px 10px;
      background-color: blue;
      color: #fff;
      margin-right: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 0 1px 3px rgba(#000, 0.5);
      font-size: 12px;
      &:nth-child(2) {
        background-color: #2826bb;
      }
      &:nth-child(3) {
        background-color: #b36309;
      }
    }
  }
}

.card {
  padding: 15px;
  position: relative;
  // top: 25px;
  transform: translate3d(-50%, 20px, 0);
}
</style>
