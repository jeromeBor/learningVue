<template>
  <div class="map-control-panel">
    <div class="input-group mb-3"></div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          Afficher/Cacher la recherche
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div class="w-auto d-flex flex-row m-1">
            <input
              v-model="searchInput"
              type="text"
              class="form-control "
              placeholder="Search"
              aria-label="Search"
            />
            <button
              v-on:click="resetInput"
              class="input-group-text btn-primary"
              id="basic-addon1"
            >
              X
            </button>
          </div>
          <ul
            id="features-list"
            class="d-flex flex-column justify-content-center align-items-center ps-0 p-1"
          >
            <button
              v-for="(feature, index) in filterByTerm"
              :key="index"
              v-on:click="storeFeature(index)"
              type="button"
              class="btn btn-primary m-1"
            >
              {{ feature.properties.name }}
            </button>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapPanel",

  data() {
    return {
      searchInput: "",
    };
  },

  computed: {
    getAllFeatures() {
      return this.$store.getters.GET_ALLFEATURES;
    },

    filterByTerm() {
      if (!this.getAllFeatures) return [];
      return this.getAllFeatures.filter((feature) => {
        return feature.properties.name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },

    selectedFeature() {
      return this.$store.getters.GET_SELECTED_FEATURE;
    },
  },

  methods: {
    storeFeature(index) {
      this.$store.dispatch("SELECT_FEATURE", [this.filterByTerm[index]]);
      console.log(this.filterByTerm[index]);
      this.$emit("onListFeatureClicked");
    },

    resetInput() {
      this.searchInput = "";
    },
  },
};
</script>

<style>
.map-control-panel {
  right: 10px;
  bottom: 0px;
  position: absolute;
  z-index: 99;
  padding: 1rem;
}

.accordion-item {
  background-color: rgba(254, 254, 254, 0.5) !important;
}

#features-list li {
  list-style: none;
  cursor: pointer;
  margin: 0.2rem;
  background-color: rgba(254, 254, 254, 0.5);
  border: 1px solid grey;
  padding: 4px;
}
#features-list {
  max-height: 50vh !important;
  overflow-y: scroll !important;
}
</style>
