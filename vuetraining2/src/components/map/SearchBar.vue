<template>
  <div class="map-control-panel">
    <input v-model="searchInput" type="text" placeholder="Cherchez un pays" />

    <button id="zoomtotoulouse">Zoom Toulouse</button>

    <ul id="features-list">
      <li v-for="feature in filterByTerm" :key="feature" @click="storeCoords">
        {{ feature.values_.name }}
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

    methods: {
      storeCoords: function(store) {
        store.dispatch("increment");
      },
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
