<template>
  <div class="map-control-panel">
    <input type="text" placeholder="Cherchez un pays" />
    <button>Reset input</button>
    <button>Paris</button>
    <button>Toulouse</button>
    <!-- <ul id="example-1">
      <li v-for="city in openlayersFeatureList" :key="city.name">
        {{ city.name }}
      </li>
    </ul> -->
    <ul id="example-1">
      <li v-for="features in features" :key="features.name">
        {{ features }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MapPanel",
  // je récupère le getter nommé auquel j'ai attribué un fonction map
  computed: {
    // ----- sans le getters ----
    // openlayersFeatureList() {
    //   return this.$store.state.featuresList;
    // },
    features() {
      return this.$store.getters.GET_FEATURESNAME;
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
</style>
