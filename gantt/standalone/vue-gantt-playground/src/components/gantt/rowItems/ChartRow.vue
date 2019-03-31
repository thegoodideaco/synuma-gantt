<template>
  <div class="chart-row gant-row">
    <div class="gant-row__info-title"
         @click="onClick()">
      {{ item.data.name }} - {{ user }}
    </div>
    <div v-if="item.children"
         v-show="item.visible"
         class="chart-body">
      <chart-row v-for="(_item, index) in item.children"
                 :key="index"
                 :item="_item" />
    </div>
  </div>
</template>

<script>
export default {
  name:  'ChartRow',
  props: {
    item: {
      type:     Object,
      required: true
    }
  },
  computed: {

    /**
     * @returns {string}
     */
    user() {

      /** @type {DescendantItem} */
      const {
        assignedToFirstName: f,
        assignedToLastName: l
      } = this.item.data

      if(!f || !l) return null

      return `${f} ${l}`
    }
  },
  methods: {
    onClick() {
      console.log(this.item.data)
    }
  }
}
</script>

<style>
</style>
