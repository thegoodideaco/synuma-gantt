<template>
  <div v-if="value"
       class="popover popover-custom"
       :class="{'applied-styles': applyStyles}"
       :style="applyStyles ? styles : null">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    applyStyles: [Boolean, String]
  },
  data() {
    return {
      styles: null,

      /** @type {HTMLElement} */
      originParent: null
    }
  },
  watch: {
    value() {
      this.updateStyles()
    }
  },
  mounted() {
    const { parentElement } = this.$el

    this.originParent = parentElement

    this.updateStyles()

    this.$el.remove()

    document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    this.$el.remove()
  },
  methods: {
    updateStyles() {
      const {
        top,
        left,
        width,
        height
      } = this.originParent.getBoundingClientRect()

      // console.log(top)

      this.styles = {
        top:  `${top + height}px`,
        left: `${left + width / 2}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popover {
  pointer-events: none;
  position: fixed !important;
  border: 0;
  background: none;

  &-custom {
    max-width: none;

  }

  &.applied-styles {
    padding: 15px;
    background: #fff;
    border: 1px solid rgba(#000, 0.15);
    box-shadow: 0 0 3px rgba(#000, 0.15);
    transform: translate3d(-50%, 20px, 0);
  }
}
</style>
