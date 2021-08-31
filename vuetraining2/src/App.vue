<template>
  <div id="nav">
    <Navbar />
    <FetchGeoJSON />
  </div>
  <router-view />
</template>
<script>
import FetchGeoJSON from "@/components/map/API/FetchGeoJSON.vue";
import Navbar from "@/views/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
    FetchGeoJSON,
  },
};
</script>
