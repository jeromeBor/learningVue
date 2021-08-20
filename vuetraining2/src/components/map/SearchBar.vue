<template>
  <div class="map-control-panel">
    <input v-model="searchInput" type="text" placeholder="Cherchez un pays" />
    <button id="zoomtolyon">Zoom Lyon</button>
    <button id="zoomtoparis">Zoom Paris</button>
    <button id="zoomtotoulouse">Zoom Toulouse</button>

    <ul id="features-list">
      <li v-for="feature in filterByTerm" :key="feature">
        {{ feature }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MapPanel",

  data() {
    return {
      searchInput: "",
      // filterFeatureList: [{ name: "audi" }, { name: "fiat" }],
    };
  },
  computed: {
    featuresList() {
      // récupération du getters de mon state
      return this.$store.getters.GET_FEATURESNAME;
    },

    filterByTerm() {
      return this.featuresList.filter((feature) => {
        return feature.toLowerCase().includes(this.searchInput.toLowerCase());
      });
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
}
</style>
