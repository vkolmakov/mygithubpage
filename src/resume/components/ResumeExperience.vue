<template>
  <div class="experience">
    <h2>Professional Experience</h2>
    <div class="job" v-for="job in jobs">
      <div class="info">
        <div class="company"><strong>{{ job.company }}</strong>, {{ job.city }}</div>
        <div class="dates">{{ job.dates }}</div>
        <div class="title">{{ job.title }}</div>
      </div>
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

<style lang="sass">
  @import "../mixins";

  .experience {
    .job {
      .info {
        @include clearfix();
        .company {
          @include left-col();
        }
        .title {
          @include left-col(true);
        }
        .dates {
          @include right-col();
        }
      }

      ul {
        @include clearfix()
        @include bulletpoints();
      }
    }
  }

</style>