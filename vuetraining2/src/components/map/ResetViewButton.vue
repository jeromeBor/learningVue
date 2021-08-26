<template>
  <button
    type="button"
    class="btn btn-primary reset"
    v-on:click="resetViewButton"
  >
    Reinitialiser la vue
  </button>
</template>

<script>
export default {
  name: "ResetViewButton",

  methods: {
    resetViewButton() {
      this.$emit("resetView");
    },
  },
};
</script>

<style scoped>
.reset {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
  background-color: #3399cc !important;
  border: none !important;
}
</style>
