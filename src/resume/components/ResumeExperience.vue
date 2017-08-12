<template>
  <section class="experience">
    <h2>Professional Experience</h2>
    <div class="job" v-for="job in jobs">
      <div class="info">
        <div class="company-city">
          <em>{{ job.company }}</em>, {{ job.city }}
        </div>
        <div class="title"><strong>{{ job.title }}</strong></div>
        <div class="dates">{{ job.dates }}</div>
      </div>
      <ul>
          <li v-for="bulletpoint in job.bulletpoints">
              {{ bulletpoint }}
          </li>
      </ul>
    </div>
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

<style lang="sass">
  @import "../mixins";

  .job ul {
    @include bulletpoints();
  }

  @include breakpoint-md {
    .job > .info {
      display: flex;
      flex-flow: row wrap;
    }

    .job > .info > .company-city {
      order: 1;
      align-self: flex-start;
    }

    .job > .info > .title {
      order: 3;
      /* carefully selected voodoo constant that adds just enough */
      /* space to the title so it has to wrap to the next row */
      margin-right: 35%;
    }

    .job > .info > .dates {
      margin-left: auto;
      order: 2;
    }
  }
</style>
