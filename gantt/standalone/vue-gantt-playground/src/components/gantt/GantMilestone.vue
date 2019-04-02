<template>
  <div class="milestone gantt-row"
       :style="{paddingLeft: `${scale(info.startDate)}px`}">
    <!-- Positions will be automated -->
    {{ scale(info.startDate) }}
  </div>
</template>


<script>
export default {
  props: {
    /** @type {Vue.PropType<Milestone>} */
    data: {
      type: Object
    }
  },
  inject:   ['scale'],
  computed: {
    /** @returns {Milestone} */
    milestone() {
      return this.data
    },
    info() {
      const {
        startDate
      } = this.milestone

      return {
        startDate: Date.parse(startDate)
      }
    }
  }
}
</script>

<style>
</style>
