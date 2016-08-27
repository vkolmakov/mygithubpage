<template>
  <div class="technical-skills">
    <h2>Technical Skills</h2>
    <ul>
      <li><strong>Languages:</strong> {{ languages.join(', ') }}</li>
      <li><strong>Technologies/Frameworks:</strong> {{ technologies.join(', ') }}</li>
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

<style lang="sass">
  .technical-skills {
    ul {
        margin: 0.5em 0;
        padding-left: 3em;
      }
  }
</style>