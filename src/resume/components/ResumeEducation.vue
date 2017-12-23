<template>
  <section class="education">
    <h2>Education</h2>
    <div class="school" v-for="s in schools">
      <div class="school-name"><strong>{{ s.name }}</strong>, {{ s.city }}</div>
      <div class="graduation">{{ s.graduation }}</div>
      <div class="major">{{ s.major }}</div>
      <div class="gpa">Cumulative GPA: {{ s.gpa }}</div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      data: Object,
    },

    data() {
      return this.data
    },
  }
</script>

<style lang="scss">
  @import "../mixins";

  .education {
    display: flex;
    flex-flow: column wrap;
  }

  @include on-medium-screen-and-paper {
    .education > .school {
      display: flex;
      flex-flow: row wrap;
    }

    .education > .school > .school-name,.major {
      align-self: flex-start;
    }

    .education > .school > .graduation,.gpa {
      margin-left: auto;
    }
  }
</style>
