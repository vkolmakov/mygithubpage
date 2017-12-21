<template>
  <section class="technical-skills">
    <h2>Technical Skills</h2>
    <ul>
      <li><strong>Languages:</strong> {{ languages.join(', ') }}</li>
      <li><strong>Technologies/Frameworks:</strong> {{ technologies.join(', ') }}</li>
      <li><strong>Tools:</strong> {{ tools.join(', ') }}</li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: ['data'],

    data() {
      return this.data
    },
  }
</script>

<style lang="scss">
  @import "../mixins";

  .technical-skills {
    ul {
        @include bulletpoints();
      }
  }
</style>
