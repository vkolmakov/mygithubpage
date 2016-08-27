<template>
  <div class="education">
    <h2>Education</h2>
    <div class="school" v-for="s in schools">
      <div class="school-name"><strong>{{ s.name }}</strong>, {{ s.city }}</div>
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

<style lang="sass">
  @import "~susy/sass/susy";

  @mixin left-col() {
    @include span(6 of 12)
  }

  @mixin right-col() {
    @include span(6 of 12 last)
    text-align: right;
  }

  .education {
    @include container();
    .school-name, .major {
      @include left-col();
    }
    .graduation, .gpa {
      @include right-col();
    }
  }
</style>