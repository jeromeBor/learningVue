<template>
  <div class="home">
    <h1>Bienvenue sur le site</h1>
    <Navigation />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "Navbar",
  components: {
    Navigation,
  },
};
</script>
