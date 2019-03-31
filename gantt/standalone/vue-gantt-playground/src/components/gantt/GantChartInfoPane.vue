<template>
  <div class="gant__info-pane">
    Hello

    <phase-item />
  </div>
</template>

<script>
import PhaseItem from './rowItems/PhaseInfo.vue'
export default {
  components: {
    PhaseItem
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
