<template>
  <div class="experience">
    <h2>Professional Experience</h2>
    <div class="job" v-for="job in jobs">
      <div class="info">
        <div class="company"><strong>{{ job.company }}</strong>, {{ job.city }}</div>
        <div class="title">{{ job.title }}</div>
        <div class="dates">{{ job.dates }}</div>
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

  @mixin info-md() {
   .company {
      @include left-col();
    }
    .title {
      @include left-col();
    }
    .dates {
      @include right-col();
    }
  }

  @media print {
    div.experience > .job > .info {
      @include info-md();
    }
  }

  .experience {
    .job {
      .info {
        @include clearfix();
        .title {
          font-style: italic;
          font-weight: 500;
        }
        @include breakpoint-md() {
          @include info-md();
        }
      }

      ul {
        @include clearfix()
        @include bulletpoints();
      }
    }
  }

</style>