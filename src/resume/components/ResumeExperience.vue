<template>
  <div class="experience">
      <h2>Professional Experience</h2>
      <div class="job" v-for="job in jobs">
          <div class="company">{{ job.company }}</div>
          <div class="city">{{ job.city }}</div>
          <div class="title">{{ job.title }}</div>
          <div class="dates">{{ job.dates }}</div>
          <ul>
              <li v-for="bulletpoint in job.bulletpoints">
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
        ...this.$parent.$data.resumeExperience,
      }
    }
  }
</script>

<style>

</style>