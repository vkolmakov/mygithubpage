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
