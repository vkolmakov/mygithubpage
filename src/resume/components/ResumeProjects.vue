<template>
  <div class="projects">
    <h2>Projects</h2>
    <div class="project" v-for="p in projects">
      <h3>{{ p.name }}</h3>
      <ul>
        <li v-for="bulletpoint in p.bulletpoints" v-html="bulletpoint">
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
    },
  }
</script>

<style lang="sass">
  .projects {
    .project {
      a {
        text-decoration: underline;
      }
      h3 {
        margin: 0.25em 0;
      }
      ul {
        margin: 0.5em 0;
        padding-left: 3em;
      }
    }
  }
</style>