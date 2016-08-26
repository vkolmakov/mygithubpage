<template>
  <div class="technical-skills">
      <h2>Technical Skills</h2>
      <ul>
          <li>Languages: {{ languages.join(', ') }}</li>
          <li>Technologies/Frameworks: {{ technologies.join(', ') }}</li>
      </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ...this.$parent.$data.resumeTechnicalSkills,
      }
    }
  }
</script>

<style>

</style>