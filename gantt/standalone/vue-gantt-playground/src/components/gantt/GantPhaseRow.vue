<template>
  <div class="mt-4 phase-row">
    <div class="gantt-row">
      <!-- Put Stuff Here -->
      <div class="bar" />
    </div>

    <div v-show="data.opened">
      <milestone v-for="milestone in milestones"
                 :key="milestone.id"
                 :data="milestone" />
    </div>
  </div>
</template>

<script>
import GantMilestoneVue from './GantMilestone.vue'
export default {
  components: {
    Milestone: GantMilestoneVue
  },
  props: {
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
  inject: ['scale']
}
</script>

<style scoped lang="scss">
.phase-row {
  position: relative;

  .bar {
    height: 22px;
    min-width: 4px;
    background-color: #007adb;
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
