<template>
  <div class="gant__info-pane">
    <!-- Phase Items -->
    <phase-item v-for="(item, index) in phases"
                :key="index"
                class="gant-row"
                :item="item" />
  </div>
</template>

<script>
import PhaseItem from './rowItems/PhaseInfo.vue'
import hierarchy from './mixins/GanttHierarchy'
export default {
  components: {
    PhaseItem
  },
  mixins:   [hierarchy],
  computed: {
    /** @returns {d3.HierarchyNode<GanttDataObject>[]} */
    phases() {
      if (this.hierarchy) {
        /** @type {d3.HierarchyNode<GanttDataObject>} */
        const h = this.hierarchy

        return [...h.ancestors().pop().children]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.gant {
  &__info-pane {
    background-color: #fafafa;
    color: lighten(#000, 4);
  }
}
</style>
