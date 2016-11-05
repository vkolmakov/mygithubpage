<template>
  <div class="experience">
    <h2>Professional Experience</h2>
    <div class="job" v-for="job in jobs">
      <div class="info">
        <div class="header">
          <span class="company">{{ job.company }}</span>, {{ job.city }}
        </div>
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
   .header {
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
        white-space: nowrap;

        .company {
          font-style: italic;
          font-weight: 500;
        }
        .title {
          font-weight: 600;
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