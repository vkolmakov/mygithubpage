<template>
  <div class="projects">
      <h2>Projects</h2>
      <div class="project" v-for="p in projects">
          <h3>{{ p.name }}</h3>
          <ul>
              <li v-for="bulletpoint in p.bulletpoints">
                  {{ bulletpoint }}
              </li>
          </ul>
      </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        ...this.$parent.$data.resumeProjects,
      }
    }
  }
</script>

<style>

</style>