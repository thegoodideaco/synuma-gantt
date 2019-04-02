<template>
  <div class="mt-4 phase-row">
    <div class="gantt-row">
      <!-- Put Stuff Here -->
      <div class="bar"
           :style="position(phase.startDate)" />
    </div>
    <collapse-transition>
      <div v-show="data.opened">
        <milestone v-for="milestone in data.children"
                   :key="milestone.data.id"
                   :data="milestone" />
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import GantMilestoneVue from './GantMilestone.vue'
import CollapseTransitionVue from '../CollapseTransition.vue'
import { phaseDateLogic } from './mixins/GanttHierarchy'
export default {
  components: {
    Milestone:          GantMilestoneVue,
    CollapseTransition: CollapseTransitionVue
  },
  mixins: [phaseDateLogic],
  props:  {
    /** @type {Vue.PropType<d3.HierarchyNode<Phase>>} */
    data: {
      type: Object
    }
  },
  computed: {
    /** @returns {Phase} */
    phase() {
      return this.data.data
    },

    /** @returns {Milestone[]} */
    milestones() {
      return this.phase.milestones
    }
  },
  inject:  ['scale'],
  methods: {
    position(date) {
      const maxDate = this.maxDate
      const x = this.scale(Date.parse(date))
      const w = this.scale(maxDate) - x
      return {
        transform: `translate(${x}px)`,
        width:     `${w}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.phase-row {
  position: relative;

  .bar {
    height: 22px;
    min-width: 4px;
    background-color: #007adb;
    position: absolute;
    // top: 0;
    left: 0;
  }
}
.milestone {
  // background-color: #fff;
  padding: 0;

  &:nth-child(even) {
    // background-color: darken(#fff, 2);
  }
}
</style>
