<template>
  <div :class="`icon ${wrapperClass}`">
    <svg>
      <use :xlink:href="`#${kind}`"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    props: {
      kind: String,
      wrapperClass: String,
    },
  };
</script>

<style>
  .icon {
    display: inline-flex;
    align-self: center;
    position: relative;
    height: 1em;
    width: 1em;
  }

  .icon svg {
    height: 1em;
    width: 1em;
    bottom: -0.175em; /* some pixel-perfect alignment */
    position: absolute;
  }
</style>
