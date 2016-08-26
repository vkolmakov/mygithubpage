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
  $github-color: #5d297e;
  $twitter-color: #6faedc;

  .header {
    clear: both;
    overflow: hidden;
    h1 {
      margin: 0em;
    }

    ul {
      float: right;

      list-style-type: none;
      padding: 0em;
      margin: 0em;
      li {
        display: inline;
        padding: 0em 0.4em;
        margin: 0em;
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