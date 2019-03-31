<template>
  <div>
    <!-- Basic Info -->
    <div v-if="basicInfo"
         class="info-bar">
      <h2>
        {{ basicInfo.timelineName }} /
        <small>{{ totalTime }}</small>
      </h2>

      <!-- Include Weekends -->
      <label>
        <input type="checkbox"
               :value="basicInfo.includeWeekends">

        <span>Include Weekends</span>
      </label>

      <!-- Landlord Turnover Date -->
      <label>
        <input type="checkbox"
               :value="basicInfo.includeWeekends">

        <span>Has Landlord Turnover Date</span>
      </label>

      <!-- Display Timeline Planned Date -->
      <label>
        <input type="checkbox"
               :value="basicInfo.includeWeekends">

        <span>Display Timeline Planned Date</span>
      </label>
    </div>

    <!-- Content -->
    <div class="gantt__container">
      <!-- Left Side -->
      <ul class="gantt__phase-list">
        <!-- Phases -->
        <li v-for="item in phases"
            :key="item.name">
          <span :title="item | stringify"
                @click="showdata(item)">

            {{ item.name }} - {{ item.startDate | formatDate }}
          </span>

          <!-- Milestones -->
          <ul class="gantt__milestone-list">
            <li v-for="(milestone, index) in item.milestones"
                :key="index">
              <span :title="milestone | stringify"
                    @click="showdata(milestone)">

                {{ milestone.name }}
              </span>

              <!-- Tasks -->
              <ul class="gantt__task-list">
                <li v-for="(task, taskIndex) in milestone.tasks"
                    :key="taskIndex">
                  <span :title="task | stringify"
                        @click="showdata(task)">

                    {{ task.name }} / {{ task.statusName }}
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Right Side -->
      <div class="gantt__chart-container">
        <!-- Chart Goes Here -->
        <gantt-chart v-if="hierarchy"
                     :value="hierarchy" />
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import GanttChart from '@/components/gantt/GanttChart.vue'

export default {
  name:    'Home',
  filters: {
    stringify(val) {
      return JSON.stringify(val, null, ' ')
    },
    formatDate(dateStr) {
      const f = d3.timeFormat('%A, %b %d, %Y at %X')(new Date(dateStr))
      return f
    }
  },
  components: {
    GanttChart: GanttChart
  },
  data() {
    return {
      /**
       * @type {GanttDataObject}
       */
      result: null,

      /** @type {number[]} */
      dateRange: null,

      /** @type {d3.HierarchyNode<GanttDataObject>} */
      hierarchy: null
    }
  },
  computed: {
    phases() {
      if (this.result) {
        return this.result.phases
      }
    },
    basicInfo() {
      if (!this.result) return null
      const {
        timelineName,
        includeWeekends,
        hasLandlordTurnoverDate,
        displayTimelinePlannedDate
      } = this.result

      return {
        timelineName,
        includeWeekends,
        hasLandlordTurnoverDate,
        displayTimelinePlannedDate
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
  async mounted() {
    // Fetch Json Data
    /** @type {{data: DescendantItem}} */
    const { data } = await d3.json('/data.json')
    this.result = Object.freeze(data)

    // Construct a hierarchy wrapper for functionality
    this.hierarchy = Object.freeze(
      d3.hierarchy(this.result, v => v.phases || v.milestones || v.tasks)
    )
  },
  methods: {
    showdata(item) {
      console.log(JSON.stringify(item, null, ' '))
    }
  }
}
</script>

<style lang="scss">
.info-bar {
  background-color: #007292;
  color: #fdfdfd;
  text-shadow: -1px -1px 3px rgba(0, 0, 0, 0.39);
  padding: 10px 15px;
  pointer-events: none;
  display: grid;
  align-items: center;
  grid-auto-flow: column dense;
  grid-template-columns: 1fr repeat(3, minmax(100px, max-content));
  gap: 25px;
}

.gantt {
  &__container {
    display: grid;
    grid: auto / max-content 1fr;
    gap: 10px;
  }

  &__phase-list {
    // list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    row-gap: 20px;

    ul {
      padding-left: 10px;
      margin: 0;
    }

    li {
      list-style: none;
      background-color: #fafafa;
      padding: 5px;

      &:nth-child(odd) {
        background-color: #fafafa;
      }
    }
  }

  &__milestone-list {
    color: orange;
  }

  &__task-list {
    color: green;
  }

  &__chart {
    &-container {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(#000, 0.1);
      border: 1px solid rgba(#fff, 0.5);
    }
  }
}
</style>
