<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  > div {
    height: 100%;
    display: grid;
    grid: auto 1fr / 100%;

    > * {
      &:nth-child(2) {
        overflow: auto;
        padding: 40px 20px 10px;
        background-color: #1c4b58;
      }
    }
  }
}
</style>
