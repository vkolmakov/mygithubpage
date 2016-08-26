<template>
  <div class="education">
      <h2>Education</h2>
      <div class="school" v-for="s in schools">
          <div class="school-name">{{ s.name }}, {{ s.city }}</div>
          <div class="graduation">{{ s.graduation }}</div>
          <div class="major">{{ s.major }}</div>
          <div class="gpa">Cumulative GPA: {{ s.gpa }}</div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ...this.$parent.$data.resumeEducation,
      }
    }
  }
</script>

<style>

</style>