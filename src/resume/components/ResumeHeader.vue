<template>
  <div class="header">
    <h1>
      <a :href="whoami.link" :aria-label="whoami.description">
        <label>{{ whoami.label }}</label> {{whoami.name}}
      </a>
    </h1>
    <ul class="contact">
      <li v-for="(c, idx) in contacts">
        <label :id="`contact-${idx}`" class="visually-hidden">{{ c.label }}</label>
        <a :href="c.link" :aria-labelledby="`contact-${idx}`"><i :class="c.iconClass" aria-hidden="true"></i>{{ c.text }}</a>
      </li>
    </ul>
  </div>
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

  $github-color: #5d297e;
  $linkedin-color: #0077b5;

  .header {
    display: flex;
    flex-flow: column nowrap;
  }

  .header > h1 > a > label {
    @include visually-hidden;
  }

  .contact {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .contact > li > label {
    @include visually-hidden;
  }

  .fa {
    margin-right: 0.2em;
  }

  .fa-github {
    color: $github-color;
  }

  .fa-linkedin-square {
    color: $linkedin-color;
  }

  @include on-medium-screen-and-paper {
    .contact {
      justify-content: flex-end;
    }

    .contact > li {
      width: auto;
      padding-left: 0.75em;
    }
  }
</style>
