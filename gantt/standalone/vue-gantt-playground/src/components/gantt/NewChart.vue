<template>
  <div class="chart__inner"
       style="overflow: auto">
    <div style="position: absolute; height:100%">
      <!-- Days -->
      <div class="ticks no-select">
        <day-tick v-for="(item, index) in ticks.days"
                  :key="index"
                  class="tick__day"
                  :style="{width: '30px'}"
                  :item="item" />

        <div v-for="(item, index) in ticks.months"
             :key="'_'+index"
             class="vertical-tick"
             :style="position(item)">
          <span style="position: absolute; transform: translateY(30px) translateX(10px);">
            {{ item | monthFormat }}
          </span>
        </div>
      </div>
    </div>

    <!-- Phases -->
    <phase-row v-for="phase in phases"
               :key="phase.id"
               :data="phase" />

    <!-- Today's Tick -->
    <div v-if="false"
         class="vertical-tick"
         :style="styles.dayTicker" />
  </div>
</template>

<script>
import * as d3 from 'd3'
import GanttHierarchy, { flatten, dateLogic } from './mixins/GanttHierarchy'
// import {panZoom} from './mixins/Interaction'
import GantPhaseRowVue from './GantPhaseRow.vue'
import DayTickVue from './DayTick.vue'

export default {
  components: {
    PhaseRow: GantPhaseRowVue,
    DayTick:  DayTickVue
  },
  filters: {
    /**
     * @param {Date} val
     */
    dayFormat(val) {
      return val.getDate()
    },

    monthFormat(val) {
      return d3.timeFormat('%B')(val)
    }
  },
  mixins: [GanttHierarchy, flatten, dateLogic ],
  data() {
    return {
      today: Date.now()
    }
  },
  computed: {
    phases() {
      return this.hierarchy.children
    },

    totalDays() {
      if (this.timeInfo) {
        const {
          total: [b, e]
        } = this.timeInfo

        return d3.timeDays(b, e).length
      }
    },

    scale() {
      if (this.timeInfo) {
        const {
          total: [b, e]
        } = this.timeInfo

        const domain = [b, e].map(v => new Date(v))

        return d3
          .scaleTime()
          .domain(domain)
          .range([0, this.totalDays * 30])
          .nice(this.totalDays)
      }
    },

    ticks() {
      const [b, e] = this.timeInfo.total
      return {
        days:     this.scale.ticks(this.totalDays),
        weeks:    d3.timeWeeks(b, e),
        months:   d3.timeMonths(b, e),
        weekends: [d3.timeSaturdays(b, e), ...d3.timeSundays(b, e)]
      }
    },

    styles() {
      return {
        dayTicker: {
          transform: `translateX(${this.scale(this.today)}px)`
        }
      }
    }
  },
  mounted() {
    if (this.timer) clearInterval(this.timer)

    this.timer = setInterval(() => {
      this.today = Date.now()
    }, 10000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    position(date) {
      const x = Math.round(this.scale(date))
      return {
        transform: `translate3d(${x}px, 0, 0)`
      }
    }
  },
  provide() {
    return {
      chart: this
    }
  }
}
</script>

<style lang="scss">
.chart__inner {
  position: relative;
  height: 100%;
  .vertical-tick {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 2px;
    background-color: rgba(#000, 0.25);
  }

  .ticks {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    > * {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }

    &__day {
      background-color: green;
    }

    &__week {
      background-color: green;
    }

    &__weekends {
      background-color: green;
    }

    &__month {
      background-color: green;
    }
  }
}
</style>
