<template>
  <select
    v-model="selectedCountry"
    id="layerSelector"
    class="form-select p-2 mb-3 fs-6"
    aria-label="Default select example"
  >
    <option value="All" selected class="fw-bold text-primary"
      >Choisir un pays (étage)</option
    >
    <option value="Allemagne">Allemagne</option>
    <option value="France">France</option>
  </select>
</template>

<script>
export default {
  name: "DropDown",

  data() {
    return {
      selectedCountry: "All",
    };
  },

  watch: {
    selectedCountry: function(country) {
      this.$store.dispatch("CHANGE_CURRENT_COUNTRY", country);
    },
  },
};
</script>
