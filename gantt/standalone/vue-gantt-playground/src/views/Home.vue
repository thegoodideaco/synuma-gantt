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
    <div>
      <ul class="phase-list">
        <!-- Phases -->
        <li v-for="item in phases"
            :key="item.name">
          <span :title="item | stringify"
                @click="showdata(item)">

            {{ item.name }} - {{ item.startDate | formatDate }}
          </span>

          <!-- Phase Milestones -->
          <ul>
            <li v-for="(milestone, index) in item.milestones"
                :key="index">
              <span :title="milestone | stringify"
                    @click="showdata(milestone)">

                {{ milestone.name }}
              </span>

              <!-- Tasks -->
              <ul>
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
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

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
  data() {
    return {
      /**
       * @type {GanttDataObject}
       */
      result: null,

      /** @type {number[]} */
      dateRange: null
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
      if(this.dateRange) {
        const [b, e] = d3.extent(this.dateRange)

        const ms = e - b
        const s = ms / 1000 >> 0
        const m = s / 60 >> 0
        const h = m / 60 >> 0
        const d = h / 24 >> 0

        const labels = ['seconds', 'minutes', 'hours', 'days']
        const values = [
          s % 60,
          m % 60,
          h % 24,
          d % 365
        ]

        return values.map((v, i)=> {
          return `${v} ${labels[i]}`
        }).reverse().join(', ')
      }
    }
  },
  async mounted() {
    /** @type {{data: GanttDataObject}} */
    const { data } = await d3.json('/data.json')
    this.result = data

    this.dateRange = this.getAllDates()
  },
  methods: {
    getAllDates() {



      /** @type {number[]} */
      const all = []

      /** @type {GanttDataObject | Phase | Milestone | Task} */
      const obj = JSON.parse(JSON.stringify(this.result))

      const rootNode = d3.hierarchy(obj, v => v.phases || v.milestones || v.tasks)

      rootNode.eachBefore(v => {
        const dates = Object.entries(v.data).reduce((prev, cur) => {
          const [key, val] = cur

          if(key.match(/date/gi) && typeof val === 'string') {
            const ms = Date.parse(val)
            prev.push(ms)
          }

          return prev
        }, [])

        all.push(...dates)
      })

      return all
    },
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

.phase-list {
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
</style>
