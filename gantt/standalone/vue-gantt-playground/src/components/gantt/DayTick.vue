<template>
  <div class="date-ticks__day"
       :class="{today}"
       :style="styles">
    {{ day }}
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  props: {
    /** @type {Vue.PropType<Date>} */
    item: Date
  },
  inject:   ['scale'],
  computed: {
    day() {
      return this.item.getDate()
    },
    today() {
      const f = d3.timeFormat('%x')
      return f(this.item) === f(new Date())
    },
    styles() {
      const x = this.scale(this.item)
      return {
        transform: `translate3d(${x}px,0,0)`
      }
    }
  }
}
</script>

<style lang="scss">
 .date-ticks__day {
   background-color: #fafafa;
   border-left: 1px solid #f3f3f3;
   border-right: 1px solid #f3f3f3;
   text-align: center;

   &.today {
     background-color: #f0ffe0;
   }
 }
</style>
