<template>
  <div>
    <div class="info-bar">
      <h2>
        <slot name="title">
          Title Goes Here
        </slot>
      </h2>
    </div>

    <div class="main__container"
         :class="{'no-padding': noPadding || noPadding === ''}">
      <slot>
        Put something here
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noPadding: {
      type: [String, Boolean]
    }
  }
}
</script>

<style scoped lang="scss">
.info-bar {
  background-color: #007292;
  color: #fdfdfd;
  text-shadow: -1px -1px 3px rgba(0, 0, 0, 0.39);
  padding: 10px 15px;
  pointer-events: none;
  display: grid;
  align-items: center;
  grid-auto-flow: column dense;
  grid-template-columns: 1fr repeat(3, minmax(100px, max-content));
  gap: 25px;
}

.main__container {
  overflow: auto;
  padding: 40px 20px 10px;
  background-color: #1c4b58;
  color: #fff;

  &.no-padding {
    padding: 0;
  }
}
</style>
