<template>
  <div class="gantt__info phase"
       :class="myClasses">
    <div class="gant-row__info-title">
      {{ phase.name }} / {{ phase.statusName }}

      <button v-if="item.children"
              @click="toggleItem(item, $event)">
        Click me {{ item.visible }}
      </button>
    </div>

    <div v-if="item.children"
         v-show="item.visible"
         class="gantt__info-body">
      <!-- Milestones -->
      <info-item v-for="(_item, index) in item.children"
                 :key="index"
                 :item="_item" />
    </div>
  </div>
</template>

<script>
export default {
  name:  'InfoItem',
  props: {
    item: {
      type:     Object,
      required: true
    }
  },
  computed: {
    /** @returns {Phase} */
    phase() {
      return this.item.data
    },

    /** @returns {Milestone[]} */
    milestones() {
      return this.phase.milestones
    },

    myClasses() {
      /** @type {d3.HierarchyNode<DescendantItem>} */
      const { depth, visible } = this.item

      const classes = ['depth-' + depth]

      if (visible) classes.push('visible')

      return classes
    }
  },
  methods: {

    /**
     * @param {d3.HierarchyNode<DescendantItem>} item
     * @param {MouseEvent} event
     */
    toggleItem(item, event) {

      item.visible = !item.visible
      if(event.altKey) {
        // Recursive
        item.eachBefore(v => v.visible = item.visible)
      }
    }
  }
}
</script>

<style scoped lang="scss">
-title {
  .gantt__info & {
    background-color: green;
  }

  &:nth-child(even) {
    background-color: blue;
  }
}
</style>
