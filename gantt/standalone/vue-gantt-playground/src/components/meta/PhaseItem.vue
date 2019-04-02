<template>
  <div class="row mt-4">
    <!-- Status Bubble -->
    <div class="col-3">
      <div class="gantt-label"
           :class="status.class">
        {{ status.text }}
      </div>
    </div>

    <!-- Phase Info -->
    <div class="col phase">
      <!-- Title -->
      <div class="phase-title gantt-row"
           @click="opened = !opened">
        <i class="fas fa-fw mr-2"
           :class="[opened ? 'fa-angle-down' : 'fa-angle-right']" />
        {{ phase.name }}
      </div>

      <div v-show="opened">
        <!-- Milestone Component -->
        <milestone v-for="milestone in phase.milestones"
                   :key="milestone.id"
                   :data="milestone" />
      </div>
    </div>
  </div>
</template>

<script>
import MilestoneVue from './Milestone.vue'

export default {
  components: {
    Milestone: MilestoneVue
  },
  props: {

    /** @type {Vue.PropType<d3.HierarchyNode<Phase>>} data */
    data: {
      type: Object
    }
  },
  computed: {

    opened: {
      get() {
        return this.data.opened
      },
      set(val) {
        this.data.opened = val
      }
    },

    /**
     * @return {Phase}
     */
    phase() {
      return this.data.data
    },

    started() {
      const {
        startDate
      } = this.phase

      return Date.now() >= Date.parse(startDate)
    },

    status() {
      return {
        class: [this.started ? 'in-progress' : 'not-started'],
        text:  this.started ? 'In Progress' : 'Not Started'
      }
    }
  }
}
</script>

<style>
</style>
