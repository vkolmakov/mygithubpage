<template>
  <div id="root">
    <router-view></router-view>
    <icon-defs></icon-defs>
  </div>
</template>

<script>
  import IconDefs from "./components/IconDefs.vue";

  export default {
    components: {
      IconDefs,
    },
  }
</script>

<style lang="scss">
  @import "./constants.scss";

  @media (min-width: $large-screen-size) {
    :root {
      font-size: 1.15em;
    }
  }

  @media (min-width: $small-screen-size) and (max-width: $large-screen-size) {
    :root {
      font-size: 1.1em;
    }
  }

  @media (min-width: $tiny-screen-size) and (max-width: $small-screen-size) {
    :root {
      font-size: 1.05em;
    }
  }

  @media (max-width: $tiny-screen-size) {
    :root {
      font-size: 0.95em;
    }
  }
</style>
