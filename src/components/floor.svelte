<script lang="ts">
  export let current: boolean;
  export let target: boolean;
  export let currentTarget: boolean;
</script>

<div class="floor" class:current class:target class:currentTarget>
  <slot />
</div>

<style lang="scss">
  .floor {
    width: 2em;
    height: 1em;
    padding: 0.25rem;
    border-radius: 0.2em;

    text-align: center;
    color: white;

    background-color: rgba(0, 0, 0, 0.7);

    transition: background-color 0.2s ease-in-out;
  }
  .current {
    background-color: orange;
  }
  .target {
    background-color: salmon;
  }
  .currentTarget {
    background-color: red;
  }
</style>
