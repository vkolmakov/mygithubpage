<template>
  <div class="header">
    <h1><a :href="whoami.link">{{whoami.name}}</a></h1>
    <ul class="contact">
      <li v-for="c in contacts">
        <i :class="c.iconClass"></i> <a :href="c.link">{{ c.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ...this.$parent.$data.resumeHeader,
      }
    }
  }
</script>

<style lang="sass">
  @import "../mixins";

  $github-color: #800080;
  $twitter-color: #6faedc;

  @mixin contacts-li-md() {
    &:nth-child(odd), &:nth-child(even) {
      padding: 0 0.3em;
      width: inherit;
      margin: 0;
    }
  }

  @mixin contacts-ul-md() {
    float: right;
  }

  @media print {
    div.header > ul {
      @include contacts-ul-md();
      li {
        @include contacts-li-md();
      }

    }
  }

  .header {
    @include clearfix();
    @include container();

    h1 {
      margin: 0;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      @include breakpoint-md() {
        @include contacts-ul-md();
      }

      li {
        display: inline;
        float: left;
        margin: 0;

        &:nth-child(odd) {
          @include left-col();
        }

        &:nth-child(even) {
          @include right-col();
        }

        @include breakpoint-md() {
          @include contacts-li-md();
        }

      }
    }
  }

  .fa-github {
      color: $github-color;
  }
  .fa-twitter {
      color: $twitter-color;
  }
</style>