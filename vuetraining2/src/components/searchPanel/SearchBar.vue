<template>
  <div class="w-auto d-flex flex-row m-1">
    <input
      v-model="searchInput"
      type="text"
      class="form-control "
      placeholder="Search"
      aria-label="Search"
    />
    <button
      v-on:click="resetInputButton"
      class="input-group-text btn-primary"
      id="basic-addon1"
    >
      X
    </button>
  </div>
  <ul class="list-group" id="features-list">
    <li
      v-for="(feature, index) in filterByTerm"
      :key="index"
      v-on:click="storeFeature(index)"
      type="button"
      class="list-group-item"
    >
      {{ feature.properties.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "SearchBar",

  components: {},
  data() {
    return {
      searchInput: "",
    };
  },

  methods: {
    resetInput() {
      this.searchInput = "";
    },

    storeFeature(index) {
      this.$store.dispatch("SELECT_FEATURE", [this.filterByTerm[index]]);
      console.log(this.filterByTerm[index]);
      this.$emit("onListFeatureClicked");
    },
  },

  computed: {
    getFilteredFeatureList() {
      return this.$store.getters.GET_FILTERED_FEATURES;
    },

    filterByTerm() {
      if (!this.getFilteredFeatureList) return [];
      return this.getFilteredFeatureList.filter((feature) => {
        return feature.properties.name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },
  },
};
</script>

<style lang="stylus"></style>
