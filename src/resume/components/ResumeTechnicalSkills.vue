<template>
  <div class="technical-skills">
    <h2>Technical Skills</h2>
    <ul>
      <li><strong>Languages:</strong> {{ languages.join(', ') }}</li>
      <li><strong>Technologies/Frameworks:</strong> {{ technologies.join(', ') }}</li>
      <li><strong>Tools:</strong> {{ tools.join(', ') }}</li>
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
  @import "../mixins";
  .technical-skills {
    ul {
        @include bulletpoints();
      }
  }
</style>