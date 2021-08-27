<template>
  <div id="nav">
    <Navbar />
    <FetchGeoJSON />
  </div>
  <router-view />
</template>

<script>
import FetchGeoJSON from "@/components/map/FetchGeoJSON.vue";
import Navbar from "@/views/Navbar.vue";
export default {
  components: { Navbar, FetchGeoJSON },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#nav {
  margin: 0px !important;
  padding: 0px !important;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
