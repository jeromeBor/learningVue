<template>
  <div class="map-control-panel">
    <input v-model="searchInput" type="text" placeholder="Cherchez un pays" />

    <button id="zoomtotoulouse">Zoom Toulouse</button>
    <button id="zoomtotoulouse" v-on:click="resetInput">
      Reset
    </button>

    <ul id="features-list">
      <li
        v-for="(feature, index) in filterByTerm"
        :key="index"
        v-on:click="storeFeature(index)"
        class="zoomtofeature"
      >
        {{ feature.values_.name }}
      </li>
    </ul>
    <p v-if="coordsSelected">Pas de point selectionnées</p>
    <p v-else>Coordonnées actuelle :</p>
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
    listedFeatures() {
      return this.$store.getters.GET_ALLFEATURES;
    },

    filterByTerm() {
      return this.listedFeatures.filter((feature) => {
        return feature.values_.name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },

    selectedFeature() {
      return this.$store.state.currentSelectedFeature;
    },
  },

  methods: {
    storeFeature(index) {
      this.$store.dispatch("SELECT_FEATURE", this.filterByTerm[index]);
    },

    resetInput() {
      this.searchInput = "";
    },
  },
};
</script>

<style>
.map-control-panel {
  right: 12px;
  bottom: 100px;
  position: absolute;
  z-index: 99;
  padding: 1rem;
  background-color: rgba(150, 150, 150, 0.5);
}

#features-list li {
  list-style: none;
  cursor: pointer;
  margin: 0.2rem;
  background-color: rgba(254, 254, 254, 0.5);
  border: 1px solid grey;
  padding: 4px;
}
</style>
