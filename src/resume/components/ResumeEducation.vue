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
  @import "../mixins";

  @mixin education-md() {
    .school-name, .major {
      margin-left: 0;
      @include left-col();
    }
    .graduation, .gpa {
      margin-left: 0;
      @include right-col();
    }
  }

  @media print {
    div.education {
      @include education-md();
    }
  }

  .education {
    @include container();
    .school-name {
      @include left-col(true);
    }

    .graduation, .major, .gpa {
      margin-left: 2em;
    }

    @include breakpoint-md() {
      @include education-md();
    }

  }
</style>