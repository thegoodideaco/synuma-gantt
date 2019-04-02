<template>
  <div class="pt-5 fill">
    <div class="container-fluid main-container">
      <div class="row">
        <div class="col">
          <div class="form-check">
            <input id="plannedTimelines"
                   class="form-check-input"
                   type="checkbox"
                   value="">
            <label class="form-check-label"
                   for="plannedTimelines">
              Show planned timelines
            </label>
          </div>
        </div>
      </div>

      <div class="gantt-container">
        <div class="metadata border-right">
          <div class="col-headers">
            <!-- TBD figure this shit out -->
          </div>

          <!-- Phase Item Component -->
          <phase-item v-for="phase in phases"
                      :key="phase.data.id"
                      :data="phase" />
        </div>
        <!-- end .metadata -->
        <div class="date-grid">
          <!-- Gantt Chart -->
          <gantt-chart v-if="hierarchy"
                       :hierarchy="hierarchy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { flatten, dataLoad } from '../components/gantt/mixins/GanttHierarchy'
import PhaseItemVue from '../components/meta/PhaseItem.vue'
import GanttChartVue from '../components/gantt/NewChart.vue'
export default {
  components: {
    PhaseItem:  PhaseItemVue,
    GanttChart: GanttChartVue
  },
  mixins: [flatten, dataLoad],
  data() {
    return {
      /** @type {d3.HierarchyNode<GanttDataObject>} */
      hierarchy: null
    }
  },
  computed: {
    phases() {
      if (this.hierarchy) {
        return this.hierarchy.children
      }
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>
