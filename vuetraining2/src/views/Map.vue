<template>
  <div
    v-if="this.$store.getters.GET_LOADING_STATE_MAP === true"
    class="d-flex align-items-center justify-content-center loader-page"
  >
    <FetchGeoJSON />
    <Loader />
  </div>
  <div v-else class="map">
    <Openlayers />
  </div>
</template>

<script>
import "vuelayers/lib/style.css"; // needs css-loader
import FetchGeoJSON from "@/components/map/API/FetchGeoJSON.vue";
import Openlayers from "@/components/map/Openlayers.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "Map",
  components: {
    Openlayers,
    Loader,
    FetchGeoJSON,
  },
};
</script>

<style>
.map {
  position: relative;
  height: 80vh;
}
.loader-page {
  height: 100%;
}
</style>
