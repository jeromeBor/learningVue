<template>
  <div class="map">
    <SearchBar />
    <Openlayers />
  </div>
</template>

<script>
import "vuelayers/lib/style.css"; // needs css-loader

import SearchBar from "@/components/map/SearchBar.vue";
import Openlayers from "@/components/map/Openlayers.vue";

export default {
  name: "Map",
  components: {
    SearchBar,
    Openlayers,
  },
};
</script>

<style>
.map {
  position: relative;
  height: 80vh;
}
</style>
