<template>
  <div class="map">
    <Openlayers />
  </div>
</template>

<script>
import "vuelayers/lib/style.css"; // needs css-loader

import Openlayers from "@/components/map/Openlayers.vue";

export default {
  name: "Map",
  components: {
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
